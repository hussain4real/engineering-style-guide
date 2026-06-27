import { describe, expect, it } from "vitest";
import { parseArgs } from "./cli.js";

describe("parseArgs", () => {
  it("parses init flags", () => {
    const parsed = parseArgs([
      "init",
      "port-ops",
      "--yes",
      "--backend",
      "fastapi",
      "--frontend",
      "nextjs",
      "--agent-runtime",
      "mastra",
      "--ai-observability",
      "langfuse",
      "--telemetry",
      "opentelemetry",
      "--workflow-runtime",
      "temporal",
      "--no-harness",
      "--no-install",
      "--no-git",
      "--dry-run"
    ]);

    expect(parsed.command).toBe("init");
    expect(parsed.yes).toBe(true);
    expect(parsed.input).toMatchObject({
      targetDir: "port-ops",
      backend: "fastapi",
      frontend: "nextjs",
      agentRuntime: "mastra",
      aiObservability: "langfuse",
      telemetry: "opentelemetry",
      workflowRuntime: "temporal",
      includeHarness: false,
      installDependencies: false,
      initializeGit: false,
      dryRun: true
    });
  });

  it("rejects unknown flags", () => {
    expect(() => parseArgs(["init", "--mystery"])).toThrow(/Unknown option/);
  });
});
