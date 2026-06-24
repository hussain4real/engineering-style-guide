# Engineering Handoff

## Document Metadata

| Field | Value |
| --- | --- |
| `title` | `<Feature / incident / release> handoff` |
| `owner` | `<Current owner>` |
| `next_owner` | `<Next owner or team>` |
| `status` | `In progress / Blocked / Ready for review / Complete` |
| `last_updated` | `YYYY-MM-DD` |
| `related_links` | `<PRs>, <tickets>, <docs>, <dashboards>, <runbooks>` |

## Current State

Summarize where the work stands now.

## Completed

- [ ] Completed item:
- [ ] Completed item:

## Remaining Work

- [ ] Remaining item:
- [ ] Remaining item:

## How To Continue

1. Step:
2. Step:
3. Step:

## Validation

- Commands run:
- Manual checks:
- Environments verified:

## Risks And Blockers

| Risk or blocker | Impact | Owner | Next action |
| --- | --- | --- | --- |
| `<Risk>` | `<Impact>` | `<Owner>` | `<Action>` |

## Operational Notes

- Deployment notes:
- Rollback notes:
- Monitoring or dashboard links:
- Support or stakeholder notes:

## Example

```md
## Current State
The invoice approval API change is implemented and unit-tested. The PR is waiting for QA browser coverage.

## Completed
- [x] Added DTO/Pydantic validation for approval requests.
- [x] Added service tests for valid and invalid transitions.

## Remaining Work
- [ ] Add browser coverage for approval from the invoice detail screen.
- [ ] Confirm final validation message with product.

## How To Continue
1. Pull the branch and run the test suite.
2. Add the browser test listed in the test plan.
3. Update the PR with the final QA evidence.
```
