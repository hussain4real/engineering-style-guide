import { describe, expect, it } from "vitest";
import {
  gateEngineForBackend,
  assertValidSlug,
  normalizeConfig,
  primaryLanguageForBackend,
  slugify
} from "./config.js";

describe("starter config", () => {
  it("slugifies project names", () => {
    expect(slugify("Milaha Port Ops API")).toBe("milaha-port-ops-api");
    expect(slugify(" 'Port---Ops' / AI!! ")).toBe("port-ops-ai");
  });

  it("defaults to NestJS, Mastra, Langfuse, OpenTelemetry, harness enabled, and 100% coverage", () => {
    const config = normalizeConfig({ projectName: "Port Ops" }, "/tmp");

    expect(config.projectSlug).toBe("port-ops");
    expect(config.backend).toBe("nestjs");
    expect(config.frontend).toBe("none");
    expect(config.agentRuntime).toBe("mastra");
    expect(config.aiObservability).toBe("langfuse");
    expect(config.telemetry).toBe("opentelemetry");
    expect(config.workflowRuntime).toBe("none");
    expect(config.governanceProfile).toBe("agentic");
    expect(config.includeHarness).toBe(true);
    expect(config.coveragePolicy.appCodePercent).toBe(100);
    expect(config.targetDir).toBe("/tmp/port-ops");
  });

  it("maps backend choices to language and gate defaults", () => {
    expect(primaryLanguageForBackend("nestjs")).toBe("TypeScript");
    expect(primaryLanguageForBackend("fastapi")).toBe("Python");
    expect(gateEngineForBackend("nestjs")).toBe("lefthook");
    expect(gateEngineForBackend("fastapi")).toBe("pre-commit");
  });

  it("rejects invalid slugs", () => {
    expect(() => assertValidSlug("Bad Slug")).toThrow(/kebab-case/);
  });

  it("rejects Langfuse without Mastra", () => {
    expect(() =>
      normalizeConfig({
        projectName: "Port Ops",
        agentRuntime: "none",
        aiObservability: "langfuse"
      })
    ).toThrow(/requires Mastra/);
  });
});
