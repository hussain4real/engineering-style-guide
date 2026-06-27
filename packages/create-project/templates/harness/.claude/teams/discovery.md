# Team: discovery

**Lead:** {{DOMAIN_SME_ROLE}} · **Members:** architect, qa · **Trigger:** a new requirement, a source-document change, or an ambiguity to resolve.

## Flow
1. `{{DOMAIN_SME_ROLE}}` extracts the requirement into domain rules with provenance.
2. `architect` assesses system impact (schema, boundaries) and drafts an ADR if needed.
3. `qa` identifies the acceptance criteria and test implications.
4. `{{PM_AGENT_NAME}}` records a DECISION entry and queues delivery work.

## Output
Domain rules updated + (if needed) an ADR + acceptance criteria — before any code is written.
