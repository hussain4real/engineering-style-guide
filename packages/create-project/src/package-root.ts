import path from "node:path";
import { fileURLToPath } from "node:url";

export function packageRootFrom(importMetaUrl = import.meta.url): string {
  return path.resolve(path.dirname(fileURLToPath(importMetaUrl)), "..");
}

export function templatesRoot(packageRoot: string): string {
  return path.join(packageRoot, "templates");
}
