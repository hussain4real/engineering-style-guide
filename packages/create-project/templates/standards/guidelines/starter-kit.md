# MILAHA Starter Kit

The Milaha starter kit is the required starting point for new internal application repositories.
It gives teams a project skeleton with the same engineering standards, CI gates, coverage policy,
security checks, governed agentic AI baseline, and optional Claude harness used across the organization.

## Command

Recommended internal path:

```bash
gh auth login
gh auth refresh -h github.com -s read:packages
gh extension install Qatar-Navigation-Milaha/gh-milaha
gh milaha init my-service
```

The `gh milaha` extension uses the developer's GitHub CLI login to access the private starter package
and writes only temporary npm configuration for the child process. Developers do not need to edit
`~/.npmrc`, export `NODE_AUTH_TOKEN`, or use pnpm/Corepack to start a project.

For CI or package-maintainer use without the GitHub CLI extension:

```bash
npm exec --yes --package=@qatar-navigation-milaha/create-project@latest -- milaha init my-service
```

## V1 Stack Options

| Prompt | Options | Default |
| --- | --- | --- |
| Backend | NestJS / TypeScript, FastAPI / Python | NestJS |
| Frontend | None, Next.js / React | None |
| Agent orchestration runtime | Mastra AI, none | Mastra AI |
| AI observability | Langfuse, none | Langfuse when Mastra is enabled |
| Telemetry | OpenTelemetry, none | OpenTelemetry |
| Durable workflow runtime | None, Temporal scaffold | None |
| Claude harness | Install, skip | Install |
| Dependency install | Install, skip | Install |
| Git initialization | Initialize, skip | Initialize |

## Generated Baseline

Every generated repository includes:

- `apps/api` for the selected backend.
- Optional `apps/web` for Next.js.
- `apps/agents` with a governed Mastra runtime when agent orchestration is enabled.
- `contracts/openapi`, `contracts/api-governance`, and agent-tool contracts for API and tool review.
- `docs/standards` with coding and code-communication guidelines.
- `docs/templates` with the shared engineering templates.
- `.github/workflows/ci.yml` with lint, typecheck, build, test, coverage, security, and dependency checks.
- `.gitleaks.toml` and sensitive-file blocking.
- `.milaha/starter-manifest.json` recording selected stack, agent runtime, governance profile, overlays, and coverage policy.

When the Claude harness is enabled, the project also receives `.claude`, `harness`, `compliance`,
`product`, and related governance files from `Qatar-Navigation-Milaha/agent-harness`.

## Agentic AI Boundary

Mastra is the v1 orchestration implementation for AI-enabled starters. It is intentionally generated
as `apps/agents` so it can be replaced later without moving business controls into the runtime.
Authentication, authorization, business rules, validation, audit logging, rate limits, and approval
decisions stay in `apps/api`.

Generated Mastra projects include a sample governed tool, a tool-policy registry, Langfuse
configuration helpers, required OpenTelemetry trace tags, baseline evaluation placeholders, and
ARC-style templates for use-case registration, data classification, guardrails, tool registry,
evaluation planning, and production readiness.

## Coverage Policy

Generated projects enforce 100% statements, branches, functions, and lines for project-owned app
code. Framework bootstrap files, generated artifacts, test setup, and configuration glue are
excluded so teams are held to a strict application-code bar without fighting framework noise.

## Security Policy

Generated CI includes:

- Secret scanning with gitleaks.
- Sensitive-file blocking for `.env`, key, certificate, and private-key file types.
- Dependency audit for the selected stack.
- Stack SAST: TypeScript security linting or Python Bandit.
- OpenAPI contract drift checks.
- Mastra governance and baseline evaluation checks when `apps/agents` is present.
- Langfuse configuration and OpenTelemetry trace-tag checks when enabled.
- Harness governance validation when the Claude harness is installed.

## Maintenance

The starter-kit package owns the CLI and generator logic. The vendored Claude harness is refreshed
with:

```bash
pnpm --filter @qatar-navigation-milaha/create-project run sync:harness
```

After a sync, review the pinned commit in `.milaha-harness-source.json` before publishing.
