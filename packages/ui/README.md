# @qatar-navigation-milaha/ui

Shared React primitives, MILAHA brand tokens, Tailwind preset, and Storybook documentation for frontend teams.

## Usage

```tsx
import { Button } from "@qatar-navigation-milaha/ui";
import "@qatar-navigation-milaha/ui/styles.css";

export function SaveAction() {
  return <Button>Save changes</Button>;
}
```

## Tailwind

Use the shared preset in a consuming app:

```ts
import companyPreset from "@qatar-navigation-milaha/ui/tailwind-preset";

export default {
  presets: [companyPreset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@qatar-navigation-milaha/ui/dist/**/*.js"
  ]
};
```

Prefer semantic classes like `bg-primary`, `text-text`, `border-border`, and `bg-background-soft` in app code.

## Font

Arial is the official English typeface, with Arial Arabic for Arabic content. The package exposes this as `Arial, "Arial Arabic", sans-serif` through `styles.css`.
