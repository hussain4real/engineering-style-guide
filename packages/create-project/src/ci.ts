import type { StarterConfig } from "./types.js";

function nodeSteps(config: StarterConfig): string {
  if (config.backend !== "nestjs" && config.frontend !== "nextjs") {
    return "";
  }

  return `
      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: pnpm

      - name: Install Node dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint Node workspaces
        run: pnpm run lint

      - name: Typecheck Node workspaces
        run: pnpm run typecheck

      - name: Build Node workspaces
        run: pnpm run build

      - name: Test Node workspaces with 100% app-code coverage
        run: pnpm run test:coverage

      - name: Audit Node dependencies
        run: pnpm audit --audit-level=moderate
`;
}

function pythonSteps(config: StarterConfig): string {
  if (config.backend !== "fastapi") {
    return "";
  }

  return `
      - name: Setup Python
        uses: actions/setup-python@v6
        with:
          python-version: "3.12"

      - name: Install uv
        uses: astral-sh/setup-uv@v7

      - name: Install Python dependencies
        working-directory: apps/api
        run: uv sync --dev

      - name: Check Python formatting
        working-directory: apps/api
        run: uv run ruff format --check .

      - name: Lint Python
        working-directory: apps/api
        run: uv run ruff check .

      - name: Typecheck Python
        working-directory: apps/api
        run: uv run mypy app tests

      - name: Test Python with 100% app-code coverage
        working-directory: apps/api
        run: uv run pytest --cov=app --cov-report=term-missing --cov-fail-under=100

      - name: Python SAST
        working-directory: apps/api
        run: uv run bandit -q -r app

      - name: Audit Python dependencies
        working-directory: apps/api
        run: uv run pip-audit
`;
}

function harnessSteps(config: StarterConfig): string {
  if (!config.includeHarness) {
    return "";
  }

  return `
      - name: Validate harness governance metadata
        run: |
          python3 harness/scripts/governance/validate_ai_inventory.py
          python3 harness/scripts/governance/check_owners_coverage.py
`;
}

export function renderCiWorkflow(config: StarterConfig): string {
  return `name: Milaha CI

on:
  pull_request:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Check for sensitive files
        run: |
          blocked="$(git ls-files | grep -iE '\\.(env|pem|key|p12)$' | grep -v '\\.env\\.example$' || true)"
          if [ -n "$blocked" ]; then
            echo "Blocked sensitive files:"
            echo "$blocked"
            exit 1
          fi

      - name: Secret scan
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
${nodeSteps(config)}${pythonSteps(config)}${harnessSteps(config)}
`;
}
