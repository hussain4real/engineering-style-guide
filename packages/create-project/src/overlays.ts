import { renderCiWorkflow } from "./ci.js";
import { hasNodeWorkspace } from "./config.js";
import type { GeneratedFile, StarterConfig } from "./types.js";

function rootPackage(config: StarterConfig): GeneratedFile[] {
  if (!hasNodeWorkspace(config)) {
    return [];
  }

  const scripts: Record<string, string> = {
    lint: "pnpm -r --if-present lint",
    typecheck: "pnpm -r --if-present typecheck",
    build: "pnpm -r --if-present build",
    test: "pnpm -r --if-present test",
    "test:coverage": "pnpm -r --if-present test:coverage",
    "openapi:check": "pnpm -r --if-present openapi:check",
    "governance:check": "pnpm -r --if-present governance:check",
    "eval:baseline": "pnpm -r --if-present eval:baseline",
    ci: "pnpm run lint && pnpm run typecheck && pnpm run build && pnpm run test:coverage && pnpm run openapi:check && pnpm run governance:check"
  };

  return [
    {
      path: "package.json",
      content: `${JSON.stringify(
        {
          name: config.projectSlug,
          version: "0.1.0",
          private: true,
          packageManager: "pnpm@10.11.0",
          engines: {
            node: ">=22.12.0"
          },
          workspaces: ["apps/*"],
          scripts
        },
        null,
        2
      )}\n`
    },
    {
      path: "pnpm-workspace.yaml",
      content: `packages:
  - "apps/*"
`
    },
    {
      path: ".npmrc",
      content: `@qatar-navigation-milaha:registry=https://npm.pkg.github.com
`
    }
  ];
}

function localGateFiles(config: StarterConfig): GeneratedFile[] {
  if (config.backend === "nestjs") {
    return [
      {
        path: "lefthook.yml",
        content: `pre-commit:
  parallel: true
  commands:
    gitleaks:
      run: gitleaks protect --staged --no-banner --config .gitleaks.toml
    sensitive-files:
      run: |
        BLOCKED=$(git diff --cached --name-only | grep -iE '\\.(env|pem|key|p12)$' | grep -v '\\.env\\.example$' || true)
        if [ -n "$BLOCKED" ]; then echo "Blocked sensitive files:\\n$BLOCKED" >&2; exit 1; fi
    lint:
      run: pnpm run lint
    typecheck:
      run: pnpm run typecheck
    openapi-contract:
      run: pnpm run openapi:check
    test-coverage:
      run: pnpm run test:coverage
    agent-governance:
      run: pnpm run governance:check
    governance:
      run: |
        [ "\${GOVERNANCE_BYPASS:-0}" = "1" ] && exit 0
        if [ -d harness/scripts/governance ]; then
          python3 harness/scripts/governance/validate_ai_inventory.py
          python3 harness/scripts/governance/check_owners_coverage.py
        fi
`
      }
    ];
  }

  return [
    {
      path: ".pre-commit-config.yaml",
      content: `default_install_hook_types: [pre-commit, pre-push]

repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.9.0
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format

  - repo: https://github.com/PyCQA/bandit
    rev: 1.8.0
    hooks:
      - id: bandit
        args: [-q, -r, apps/api/app]

  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.24.0
    hooks:
      - id: gitleaks

  - repo: local
    hooks:
      - id: sensitive-files
        name: block sensitive files
        entry: bash -c 'git diff --cached --name-only | grep -iE "\\.(env|pem|key|p12)$" | grep -v "\\.env\\.example$" && exit 1 || exit 0'
        language: system
        pass_filenames: false
      - id: mypy
        name: mypy
        entry: bash -c 'cd apps/api && uv run mypy app tests'
        language: system
        pass_filenames: false
      - id: pytest-coverage
        name: pytest with 100% coverage
        entry: bash -c 'cd apps/api && uv run pytest --cov=app --cov-report=term-missing --cov-fail-under=100'
        language: system
        pass_filenames: false
        stages: [pre-push]
      - id: openapi-contract
        name: OpenAPI contract check
        entry: bash -c 'cd apps/api && uv run python scripts/export_openapi.py --check'
        language: system
        pass_filenames: false
${hasNodeWorkspace(config) ? `      - id: node-agent-governance
        name: Node agent governance
        entry: bash -c 'pnpm run governance:check'
        language: system
        pass_filenames: false
` : ""}      - id: governance
        name: governance metadata
        entry: bash -c 'if [ -d harness/scripts/governance ]; then python3 harness/scripts/governance/validate_ai_inventory.py && python3 harness/scripts/governance/check_owners_coverage.py; fi'
        language: system
        pass_filenames: false
`
    }
  ];
}

function openApiContract(config: StarterConfig): string {
  return `${JSON.stringify(
    {
      openapi: "3.1.0",
      info: {
        title: `${config.projectName} API`,
        version: "0.1.0",
        description: config.projectOneLiner
      },
      paths: {
        "/health": {
          get: {
            operationId: "getHealth",
            tags: ["health"],
            responses: {
              "200": {
                description: "Service health response"
              }
            }
          }
        }
      }
    },
    null,
    2
  )}\n`;
}

