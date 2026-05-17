import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/tokens.ts", "src/tailwind-preset.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  external: ["next", "react", "react-dom", "react/jsx-runtime"]
});
