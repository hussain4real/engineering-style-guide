# Engineering Style Guide

This workspace implements the MILAHA engineering style guide as a shared React/Next.js UI package documented through Storybook.

## What is included

- `@qatar-navigation-milaha/ui`: reusable React primitives.
- `@qatar-navigation-milaha/ui/styles.css`: brand tokens, CSS variables, and base styles.
- `@qatar-navigation-milaha/ui/tailwind-preset`: the shared Tailwind theme preset.
- Storybook foundations for color, typography, spacing, radius, focus, and accessibility.
- Storybook stories for V1 UI primitives.
- CI wiring for type checks, package build, unit tests, Storybook build, and Storybook browser tests.

## Brand foundations

The initial palette is sampled from the supplied brand swatches:

| Token | Value | Intended role |
| --- | --- | --- |
| `brand.purple` | `#5E108B` | Primary brand and main action |
| `brand.orange` | `#FF4B00` | Accent, highlight, focus |
| `brand.navy` | `#002447` | Text and dark surfaces |
| `brand.teal` | `#40BDAF` | Info and secondary emphasis |
| `surface.mint` | `#EAF7F4` | Soft background |
| `surface.white` | `#FFFFFF` | Default surface |

`Neo Sans Pro` is the primary brand font. The package loads Poppins as the interim fallback until licensed Neo Sans Pro `.woff2` files are available.

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

## Publishing

The npm package is published as `@qatar-navigation-milaha/ui` from the `Publish Package` GitHub Actions workflow.

Add an `NPM_TOKEN` repository secret with publish access to the `@qatar-navigation-milaha` npm scope, then run the workflow manually or publish a GitHub release. The workflow builds the package, runs unit checks, and publishes with npm provenance.

## Adoption rules

- New reusable UI belongs in `@qatar-navigation-milaha/ui`.
- New reusable UI must include Storybook stories before it is accepted.
- Use semantic tokens in app code, such as `primary`, `accent`, `text`, `background`, and `border`.
- Existing screens can migrate gradually; V1 is a guided standard, not a forced rewrite.