function agenticGovernanceFiles(config: StarterConfig): GeneratedFile[] {
  if (config.agentRuntime !== "mastra") {
    return [];
  }

  return [
    {
      path: "contracts/agent-tools/tool-registry.yaml",
      content: `tools:
  - id: service-health
    owner: platform-engineering
    side_effect_level: read
    human_approval_required: false
    allowed_scopes:
      - health:read
    data_classification: internal
    api_boundary: apps/api
  - id: sensitive-action
    owner: platform-engineering
    side_effect_level: write
    human_approval_required: true
    allowed_scopes:
      - agent:approve
    data_classification: restricted
    api_boundary: apps/api
`
    },
    {
      path: "contracts/observability/trace-tags.md",
      content: `# Required Agent Trace Tags

Every Mastra agent/tool span must carry these tags before production use.

| Tag | Purpose |
| --- | --- |
| \`milaha.project\` | Project/repository slug |
| \`milaha.agent_runtime\` | Runtime implementation, currently \`mastra\` |
| \`milaha.agent_id\` | Agent identifier |
| \`milaha.tool_id\` | Tool identifier |
| \`milaha.correlation_id\` | End-to-end request correlation |
| \`milaha.data_classification\` | Data sensitivity level |
`
    },
    {
      path: "docs/templates/agentic-ai-use-case-registration-template.md",
      content: `# Agentic AI Use Case Registration

## Use Case

- Name:
- Owner:
- Business capability:
- Customer-facing or internal:
- Advisory or action-taking:
- Read-only or write-capable:

## Scope

- Allowed APIs/tools:
- Disallowed APIs/tools:
- Required human approvals:
- Runtime/cost limits:
- Rollback owner:

## Review

- Data classification:
- Model/provider approval:
- Architecture review outcome:
- Production readiness decision:
`
    },
    {
      path: "docs/templates/agent-tool-registry-template.md",
      content: `# Agent Tool Registry

| Tool ID | Owner | API boundary | Scopes | Side effect | Human approval | Data classification |
| --- | --- | --- | --- | --- | --- | --- |
| \`service-health\` | platform-engineering | \`apps/api\` | \`health:read\` | read | no | internal |
`
    },
    {
      path: "docs/templates/agent-guardrails-template.md",
      content: `# Agent Guardrails

## Identity and Ownership

- Agent owner:
- Support owner:
- Rollback owner:

## Runtime Controls

- Allowed models:
- Allowed tools:
- Token/cost limits:
- Rate limits:

## Safety Controls

- Prompt-injection defenses:
- PII/data leakage controls:
- Output validation:
- Human approval triggers:
- Feedback loop:
`
    },
    {
      path: "docs/templates/agent-evaluation-plan-template.md",
      content: `# Agent Evaluation Plan

## Dataset

- Dataset name:
- Source:
- Data classification:
- Refresh cadence:

## Checks

- Functional correctness:
- Tool-use correctness:
- Prompt-injection resistance:
- Data leakage:
- Cost/latency:
- Regression threshold:

## Evidence

- Langfuse project/link:
- Evaluation run:
- Approval decision:
`
    },
    {
      path: "docs/templates/ai-data-classification-template.md",
      content: `# AI Data Classification

| Surface | Classification | Retention | Export allowed | Notes |
| --- | --- | --- | --- | --- |
| Prompts |  |  |  |  |
| Completions |  |  |  |  |
| Retrieved context |  |  |  |  |
| Tool inputs/outputs |  |  |  |  |
| Traces/evaluations |  |  |  |  |
`
    },
    {
      path: "docs/templates/ai-production-readiness-template.md",
      content: `# AI Production Readiness

- [ ] Use case registered.
- [ ] Data classification approved.
- [ ] Model/provider approved.
- [ ] OpenAPI/tool contracts reviewed.
- [ ] Guardrails implemented.
- [ ] Langfuse/telemetry configured.
- [ ] Baseline evaluation passed.
- [ ] Human approval flow tested.
- [ ] Rollback owner confirmed.
`
    },
    ...(config.includeHarness
      ? [{
      path: ".claude/playbooks/mastra-agent-migration.md",
      content: `# Mastra Agent Migration Playbook

Use this playbook when moving agent behavior into the governed Mastra runtime.

1. Register the use case in \`docs/templates/agentic-ai-use-case-registration-template.md\`.
2. Define or update tool contracts in \`contracts/agent-tools/tool-registry.yaml\`.
3. Keep business rules, RBAC, validation, audit, and approvals in \`apps/api\`.
4. Add Langfuse evaluation evidence before production promotion.
5. Confirm OpenAPI contract and trace-tag gates are green.
`
      }]
      : [])
  ];
}

