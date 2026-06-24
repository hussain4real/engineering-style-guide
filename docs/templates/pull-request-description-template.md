# Pull Request Description

## Summary

- What changed:
- Why it changed:
- Who is affected:

## Source Materials Reviewed

- [ ] BRS / feature brief:
- [ ] Architecture document / ADR:
- [ ] API contract / design:
- [ ] Ticket, incident, or support context:

## Changes

- Change:
- Change:
- Change:

## Testing

- [ ] Unit tests:
- [ ] Integration tests:
- [ ] Browser or UI tests:
- [ ] Accessibility checks:
- [ ] Manual validation:

## Risk And Rollout

- Risk level: `Low / Medium / High`
- Rollout notes:
- Migration or configuration changes:
- Rollback plan:

## Screenshots Or Evidence

Add screenshots, logs, command output, dashboard links, or before/after notes when useful.

## Checklist

- [ ] PR is scoped to one clear outcome.
- [ ] Requirements, risks, and follow-up work are linked.
- [ ] Tests or manual validation are documented.
- [ ] Docs, runbooks, templates, or ADRs are updated when needed.

## Example

```md
## Summary
- Adds invoice approval validation to prevent approving invoices outside the pending state.
- Updates the API contract with the `invalid_invoice_status` error.
- Adds service tests for pending, approved, and missing invoices.

## Testing
- pnpm run test:run
- Manual API check for `POST /invoices/:id/approve`

## Risk And Rollout
- Risk level: Low
- Rollout notes: deploy with the API service release.
- Rollback plan: revert the validation commit if existing consumers depend on the old behavior.
```
