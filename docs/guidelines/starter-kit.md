# MILAHA Starter Kit

The Milaha starter kit is the required starting point for new internal application repositories.
It gives teams a project skeleton with the same engineering standards, CI gates, coverage policy,
security checks, and optional Claude harness used across the organization.

## Command

```bash
milaha init my-service
```

For one-off use before a global install:

```bash
pnpm dlx @qatar-navigation-milaha/create-project milaha init my-service
```

## V1 Stack Options

| Prompt | Options | Default |
| --- | --- | --- |
| Backend | NestJS / TypeScript, FastAPI / Python | NestJS |
| Frontend | None, Next.js / React | None |
| Claude harness | Install, skip | Install |
| Dependency install | Install, skip | Install |
| Git initialization | Initialize, skip | Initialize |

## Generated Baseline

Every generated repository includes:

- `apps/api` for the selected backend.
- Optional `apps/web` for Next.js.
- `docs/standards` with coding and code-communication guidelines.
- `docs/templates` with the shared engineering templates.
- `.github/workflows/ci.yml` with lint, typecheck, build, test, coverage, security, and dependency checks.
- `.gitleaks.toml` and sensitive-file blocking.
- `.milaha/starter-manifest.json` recording selected stack, starter version, overlays, and coverage policy.

When the Claude harness is enabled, the project also receives `.claude`, `harness`, `compliance`,
`product`, and related governance files from `Qatar-Navigation-Milaha/agent-harness`.

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
- Harness governance validation when the Claude harness is installed.

## Maintenance

The starter-kit package owns the CLI and generator logic. The vendored Claude harness is refreshed
with:

```bash
pnpm --filter @qatar-navigation-milaha/create-project run sync:harness
```

After a sync, review the pinned commit in `.milaha-harness-source.json` before publishing.