export function sharedOverlayFiles(config: StarterConfig): GeneratedFile[] {
  return [
    ...rootPackage(config),
    ...localGateFiles(config),
    ...agenticGovernanceFiles(config),
    {
      path: "README.md",
      content: `# ${config.projectName}

${config.projectOneLiner}

Generated with the Milaha starter kit.

## Stack

- Backend: ${config.backend === "nestjs" ? "NestJS / TypeScript" : "FastAPI / Python"}
- Frontend: ${config.frontend === "nextjs" ? "Next.js / React" : "None"}
- Agent runtime: ${config.agentRuntime === "mastra" ? "Mastra AI" : "None"}
- AI observability: ${config.aiObservability === "langfuse" ? "Langfuse" : "None"}
- Telemetry: ${config.telemetry === "opentelemetry" ? "OpenTelemetry" : "None"}
- Workflow runtime: ${config.workflowRuntime === "temporal" ? "Temporal" : "None"}
- Claude harness: ${config.includeHarness ? "Enabled" : "Disabled"}
- Coverage gate: 100% statements, branches, functions, and lines for project-owned app code.

## First commands

${config.backend === "fastapi" ? "- `cd apps/api && uv sync --dev`\n- `cd apps/api && uv run pytest --cov=app --cov-report=term-missing --cov-fail-under=100`" : "- `pnpm install`\n- `pnpm run ci`"}

## Standards

- \`docs/standards/coding-guidelines.md\`
- \`docs/standards/code-communication-guidelines.md\`
- \`docs/templates/README.md\`

## Agentic AI boundary

When \`apps/agents\` is present, treat it as orchestration only. Agents call governed tools and APIs;
\`apps/api\` remains responsible for authentication, authorization, business rules, validation, audit,
rate limits, and human approval decisions.
`
    },
    {
      path: ".gitignore",
      content: `node_modules/
.venv/
__pycache__/
*.pyc
dist/
build/
.next/
.turbo/
.ruff_cache/
.mypy_cache/
.pytest_cache/
coverage/
.coverage
.env
.env.*
!.env.example
*.pem
*.key
*.p12
.DS_Store
harness/DASHBOARD.md
harness/status/
.harness/locks/
`
    },
    {
      path: ".gitleaks.toml",
      content: `title = "${config.projectSlug} gitleaks config"

[extend]
useDefault = true

[allowlist]
description = "Project allowlist"
regexes = [
  '''EXAMPLE_[A-Z0-9_]+''',
  '''dummy|placeholder|changeme'''
]
`
    },
    {
      path: ".github/workflows/ci.yml",
      content: renderCiWorkflow(config)
    },
    {
      path: "contracts/openapi/api.json",
      content: openApiContract(config)
    },
    {
      path: "contracts/api-governance/api-product.yaml",
      content: `api_product:
  name: ${config.projectSlug}-api
  owner: platform-engineering
  lifecycle: draft
  backend: ${config.backend}
  route_prefix: /api
  version: v1
  scopes:
    - health:read
  quotas:
    default_rpm: 600
  deprecation:
    policy: 90-day notice before removing a published route
`
    },
    {
      path: ".milaha/starter-manifest.json",
      content: `${JSON.stringify(
        {
          starterPackage: "@qatar-navigation-milaha/create-project",
          starterVersion: "0.1.2",
          generatedAt: new Date().toISOString().slice(0, 10),
          project: {
            name: config.projectName,
            slug: config.projectSlug
          },
          stack: {
            backend: config.backend,
            frontend: config.frontend,
            agentRuntime: config.agentRuntime,
            aiObservability: config.aiObservability,
            telemetry: config.telemetry,
            workflowRuntime: config.workflowRuntime,
            primaryLanguage: config.primaryLanguage,
            packageManager: config.packageManager,
            pythonTooling: config.pythonTooling
          },
          governance: {
            profile: config.governanceProfile,
            apiBoundary: "apps/api",
            agentRuntimeBoundary: config.agentRuntime === "mastra" ? "apps/agents" : null
          },
          overlays: {
            harness: config.includeHarness,
            standards: true,
            githubCi: true,
            securityChecks: true,
            openApiContractGate: true,
            agentGovernance: config.agentRuntime === "mastra",
            langfuse: config.aiObservability === "langfuse",
            openTelemetry: config.telemetry === "opentelemetry",
            temporal: config.workflowRuntime === "temporal"
          },
          coveragePolicy: config.coveragePolicy
        },
        null,
        2
      )}\n`
    },
    {
      path: ".milaha/harness-source.json",
      content: `${JSON.stringify(
        config.includeHarness
          ? {
              source: "Qatar-Navigation-Milaha/agent-harness",
              url: "https://github.com/Qatar-Navigation-Milaha/agent-harness",
              branch: "main",
              commit: "00fc85d91e37e23afd6fd9414efcd4f53d83a64c"
            }
          : {
              source: null,
              reason: "Claude harness disabled during milaha init."
            },
        null,
        2
      )}\n`
    }
  ];
}
