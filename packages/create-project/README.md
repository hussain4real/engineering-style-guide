# Milaha Starter Kit CLI

`@qatar-navigation-milaha/create-project` provides the internal `milaha` binary for creating new
Milaha project skeletons.

## Usage

```bash
pnpm dlx @qatar-navigation-milaha/create-project milaha init my-service
```

After publishing and installing globally, the command is:

```bash
milaha init my-service
```

## Supported v1 stacks

- NestJS / TypeScript API.
- FastAPI / Python API with `uv`.
- Optional Next.js / React frontend.
- Optional Claude harness from `Qatar-Navigation-Milaha/agent-harness`.

Generated projects include GitHub CI, gitleaks, sensitive-file checks, stack SAST, dependency audit,
local gate config, Milaha standards, engineering templates, and 100% app-code coverage thresholds.

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
