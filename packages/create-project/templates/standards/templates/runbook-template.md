# Runbook

## Document Metadata

| Field | Value |
| --- | --- |
| `title` | `<Service or workflow name> Runbook` |
| `owner` | `<Operations or engineering owner>` |
| `status` | `Draft` |
| `reviewers` | `<Engineering lead>, <Operations owner>, <Support owner>` |
| `last_updated` | `YYYY-MM-DD` |
| `related_links` | `<Architecture document>, <dashboards>, <alerts>, <repository>, <support queue>` |

## Source Materials Reviewed

`source_materials_reviewed`

- [ ] Architecture document:
- [ ] Deployment and infrastructure notes:
- [ ] Monitoring dashboards and alert rules:
- [ ] Incident history or support tickets:
- [ ] Known operational procedures:

## Service Overview

Describe what the service or workflow does and who depends on it.

## Ownership

| Responsibility | Owner | Backup | Contact |
| --- | --- | --- | --- |
| Primary owner | `<Name / team>` | `<Name / team>` | `<Channel>` |

## Dependencies

- System dependency:
- External dependency:
- Scheduled job:

## Health Checks And Alerts

| Signal | Normal state | Alert condition | Dashboard / link |
| --- | --- | --- | --- |
| `<Signal>` | `<Normal>` | `<Alert>` | `<Link>` |

## Common Operations

### Operation: `<Name>`

Purpose:

Steps:

1. Step:
2. Step:
3. Step:

Validation:

- [ ] Expected result:

## Incident Response

- Severity guidance:
- First checks:
- Escalation path:
- Customer or stakeholder communication:

## Troubleshooting

| Symptom | Likely cause | Checks | Recovery |
| --- | --- | --- | --- |
| `<Symptom>` | `<Cause>` | `<Checks>` | `<Recovery>` |

## Recovery Steps

1. Confirm impact and affected scope.
2. Check dashboards, logs, queues, and recent deployments.
3. Apply the documented recovery action.
4. Validate normal operation.
5. Record follow-up work.

## Maintenance

- Routine checks:
- Rotation or certificate expiry:
- Cleanup jobs:
- Review cadence:
