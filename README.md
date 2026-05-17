# Engineering Style Guide

This workspace implements the MILAHA engineering style guide as a shared React/Next.js UI package documented through Storybook.

## What is included

- `@milaha/ui`: reusable React primitives.
- `@milaha/ui/styles.css`: brand tokens, CSS variables, and base styles.
- `@milaha/ui/tailwind-preset`: the shared Tailwind theme preset.
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

`Neo Sans Pro` is the primary brand font. Add licensed `.woff2` files under `packages/ui/public/fonts` and then enable the `@font-face` rule in `packages/ui/src/styles.css`.

## Local development

```bash
npm install
npm run storybook
```

The project is pnpm-workspace compatible, but npm workspaces are also supported for local verification.

## Quality checks

```bash
npm run typecheck
npm run build
npm run test:run
npm run build-storybook
```

For Storybook browser tests, install Playwright browsers first:

```bash
npx playwright install chromium
npm run test:storybook:run
```

## Publishing

The npm package is published as `@milaha/ui` from the `Publish Package` GitHub Actions workflow.

Add an `NPM_TOKEN` repository secret with publish access to the `@milaha` npm scope, then run the workflow manually or publish a GitHub release. The workflow builds the package, runs unit checks, and publishes with npm provenance.

## Adoption rules

- New reusable UI belongs in `@milaha/ui`.
- New reusable UI must include Storybook stories before it is accepted.
- Use semantic tokens in app code, such as `primary`, `accent`, `text`, `background`, and `border`.
- Existing screens can migrate gradually; V1 is a guided standard, not a forced rewrite.
