import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { RecordingCommandRunner } from "./command-runner.js";
import { initProject } from "./generator.js";
import { packageRootFrom } from "./package-root.js";

async function tempRoot() {
  return fs.mkdtemp(path.join(os.tmpdir(), "milaha-create-project-"));
}

async function readFile(root: string, relativePath: string) {
  return fs.readFile(path.join(root, relativePath), "utf8");
}

async function exists(root: string, relativePath: string) {
  try {
    await fs.access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

describe("initProject", () => {
  it("generates a NestJS API with the Claude harness and standards", async () => {
    const cwd = await tempRoot();
    const runner = new RecordingCommandRunner();
    const result = await initProject(
      {
        targetDir: "port-ops",
        projectName: "Port Ops",
        backend: "nestjs",
        includeHarness: true,
        installDependencies: false,
        initializeGit: false
      },
      {
        cwd,
        packageRoot: packageRootFrom(),
        commandRunner: runner,
        runExternalGenerators: false
      }
    );
    const root = path.join(cwd, "port-ops");

    expect(result.files).toContain("apps/api/package.json");
    expect(await exists(root, ".claude/agents/port-ops-sme.md")).toBe(true);
    expect(await exists(root, "harness/AI_INVENTORY.yaml")).toBe(true);
    expect(await exists(root, "docs/standards/starter-kit.md")).toBe(true);
    expect(await readFile(root, ".github/workflows/ci.yml")).toContain("pnpm run test:coverage");
    expect(await readFile(root, ".milaha/starter-manifest.json")).toContain("\"harness\": true");
    expect(runner.commands).toHaveLength(0);
  });

  it("generates a FastAPI API without the Claude harness", async () => {
    const cwd = await tempRoot();
    await initProject(
      {
        targetDir: "cargo-api",
        projectName: "Cargo API",
        backend: "fastapi",
        includeHarness: false,
        installDependencies: false,
        initializeGit: false
      },
      {
        cwd,
        packageRoot: packageRootFrom(),
        commandRunner: new RecordingCommandRunner(),
        runExternalGenerators: false
      }
    );
    const root = path.join(cwd, "cargo-api");

    expect(await exists(root, "apps/api/pyproject.toml")).toBe(true);
    expect(await exists(root, ".pre-commit-config.yaml")).toBe(true);
    expect(await exists(root, ".claude")).toBe(false);
    expect(await readFile(root, ".github/workflows/ci.yml")).toContain("uv run pip-audit");
    expect(await readFile(root, ".milaha/starter-manifest.json")).toContain("\"harness\": false");
  });

  it("generates optional Next.js frontend files", async () => {
    const cwd = await tempRoot();
    await initProject(
      {
        targetDir: "portal",
        projectName: "Portal",
        backend: "nestjs",
        frontend: "nextjs",
        includeHarness: false,
        installDependencies: false,
        initializeGit: false
      },
      {
        cwd,
        packageRoot: packageRootFrom(),
        commandRunner: new RecordingCommandRunner(),
        runExternalGenerators: false
      }
    );
    const root = path.join(cwd, "portal");

    expect(await exists(root, "apps/web/package.json")).toBe(true);
    expect(await readFile(root, "apps/web/tailwind.config.ts")).toContain(
      "@qatar-navigation-milaha/ui/tailwind-preset"
    );
    expect(await readFile(root, ".github/workflows/ci.yml")).toContain("pnpm audit");
  });

  it("supports dry runs without creating the target directory", async () => {
    const cwd = await tempRoot();
    const result = await initProject(
      {
        targetDir: "dry-api",
        projectName: "Dry API",
        backend: "nestjs",
        dryRun: true,
        includeHarness: false
      },
      {
        cwd,
        packageRoot: packageRootFrom(),
        commandRunner: new RecordingCommandRunner(),
        runExternalGenerators: false
      }
    );

    expect(await exists(cwd, "dry-api")).toBe(false);
    expect(result.files).toContain("apps/api/package.json");
    expect(result.commands.map((command) => command.description)).toContain(
      "NestJS official project generator"
    );
    expect(result.commands.map((command) => command.description)).toContain(
      "Install Node workspace dependencies"
    );
  });
});
