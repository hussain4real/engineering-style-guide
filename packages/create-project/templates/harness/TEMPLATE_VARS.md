# Template variables

Every token below appears as `{{TOKEN}}` in the template. `scripts/setup.sh` prompts for each.

| Token | Meaning | Example |
|---|---|---|
| `{{PROJECT_NAME}}` | Human-readable project name | `Acme Invoicing Service` |
| `{{PROJECT_SLUG}}` | kebab-case identifier (repo/package) | `acme-invoicing` |
| `{{PROJECT_ONE_LINER}}` | One-sentence description | `B2B invoice clearance for mid-market sellers` |
| `{{PRIMARY_LANGUAGE}}` | Main implementation language | `TypeScript` or `Python` |
| `{{GATE_ENGINE}}` | Commit-gate engine | `lefthook` or `pre-commit` |
| `{{DOMAIN_SME_ROLE}}` | Name of the domain-specialist agent | `payments-sme` |
| `{{DOMAIN_NOUN}}` | What the domain rules describe | `invoice rules`, `routing rules` |
| `{{PM_AGENT_NAME}}` | Name of the orchestrator agent | `pm` (default) |
| `{{REFERENCE_DIRS}}` | Dirs the session hook inventories | `docs/standards`, `docs/adr` |
| `{{PROJECT_MEMORY_PATH}}` | Persistent memory file (optional) | `.claude/memory/MEMORY.md` |
| `{{VERSION_SYNC_FILES}}` | Files kept in lockstep on a version bump | `VERSION`, `package.json`, `CHANGELOG.md` |
| `{{COMPLIANCE_STANDARD}}` | External standard you map controls to (optional) | `OWASP ASVS`, `ISO 27001` |
| `{{ORG_OR_OWNER}}` | GitHub owner for the new repo | `your-account` |

## Conventions
- Tokens use `{{UPPER_SNAKE}}`. After setup, `grep -rn '{{' .` must return nothing.
- Optional tokens (memory path, compliance standard) can be left blank — the helper removes the
  feature cleanly if you skip it.
