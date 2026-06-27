# Milaha Starter Kit CLI

`@qatar-navigation-milaha/create-project` provides the internal `milaha` binary for creating new
Milaha project skeletons.

## Usage

Recommended internal path:

```bash
gh auth login
gh auth refresh -h github.com -s read:packages
gh extension install Qatar-Navigation-Milaha/gh-milaha
gh milaha init my-service
```

The `gh milaha` extension uses the developer's existing GitHub CLI login to access the private
GitHub Packages starter. It does not require developers to edit `~/.npmrc`, export
`NODE_AUTH_TOKEN`, or use pnpm/Corepack to launch the starter.

Direct package execution remains available for CI or maintainers:

```bash
npm exec --yes --package=@qatar-navigation-milaha/create-project@latest -- milaha init my-service
```

After publishing and installing globally, the command is:

```bash
milaha init my-service
```

## Supported v1 stacks

- NestJS / TypeScript API.
- FastAPI / Python API with `uv`.
- Optional Next.js / React frontend.
- Mastra AI agent orchestration in `apps/agents` by default.
- Langfuse AI observability and OpenTelemetry trace-tag scaffolding.
- OpenAPI contract and API-governance metadata.
- Optional Temporal workflow scaffold.
- Optional Claude harness from `Qatar-Navigation-Milaha/agent-harness`.

Generated projects include GitHub CI, gitleaks, sensitive-file checks, stack SAST, dependency audit,
OpenAPI drift checks, Mastra governance/evaluation checks, local gate config, Milaha standards,
engineering templates, ARC-style AI governance templates, and 100% app-code coverage thresholds.

Mastra is generated as a replaceable orchestration layer. Keep authentication, authorization,
business rules, validation, audit, rate limits, and approval decisions in the backend API.

## Development

```bash
pnpm --filter @qatar-navigation-milaha/create-project run typecheck
pnpm --filter @qatar-navigation-milaha/create-project run test:run
pnpm --filter @qatar-navigation-milaha/create-project run build
```

Refresh the vendored Claude harness:

```bash
pnpm --filter @qatar-navigation-milaha/create-project run sync:harness
```
