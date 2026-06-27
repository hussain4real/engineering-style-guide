# Architecture Document

## Document Metadata

| Field | Value |
| --- | --- |
| `title` | `<Project or feature name> Architecture` |
| `owner` | `<Engineering owner>` |
| `status` | `Draft` |
| `reviewers` | `<Engineering lead>, <Security reviewer>, <Operations reviewer>, <QA lead>` |
| `last_updated` | `YYYY-MM-DD` |
| `related_links` | `<BRS>, <ADR>, <diagrams>, <prototype>, <repository>` |

## Source Materials Reviewed

`source_materials_reviewed`

- [ ] BRS or feature brief:
- [ ] Existing system architecture:
- [ ] Current APIs, data model, integrations, or jobs:
- [ ] Security, compliance, or data-classification notes:
- [ ] Production incidents, operational notes, or observability data:

## Architecture Goal

State the technical outcome this architecture must enable.

## Context

Describe the current system, constraints, teams involved, and why the chosen approach is needed.

## Requirements Summary

- Functional requirements supported:
- Non-functional requirements supported:
- Constraints:

## System Overview

Summarize the proposed system in one or two paragraphs.

## Diagrams

Add links or embedded diagrams for:

- C4 context diagram:
- C4 container diagram:
- Sequence diagram:
- Deployment diagram:
- Data flow diagram:

## Component Breakdown

| Component | Responsibility | Owner | Runtime / storage | Notes |
| --- | --- | --- | --- | --- |
| `<Component>` | `<Responsibility>` | `<Team>` | `<Runtime>` | `<Notes>` |

## Data Flow

Describe important data movement, persistence, retention, and reporting flows.

## Integration Flow

| Integration | Protocol | Direction | Auth | Failure handling |
| --- | --- | --- | --- | --- |
| `<System>` | `<HTTP / event / batch>` | `<Inbound / outbound>` | `<Auth>` | `<Retry / alert / manual recovery>` |

## Auth And Security

- Authentication:
- Authorization:
- Sensitive data:
- Audit logging:
- Secrets management:
- Compliance considerations:

## Deployment Model

- Environments:
- Infrastructure:
- Configuration:
- Migrations:
- Rollback approach:

## Observability

- Logs:
- Metrics:
- Traces:
- Alerts:
- Dashboards:

## Scalability And Performance

- Expected volume:
- Performance targets:
- Capacity assumptions:
- Caching or queueing:

## Failure Modes

| Failure mode | User impact | Detection | Recovery |
| --- | --- | --- | --- |
| `<Failure>` | `<Impact>` | `<Alert / log / report>` | `<Recovery>` |

## Key Decisions

| Decision | Rationale | Alternatives considered | Related ADR |
| --- | --- | --- | --- |
| `<Decision>` | `<Rationale>` | `<Alternatives>` | `<ADR link>` |

## Risks

- Risk:

## Open Questions

- Question:
