#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { collectPromptInput } from "./prompts.js";
import { initProject } from "./generator.js";
import type { BackendFramework, FrontendFramework, StarterConfigInput } from "./types.js";

interface ParsedArgs {
  command?: string;
  targetDir?: string;
  yes?: boolean;
  input: StarterConfigInput;
}

function printHelp(): void {
  console.log(`Milaha starter kit

Usage:
  milaha init [target-dir] [options]

Options:
  --yes                  Use defaults for unanswered prompts
  --dry-run              Show planned files and commands without writing
  --no-install           Skip dependency installation
  --backend <value>      nestjs | fastapi
  --frontend <value>     none | nextjs
  --harness              Install the Claude harness
  --no-harness           Skip the Claude harness
  --git                  Initialize git
  --no-git               Skip git initialization
  -h, --help             Show help
`);
}

function takeValue(args: string[], index: number, flag: string): string {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }

  return value;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const [command, ...rest] = argv;
  const input: StarterConfigInput = {};
  let targetDir: string | undefined;
  let yes = false;

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index]!;

    if (arg === "--yes") {
      yes = true;
      continue;
    }

    if (arg === "--dry-run") {
      input.dryRun = true;
      continue;
    }

    if (arg === "--no-install") {
      input.installDependencies = false;
      continue;
    }

    if (arg === "--backend") {
      input.backend = takeValue(rest, index, arg) as BackendFramework;
      index += 1;
      continue;
    }

    if (arg === "--frontend") {
      input.frontend = takeValue(rest, index, arg) as FrontendFramework;
      index += 1;
      continue;
    }

    if (arg === "--harness") {
      input.includeHarness = true;
      continue;
    }

    if (arg === "--no-harness") {
      input.includeHarness = false;
      continue;
    }

    if (arg === "--git") {
      input.initializeGit = true;
      continue;
    }

    if (arg === "--no-git") {
      input.initializeGit = false;
      continue;
    }

    if (arg === "-h" || arg === "--help") {
      return { command: "help", input };
    }

    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }

    if (targetDir) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    targetDir = arg;
  }

  input.targetDir = targetDir;
  return { command, targetDir, yes, input };
}

export async function main(argv = process.argv.slice(2)): Promise<void> {
  const parsed = parseArgs(argv);

  if (!parsed.command || parsed.command === "help") {
    printHelp();
    return;
  }

  if (parsed.command !== "init") {
    throw new Error(`Unknown command: ${parsed.command}`);
  }

  const input = await collectPromptInput(parsed.input, { yes: parsed.yes });
  const result = await initProject(input);

  if (result.config.dryRun) {
    console.log("\nDry run complete. Files planned:");
    result.files.forEach((file) => console.log(`  ${file}`));
    console.log("\nCommands planned:");
    result.commands.forEach((command) =>
      console.log(`  ${command.command} ${command.args.join(" ")}`)
    );
    return;
  }

  console.log(`\nCreated ${result.config.projectName} at ${result.config.targetDir}`);
  console.log("Next: review README.md and push the generated repository when ready.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
