import { renderCiWorkflow } from "./ci.js";
import { hasNodeWorkspace } from "./config.js";
import type { GeneratedFile, StarterConfig } from "./types.js";

function rootPackage(config: StarterConfig): GeneratedFile[] {
  if (!hasNodeWorkspace(config)) {
    return [];
  }

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
          scripts: {
            lint: "pnpm -r --if-present lint",
            typecheck: "pnpm -r --if-present typecheck",
            build: "pnpm -r --if-present build",
            test: "pnpm -r --if-present test",
            "test:coverage": "pnpm -r --if-present test:coverage",
            ci: "pnpm run lint && pnpm run typecheck && pnpm run build && pnpm run test:coverage"
          }
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
    test-coverage:
      run: pnpm run test:coverage
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
      - id: governance
        name: governance metadata
        entry: bash -c 'if [ -d harness/scripts/governance ]; then python3 harness/scripts/governance/validate_ai_inventory.py && python3 harness/scripts/governance/check_owners_coverage.py; fi'
        language: system
        pass_filenames: false
`
    }
  ];
}

export function sharedOverlayFiles(config: StarterConfig): GeneratedFile[] {
  return [
    ...rootPackage(config),
    ...localGateFiles(config),
    {
      path: "README.md",
      content: `# ${config.projectName}

${config.projectOneLiner}

Generated with the Milaha starter kit.

## Stack

- Backend: ${config.backend === "nestjs" ? "NestJS / TypeScript" : "FastAPI / Python"}
- Frontend: ${config.frontend === "nextjs" ? "Next.js / React" : "None"}
- Claude harness: ${config.includeHarness ? "Enabled" : "Disabled"}
- Coverage gate: 100% statements, branches, functions, and lines for project-owned app code.

## First commands

${config.backend === "fastapi" ? "- `cd apps/api && uv sync --dev`\n- `cd apps/api && uv run pytest --cov=app --cov-report=term-missing --cov-fail-under=100`" : "- `pnpm install`\n- `pnpm run ci`"}

## Standards

- \`docs/standards/coding-guidelines.md\`
- \`docs/standards/code-communication-guidelines.md\`
- \`docs/templates/README.md\`
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
      path: ".milaha/starter-manifest.json",
      content: `${JSON.stringify(
        {
          starterPackage: "@qatar-navigation-milaha/create-project",
          starterVersion: "0.1.0",
          generatedAt: new Date().toISOString().slice(0, 10),
          project: {
            name: config.projectName,
            slug: config.projectSlug
          },
          stack: {
            backend: config.backend,
            frontend: config.frontend,
            primaryLanguage: config.primaryLanguage,
            packageManager: config.packageManager,
            pythonTooling: config.pythonTooling
          },
          overlays: {
            harness: config.includeHarness,
            standards: true,
            githubCi: true,
            securityChecks: true
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
