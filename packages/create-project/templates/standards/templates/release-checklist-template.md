# Release Checklist

## Document Metadata

| Field | Value |
| --- | --- |
| `title` | `<Project or feature name> Release Checklist` |
| `owner` | `<Release owner>` |
| `status` | `Draft` |
| `reviewers` | `<Engineering lead>, <QA lead>, <Operations owner>, <Business owner>` |
| `last_updated` | `YYYY-MM-DD` |
| `related_links` | `<Release PR>, <deployment run>, <implementation plan>, <rollback plan>` |

## Source Materials Reviewed

`source_materials_reviewed`

- [ ] Implementation plan:
- [ ] Test plan and test results:
- [ ] Architecture and deployment notes:
- [ ] Migration, secrets, and configuration requirements:
- [ ] Support, operations, or business readiness notes:

## Release Summary

Describe what is being released and who is affected.

## Pre-Release Checks

- [ ] Requirements and acceptance criteria are met.
- [ ] Required tests passed.
- [ ] Required reviews and approvals are complete.
- [ ] Documentation, support notes, and training needs are addressed.
- [ ] Known issues are documented and accepted.

## Deployment Checks

- [ ] Deployment window confirmed.
- [ ] Deployment owner and backup owner confirmed.
- [ ] Database migrations reviewed.
- [ ] Secrets and environment variables configured.
- [ ] Feature flags or rollout controls configured.
- [ ] Rollback approach confirmed.

## Monitoring And Rollback

- Dashboard:
- Alerts:
- Smoke checks:
- Rollback trigger:
- Rollback steps:

## Communication

- Stakeholders to notify:
- Release note:
- Support handover:

## Post-Release Validation

- [ ] Smoke test production workflow.
- [ ] Check logs, metrics, and alerts.
- [ ] Confirm business-facing output.
- [ ] Capture follow-up issues.

## Signoff

| Approver | Role | Decision | Date |
| --- | --- | --- | --- |
| `<Name>` | `<Role>` | `Approved / Changes requested` | `YYYY-MM-DD` |
