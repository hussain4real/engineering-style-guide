import { constants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { renderTemplate, type TemplateTokens, unresolvedTokens } from "./template.js";
import type { GeneratedFile } from "./types.js";

export async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function assertDirectoryCanBeInitialized(targetDir: string): Promise<void> {
  if (!(await pathExists(targetDir))) {
    return;
  }

  const entries = await fs.readdir(targetDir);
  const visibleEntries = entries.filter((entry) => entry !== ".DS_Store");

  if (visibleEntries.length > 0) {
    throw new Error(
      `Target directory is not empty: ${targetDir}. Choose a new directory for milaha init.`
    );
  }
}

export async function writeGeneratedFile(
  rootDir: string,
  file: GeneratedFile,
  dryRun: boolean
): Promise<string> {
  const absolutePath = path.join(rootDir, file.path);

  if (!dryRun) {
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.writeFile(absolutePath, file.content);

    if (file.executable) {
      await fs.chmod(absolutePath, 0o755);
    }
  }

  return file.path;
}

export async function copyTemplateTree(
  sourceDir: string,
  targetDir: string,
  tokens: TemplateTokens,
  dryRun: boolean,
  options: {
    exclude?: (relativePath: string) => boolean;
    mapPath?: (relativePath: string) => string;
  } = {}
): Promise<string[]> {
  const copied: string[] = [];
  const sourceExists = await pathExists(sourceDir);

  if (!sourceExists) {
    throw new Error(`Template source does not exist: ${sourceDir}`);
  }

  async function walk(currentSource: string): Promise<void> {
    const entries = await fs.readdir(currentSource, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(currentSource, entry.name);
      const relativePath = path.relative(sourceDir, sourcePath);

      if (options.exclude?.(relativePath)) {
        continue;
      }

      if (entry.isDirectory()) {
        await walk(sourcePath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const outputRelativePath = options.mapPath?.(relativePath) ?? relativePath;
      const content = await fs.readFile(sourcePath, "utf8");
      const rendered = renderTemplate(content, tokens);
      const outputPath = path.join(targetDir, outputRelativePath);

      if (!dryRun) {
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, rendered);
        const mode = (await fs.stat(sourcePath)).mode;

        if ((mode & 0o111) !== 0) {
          await fs.chmod(outputPath, 0o755);
        }
      }

      copied.push(outputRelativePath);
    }
  }

  await walk(sourceDir);
  return copied.sort();
}

export async function assertNoUnresolvedTokens(rootDir: string): Promise<void> {
  const offenders: string[] = [];

  async function walk(currentDir: string): Promise<void> {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if ([".git", "node_modules", ".venv", "dist"].includes(entry.name)) {
          continue;
        }

        await walk(absolutePath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const content = await fs.readFile(absolutePath, "utf8");
      const tokens = unresolvedTokens(content);

      if (tokens.length > 0) {
        offenders.push(`${path.relative(rootDir, absolutePath)}: ${tokens.join(", ")}`);
      }
    }
  }

  await walk(rootDir);

  if (offenders.length > 0) {
    throw new Error(`Generated project contains unresolved template tokens:\n${offenders.join("\n")}`);
  }
}
