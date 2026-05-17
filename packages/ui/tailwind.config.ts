import type { Config } from "tailwindcss";
import companyPreset from "./src/tailwind-preset";

export default {
  presets: [companyPreset],
  content: ["./src/**/*.{ts,tsx,mdx}", "./.storybook/**/*.{ts,tsx}"]
} satisfies Config;
