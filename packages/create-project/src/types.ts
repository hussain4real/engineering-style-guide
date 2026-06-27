export const backendChoices = ["nestjs", "fastapi"] as const;
export const frontendChoices = ["none", "nextjs"] as const;

export type BackendFramework = (typeof backendChoices)[number];
export type FrontendFramework = (typeof frontendChoices)[number];
export type PrimaryLanguage = "TypeScript" | "Python";
export type GateEngine = "lefthook" | "pre-commit";

export interface CoveragePolicy {
  appCodePercent: 100;
  excludes: string[];
}

export interface StarterConfig {
  targetDir: string;
  projectName: string;
  projectSlug: string;
  projectOneLiner: string;
  backend: BackendFramework;
  primaryLanguage: PrimaryLanguage;
  frontend: FrontendFramework;
  includeHarness: boolean;
  installDependencies: boolean;
  initializeGit: boolean;
  dryRun: boolean;
  packageManager: "pnpm";
  pythonTooling: "uv";
  gateEngine: GateEngine;
  coveragePolicy: CoveragePolicy;
}

export interface StarterConfigInput {
  targetDir?: string;
  projectName?: string;
  projectSlug?: string;
  projectOneLiner?: string;
  backend?: BackendFramework;
  frontend?: FrontendFramework;
  includeHarness?: boolean;
  installDependencies?: boolean;
  initializeGit?: boolean;
  dryRun?: boolean;
}

export interface GeneratedFile {
  path: string;
  content: string;
  executable?: boolean;
}

export interface CommandSpec {
  command: string;
  args: string[];
  cwd?: string;
  description: string;
}

export interface CommandRunner {
  run(command: CommandSpec): Promise<void>;
}

export interface Logger {
  info(message: string): void;
  warn(message: string): void;
}

export interface GenerationOptions {
  cwd?: string;
  packageRoot?: string;
  logger?: Logger;
  commandRunner?: CommandRunner;
  runExternalGenerators?: boolean;
}

export interface InitResult {
  config: StarterConfig;
  files: string[];
  commands: CommandSpec[];
}

export interface BackendAdapter {
  id: BackendFramework;
  label: string;
  primaryLanguage: PrimaryLanguage;
  externalCommand(config: StarterConfig): CommandSpec | null;
  files(config: StarterConfig): GeneratedFile[];
}

export interface FrontendAdapter {
  id: FrontendFramework;
  label: string;
  externalCommand(config: StarterConfig): CommandSpec | null;
  files(config: StarterConfig): GeneratedFile[];
}

export interface Overlay {
  id: string;
  description: string;
  files(config: StarterConfig): GeneratedFile[];
}
