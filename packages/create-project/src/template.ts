import type { StarterConfig } from "./types.js";

export type TemplateTokens = Record<string, string>;

export function tokenMap(config: StarterConfig): TemplateTokens {
  const versionSyncFiles = [
    "VERSION",
    config.backend === "fastapi" ? "apps/api/pyproject.toml" : "package.json",
    config.backend === "fastapi" && (config.agentRuntime === "mastra" || config.frontend === "nextjs")
      ? "package.json"
      : null,
    "CHANGELOG.md"
  ]
    .filter(Boolean)
    .join(", ");

  return {
    PROJECT_NAME: config.projectName,
    PROJECT_SLUG: config.projectSlug,
    PROJECT_ONE_LINER: config.projectOneLiner,
    TOKENS: "project values",
    PRIMARY_LANGUAGE: config.primaryLanguage,
    GATE_ENGINE: config.gateEngine,
    DOMAIN_SME_ROLE: `${config.projectSlug}-sme`,
    DOMAIN_NOUN: `${config.projectName} domain rules`,
    PM_AGENT_NAME: "pm",
    REFERENCE_DIRS: "\"docs/standards\" \"docs/templates\" \"product\" \"compliance\"",
    PROJECT_MEMORY_PATH: ".claude/memory/MEMORY.md",
    VERSION_SYNC_FILES: versionSyncFiles,
    COMPLIANCE_STANDARD: "Milaha IS-GL-014 / IS-ST-003 / IS-ST-004",
    ORG_OR_OWNER: "Qatar-Navigation-Milaha",
    EXTERNAL_AUTHORITY: "approved vendor documentation or integration authority"
  };
}

export function renderTemplate(input: string, tokens: TemplateTokens): string {
  return Object.entries(tokens).reduce(
    (content, [key, value]) => content.replaceAll(`{{${key}}}`, value),
    input
  );
}

export function unresolvedTokens(input: string): string[] {
  return [...new Set(input.match(/\{\{[A-Z0-9_]+\}\}/g) ?? [])].sort();
}
