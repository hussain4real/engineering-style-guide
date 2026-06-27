import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { slugify, titleFromSlug } from "./config.js";
import type { BackendFramework, FrontendFramework, StarterConfigInput } from "./types.js";

export interface PromptIo {
  ask(question: string): Promise<string>;
  close(): void;
}

export class ReadlinePromptIo implements PromptIo {
  private readonly rl = readline.createInterface({ input, output });

  ask(question: string): Promise<string> {
    return this.rl.question(question);
  }

  close(): void {
    this.rl.close();
  }
}

async function askText(io: PromptIo, label: string, defaultValue: string): Promise<string> {
  const answer = await io.ask(`${label} [${defaultValue}]: `);
  return answer.trim() || defaultValue;
}

async function askBoolean(io: PromptIo, label: string, defaultValue: boolean): Promise<boolean> {
  const suffix = defaultValue ? "Y/n" : "y/N";
  const answer = (await io.ask(`${label} [${suffix}]: `)).trim().toLowerCase();

  if (!answer) {
    return defaultValue;
  }

  return ["y", "yes", "true", "1"].includes(answer);
}

async function askOption<T extends string>(
  io: PromptIo,
  label: string,
  options: Array<{ value: T; label: string }>,
  defaultValue: T
): Promise<T> {
  output.write(`\n${label}\n`);
  options.forEach((option, index) => {
    const marker = option.value === defaultValue ? " default" : "";
    output.write(`  ${index + 1}. ${option.label}${marker}\n`);
  });

  const answer = (await io.ask(`Choose 1-${options.length} [${defaultValue}]: `)).trim();

  if (!answer) {
    return defaultValue;
  }

  const numericChoice = Number(answer);
  if (Number.isInteger(numericChoice) && numericChoice >= 1 && numericChoice <= options.length) {
    return options[numericChoice - 1]!.value;
  }

  const matchingOption = options.find((option) => option.value === answer);
  if (matchingOption) {
    return matchingOption.value;
  }

  throw new Error(`Invalid option "${answer}" for ${label}.`);
}

export async function collectPromptInput(
  inputConfig: StarterConfigInput,
  options: { yes?: boolean; io?: PromptIo } = {}
): Promise<StarterConfigInput> {
  if (options.yes) {
    return inputConfig;
  }

  const io = options.io ?? new ReadlinePromptIo();

  try {
    const inferredSlug = slugify(
      inputConfig.projectSlug ?? inputConfig.projectName ?? inputConfig.targetDir ?? "milaha-project"
    );
    const projectName =
      inputConfig.projectName ?? (await askText(io, "Project name", titleFromSlug(inferredSlug)));
    const projectSlug =
      inputConfig.projectSlug ?? (await askText(io, "Project slug", slugify(projectName)));
    const targetDir = inputConfig.targetDir ?? (await askText(io, "Target directory", projectSlug));
    const projectOneLiner =
      inputConfig.projectOneLiner ??
      (await askText(
        io,
        "One-line description",
        `${projectName} service scaffolded with the Milaha starter kit.`
      ));
    const backend =
      inputConfig.backend ??
      (await askOption<BackendFramework>(
        io,
        "Backend framework",
        [
          { value: "nestjs", label: "NestJS (TypeScript)" },
          { value: "fastapi", label: "FastAPI (Python)" }
        ],
        "nestjs"
      ));
    const frontend =
      inputConfig.frontend ??
      (await askOption<FrontendFramework>(
        io,
        "Frontend",
        [
          { value: "none", label: "None" },
          { value: "nextjs", label: "Next.js / React" }
        ],
        "none"
      ));
    const includeHarness =
      inputConfig.includeHarness ?? (await askBoolean(io, "Install Claude harness", true));
    const installDependencies =
      inputConfig.installDependencies ?? (await askBoolean(io, "Install dependencies", true));
    const initializeGit = inputConfig.initializeGit ?? (await askBoolean(io, "Initialize git", true));

    return {
      ...inputConfig,
      targetDir,
      projectName,
      projectSlug,
      projectOneLiner,
      backend,
      frontend,
      includeHarness,
      installDependencies,
      initializeGit
    };
  } finally {
    io.close();
  }
}
