# Engineering Style Guide

This workspace implements the MILAHA engineering style guide as a shared React/Next.js UI package documented through Storybook.

## What is included

- `@qatar-navigation-milaha/ui`: reusable React primitives.
- `@qatar-navigation-milaha/ui/styles.css`: brand tokens, CSS variables, and base styles.
- `@qatar-navigation-milaha/ui/tailwind-preset`: the shared Tailwind theme preset.
- Storybook foundations for color, typography, spacing, radius, focus, and accessibility.
- Storybook stories for V1 UI primitives.
- Copyable engineering templates for BRS, architecture, phased implementation plans, and supporting delivery documents.
- CI wiring for type checks, package build, unit tests, Storybook build, and Storybook browser tests.

## Brand foundations

The palette follows the official Milaha Brand Guidelines:

| Token | Value | Intended role |
| --- | --- | --- |
| `brand.purple` | `#5C0F8C` | Primary brand and main action |
| `brand.orange` | `#FF5200` | Accent, highlight, focus |
| `brand.navy` | `#041E42` | Text and dark surfaces |
| `brand.teal` | `#3CBFAE` | Info and secondary emphasis |
| `brand.lightTeal` | `#A7D5D2` | Soft dividers and supporting surfaces |
| `surface.lightTealSoft` | `#BEDEDA` | Soft background |
| `surface.white` | `#FFFFFF` | Default surface |

Arial is the official English typeface, with Arial Arabic for Arabic content. The shared UI stack is `Arial, "Arial Arabic", sans-serif`.

## Local development

Use the project Node version before starting Storybook:

```bash
nvm install
nvm use
```

```bash
pnpm install
pnpm run storybook
```

The root scripts also try to load `.nvmrc` automatically when VS Code tasks inherit an older global Node version.

## Quality checks

```bash
pnpm run typecheck
pnpm run build
pnpm run test:run
pnpm run build-storybook
```

For Storybook browser tests, install Playwright browsers first:

```bash
pnpm exec playwright install chromium
pnpm run test:storybook:run
```

## Engineering templates

Template source files live in `docs/templates` and are published through the Storybook `Engineering Guide/Templates` page.

The required baseline includes:

- BRS.
- Architecture document.
- Phased implementation plan.
- Feature brief / PRD-lite.
- ADR.
- API contract.
- Test plan.
- Release checklist.
- Runbook.

## Publishing

The package is published as `@qatar-navigation-milaha/ui` from the `Publish Package` GitHub Actions workflow.

The workflow builds the package, runs unit checks, and publishes to:

- npmjs: `https://www.npmjs.com/package/@qatar-navigation-milaha/ui`
- GitHub Packages: `https://github.com/orgs/Qatar-Navigation-Milaha/packages/npm/package/ui`

Add an `NPM_TOKEN` repository secret with publish access to the `@qatar-navigation-milaha` npm scope. To publish the org-scoped package to GitHub Packages while this source repository remains under `hussain4real`, add a `GH_PACKAGES_TOKEN` repository secret from a classic GitHub token with `read:packages` and `write:packages` access authorized for the `Qatar-Navigation-Milaha` organization. If the source repository is later moved into the organization, the workflow can use the repository `GITHUB_TOKEN`.

The publish workflow checks both registries first and skips any package version that is already present, so rerunning a release is safe.

To install from GitHub Packages, configure the consuming project or CI environment with the scoped registry:

```ini
@qatar-navigation-milaha:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

## Adoption rules

- New reusable UI belongs in `@qatar-navigation-milaha/ui`.
- New reusable UI must include Storybook stories before it is accepted.
- Use semantic tokens in app code, such as `primary`, `accent`, `text`, `background`, and `border`.
- Existing screens can migrate gradually; V1 is a guided standard, not a forced rewrite.
