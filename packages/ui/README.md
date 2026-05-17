# @company/ui

Shared React primitives, brand tokens, Tailwind preset, and Storybook documentation for company frontend teams.

## Usage

```tsx
import { Button } from "@company/ui";
import "@company/ui/styles.css";

export function SaveAction() {
  return <Button>Save changes</Button>;
}
```

## Tailwind

Use the shared preset in a consuming app:

```ts
import companyPreset from "@company/ui/tailwind-preset";

export default {
  presets: [companyPreset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@company/ui/dist/**/*.js"
  ]
};
```

Prefer semantic classes like `bg-primary`, `text-text`, `border-border`, and `bg-background-soft` in app code.
