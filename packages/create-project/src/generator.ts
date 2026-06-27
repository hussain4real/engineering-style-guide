import fs from "node:fs/promises";
import path from "node:path";
import { backendAdapters } from "./adapters/backend.js";
import { frontendAdapters } from "./adapters/frontend.js";
import { LocalCommandRunner, consoleLogger } from "./command-runner.js";
import { hasNodeWorkspace, normalizeConfig } from "./config.js";
import {
  assertDirectoryCanBeInitialized,
  assertNoUnresolvedTokens,
  copyTemplateTree,
  writeGeneratedFile
} from "./fs.js";
import { packageRootFrom, templatesRoot } from "./package-root.js";
import { tokenMap } from "./template.js";
import type {
  CommandSpec,
  GenerationOptions,
  InitResult,
  StarterConfig,
  StarterConfigInput
} from "./types.js";
import { sharedOverlayFiles } from "./overlays.js";

function installCommands(config: StarterConfig): CommandSpec[] {
  const commands: CommandSpec[] = [];

  if (hasNodeWorkspace(config)) {
    commands.push({
      command: "pnpm",
      args: ["install"],
      cwd: config.targetDir,
      description: "Install Node workspace dependencies"
    });
  }

  if (config.backend === "fastapi") {
    commands.push({
      command: "uv",
      args: ["sync", "--dev"],
      cwd: path.join(config.targetDir, "apps/api"),
      description: "Install FastAPI dependencies with uv"
    });
  }

  return commands;
}

function gitCommands(config: StarterConfig): CommandSpec[] {
  return [
    {
      command: "git",
      args: ["init"],
      cwd: config.targetDir,
      description: "Initialize git repository"
    }
  ];
}

function shouldExcludeHarnessFile(relativePath: string): boolean {
  return [
    ".git",
    ".github",
    "TEMPLATE_VARS.md",
    ".milaha-harness-source.json"
  ].some((excluded) => relativePath === excluded || relativePath.startsWith(`${excluded}/`));
}

function mapHarnessPath(config: StarterConfig, relativePath: string): string {
  if (relativePath === ".claude/agents/domain-sme.md") {
    return `.claude/agents/${config.projectSlug}-sme.md`;
  }

  return relativePath;
}

async function runCommand(
  command: CommandSpec,
  resultCommands: CommandSpec[],
  config: StarterConfig,
  runner: { run(command: CommandSpec): Promise<void> },
  execute: boolean
): Promise<void> {
  resultCommands.push(command);

  if (!config.dryRun && execute) {
    await runner.run(command);
  }
}

export async function initProject(
  input: StarterConfigInput = {},
  options: GenerationOptions = {}
): Promise<InitResult> {
  const cwd = options.cwd ?? process.cwd();
  const packageRoot = options.packageRoot ?? packageRootFrom();
  const logger = options.logger ?? consoleLogger;
  const commandRunner = options.commandRunner ?? new LocalCommandRunner(logger);
  const runExternalGenerators = options.runExternalGenerators ?? true;
  const config = normalizeConfig(input, cwd);
  const tokens = tokenMap(config);
  const templateRoot = templatesRoot(packageRoot);
  const writtenFiles: string[] = [];
  const commands: CommandSpec[] = [];
  const backendAdapter = backendAdapters[config.backend];
  const frontendAdapter = frontendAdapters[config.frontend];

  if (!backendAdapter) {
    throw new Error(`No backend adapter registered for ${config.backend}.`);
  }

  if (!frontendAdapter) {
    throw new Error(`No frontend adapter registered for ${config.frontend}.`);
  }

  if (!config.dryRun) {
    await assertDirectoryCanBeInitialized(config.targetDir);
    await fs.mkdir(config.targetDir, { recursive: true });
  }

  if (config.includeHarness) {
    const harnessFiles = await copyTemplateTree(
      path.join(templateRoot, "harness"),
      config.targetDir,
      tokens,
      config.dryRun,
      {
        exclude: shouldExcludeHarnessFile,
        mapPath: (relativePath) => mapHarnessPath(config, relativePath)
      }
    );
    writtenFiles.push(...harnessFiles);
  }

  const standardsFiles = await copyTemplateTree(
    path.join(templateRoot, "standards/guidelines"),
    path.join(config.targetDir, "docs/standards"),
    tokens,
    config.dryRun
  );
  writtenFiles.push(...standardsFiles.map((file) => `docs/standards/${file}`));

  const templateFiles = await copyTemplateTree(
    path.join(templateRoot, "standards/templates"),
    path.join(config.targetDir, "docs/templates"),
    tokens,
    config.dryRun
  );
  writtenFiles.push(...templateFiles.map((file) => `docs/templates/${file}`));

  for (const file of sharedOverlayFiles(config)) {
    writtenFiles.push(await writeGeneratedFile(config.targetDir, file, config.dryRun));
  }

  const backendCommand = backendAdapter.externalCommand(config);
  if (backendCommand) {
    await runCommand(backendCommand, commands, config, commandRunner, runExternalGenerators);
  }

  const frontendCommand = frontendAdapter.externalCommand(config);
  if (frontendCommand) {
    await runCommand(frontendCommand, commands, config, commandRunner, runExternalGenerators);
  }

  for (const file of [...backendAdapter.files(config), ...frontendAdapter.files(config)]) {
    writtenFiles.push(await writeGeneratedFile(config.targetDir, file, config.dryRun));
  }

  if (config.installDependencies) {
    for (const command of installCommands(config)) {
      await runCommand(command, commands, config, commandRunner, true);
    }
  }

  if (config.initializeGit) {
    for (const command of gitCommands(config)) {
      await runCommand(command, commands, config, commandRunner, true);
    }
  }

  if (!config.dryRun) {
    await assertNoUnresolvedTokens(config.targetDir);
  }

  return {
    config,
    files: [...new Set(writtenFiles)].sort(),
    commands
  };
}
