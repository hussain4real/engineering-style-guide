import path from "node:path";
import {
  backendChoices,
  type BackendFramework,
  type CoveragePolicy,
  frontendChoices,
  type FrontendFramework,
  type GateEngine,
  type PrimaryLanguage,
  type StarterConfig,
  type StarterConfigInput
} from "./types.js";

const defaultCoveragePolicy: CoveragePolicy = {
  appCodePercent: 100,
  excludes: [
    "framework bootstrap files",
    "generated artifacts",
    "test setup",
    "configuration glue"
  ]
};

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

export function assertValidSlug(slug: string): void {
  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/.test(slug)) {
    throw new Error(
      `Project slug "${slug}" must be kebab-case with lowercase letters, numbers, and hyphens.`
    );
  }
}

function assertChoice<T extends string>(
  value: string,
  choices: readonly T[],
  label: string
): asserts value is T {
  if (!choices.includes(value as T)) {
    throw new Error(`${label} must be one of: ${choices.join(", ")}.`);
  }
}

export function primaryLanguageForBackend(backend: BackendFramework): PrimaryLanguage {
  return backend === "nestjs" ? "TypeScript" : "Python";
}

export function gateEngineForBackend(backend: BackendFramework): GateEngine {
  return backend === "nestjs" ? "lefthook" : "pre-commit";
}

export function normalizeConfig(input: StarterConfigInput = {}, cwd = process.cwd()): StarterConfig {
  const targetBasis = input.targetDir ? path.basename(input.targetDir) : "milaha-project";
  const inferredSlug = slugify(input.projectSlug ?? input.projectName ?? targetBasis);
  const projectSlug = inferredSlug || "milaha-project";
  assertValidSlug(projectSlug);

  const backend = input.backend ?? "nestjs";
  assertChoice(backend, backendChoices, "Backend framework");

  const frontend = input.frontend ?? "none";
  assertChoice(frontend, frontendChoices, "Frontend framework");

  const projectName = input.projectName?.trim() || titleFromSlug(projectSlug);
  const targetDir = path.resolve(cwd, input.targetDir ?? projectSlug);
  const primaryLanguage = primaryLanguageForBackend(backend);

  return {
    targetDir,
    projectName,
    projectSlug,
    projectOneLiner:
      input.projectOneLiner?.trim() || `${projectName} service scaffolded with the Milaha starter kit.`,
    backend,
    primaryLanguage,
    frontend,
    includeHarness: input.includeHarness ?? true,
    installDependencies: input.installDependencies ?? true,
    initializeGit: input.initializeGit ?? true,
    dryRun: input.dryRun ?? false,
    packageManager: "pnpm",
    pythonTooling: "uv",
    gateEngine: gateEngineForBackend(backend),
    coveragePolicy: defaultCoveragePolicy
  };
}

export function hasNodeWorkspace(config: StarterConfig): boolean {
  return config.backend === "nestjs" || config.frontend === "nextjs";
}
