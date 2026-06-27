# MILAHA Engineering Templates

These templates are the required baseline for MILAHA engineering delivery documents. Teams may add sections when a project needs more detail, but they should not remove the shared metadata or source-material review sections.

## Shared Document Rules

Every template starts with:

| Field | Purpose |
| --- | --- |
| `title` | Human-readable document title. |
| `owner` | Person accountable for keeping the document current. |
| `status` | Current review state, such as `Draft`, `In review`, `Approved`, or `Superseded`. |
| `reviewers` | Required business, product, engineering, security, or operations reviewers. |
| `last_updated` | Date of the latest meaningful change in `YYYY-MM-DD` format. |
| `related_links` | Jira issues, GitHub issues or PRs, designs, dashboards, diagrams, and previous decisions. |
| `source_materials_reviewed` | Business inputs, current-system references, support tickets, analytics, stakeholder notes, and technical references reviewed before writing. |

## Template Catalog

| Template | Use it when |
| --- | --- |
| [BRS](./brs-template.md) | Business, product, and engineering need alignment before design or build. |
| [Architecture Document](./architecture-document-template.md) | A feature or service has meaningful system, integration, security, data, or deployment decisions. |
| [Phased Implementation Plan](./phased-implementation-plan-template.md) | Work needs staged delivery, reviewable checkpoints, or cross-team coordination. |
| [Feature Brief / PRD-lite](./feature-brief-prd-lite-template.md) | The team needs lightweight product intent before a full BRS is justified. |
| [ADR](./adr-template.md) | A technical decision should be recorded with context and tradeoffs. |
| [API Contract](./api-contract-template.md) | Teams need stable endpoint, payload, auth, validation, and error expectations. |
| [Agentic AI Use Case Registration](./agentic-ai-use-case-registration-template.md) | An AI agent or tool-capable workflow needs formal ownership, scope, and review. |
| [Agent Tool Registry](./agent-tool-registry-template.md) | A Mastra or future agent runtime needs governed tool metadata and approval rules. |
| [Agent Guardrails](./agent-guardrails-template.md) | Teams need runtime, safety, prompt-injection, output, and human-approval controls. |
| [Agent Evaluation Plan](./agent-evaluation-plan-template.md) | Agent behavior needs baseline, regression, quality, cost, or safety evaluation evidence. |
| [AI Data Classification](./ai-data-classification-template.md) | Prompts, completions, retrieved context, tool I/O, traces, or eval data need classification. |
| [AI Production Readiness](./ai-production-readiness-template.md) | An AI-enabled feature is ready for production review. |
| [Model and Provider Approval](./model-provider-approval-template.md) | A model/provider choice needs architecture and security approval before production use. |
| [Test Plan](./test-plan-template.md) | A feature needs explicit testing scope and acceptance coverage. |
| [Release Checklist](./release-checklist-template.md) | A change is ready to ship and needs deployment readiness checks. |
| [Runbook](./runbook-template.md) | A released service or workflow needs operating instructions. |
| [Pull Request Description](./pull-request-description-template.md) | A PR needs clear context, testing notes, risk, and rollout details. |
| [Code Review Comment](./code-review-comment-template.md) | A reviewer needs to give actionable feedback with clear impact. |
| [Engineering Handoff](./engineering-handoff-template.md) | Work moves between engineers, teams, support, or operations. |
| [Commit Message Guide](./commit-message-template.md) | Engineers need consistent commit-message expectations. |

## Standard Phase Statuses

Use these statuses in phased implementation plans:

- `Not started`
- `In progress`
- `Blocked`
- `Ready for review`
- `Complete`
