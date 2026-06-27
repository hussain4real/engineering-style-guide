import { describe, expect, it } from "vitest";
import { normalizeConfig } from "./config.js";
import { renderCiWorkflow } from "./ci.js";

describe("renderCiWorkflow", () => {
  it("includes Node quality, security, and 100% coverage checks", () => {
    const workflow = renderCiWorkflow(
      normalizeConfig({
        projectName: "Port Ops",
        backend: "nestjs",
        frontend: "nextjs"
      })
    );

    expect(workflow).toContain("pnpm run lint");
    expect(workflow).toContain("pnpm run test:coverage");
    expect(workflow).toContain("gitleaks/gitleaks-action");
    expect(workflow).toContain("100% app-code coverage");
    expect(workflow).toContain("pnpm audit --audit-level=moderate");
  });

  it("includes Python uv, Bandit, pip-audit, and coverage checks", () => {
    const workflow = renderCiWorkflow(
      normalizeConfig({
        projectName: "Port Ops",
        backend: "fastapi"
      })
    );

    expect(workflow).toContain("astral-sh/setup-uv");
    expect(workflow).toContain("uv run bandit -q -r app");
    expect(workflow).toContain("uv run pip-audit");
    expect(workflow).toContain("uv run pytest --cov=app --cov-report=term-missing --cov-fail-under=100");
  });
});
