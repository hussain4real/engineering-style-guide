# MILAHA Code Communication Guidelines

Clear communication is part of engineering quality. These guidelines define how MILAHA teams explain code changes, review work, respond to feedback, and hand off context.

## Pull Requests

Every PR should explain:

- Why the change is needed.
- What changed.
- How it was tested.
- What risks, migrations, or rollout steps exist.
- Which requirements, tickets, documents, ADRs, or incidents are linked.

Keep PRs focused. If a change mixes unrelated goals, split it or clearly explain why it must ship together.

Example:

```md
## Summary
- Adds approval validation to the invoice workflow.
- Returns a documented `invalid_invoice_status` error when an invoice is not pending.
- Updates the API contract and service tests.

## Testing
- pnpm run test:run
- Verified `POST /invoices/:id/approve` returns 400 for already-approved invoices.

## Risk And Rollout
- Risk: low; validation only affects invalid transitions.
- Rollback: revert the service and DTO changes.
```

## Commits

- Use concise, imperative commit messages.
- Keep each commit focused on a coherent change.
- Mention the affected area when useful, such as `api`, `auth`, `storybook`, or `templates`.
- Avoid vague messages like `fix`, `changes`, or `updates`.
- Do not include secrets, tokens, or private customer data in commit messages.

Examples:

```text
Add invoice approval validation
Document FastAPI response schema rules
Fix Storybook template navigation
```

## Code Reviews

Reviews should be specific, respectful, and actionable.

- Tie comments to code, behavior, requirements, or documented standards.
- State the impact of the issue.
- Suggest a direction when the fix is not obvious.
- Separate blocking issues from optional improvements.
- Prefer questions when intent is unclear.
- Avoid personal language; review the code and the outcome.

Use severity language when helpful:

- `Blocking`: must change before merge.
- `Should fix`: important, but the author and reviewer can agree on timing.
- `Suggestion`: optional improvement.
- `Question`: clarification needed.
- `Praise`: positive feedback worth keeping.

Example:

```text
Should fix: This route accepts a raw dict, so invalid payloads can reach business logic.

Impact: Consumers may receive inconsistent errors and OpenAPI will not describe the request contract.

Suggested direction: Add a Pydantic request model and cover invalid payloads in a router test.
```

## Responding To Review

- Acknowledge blocking comments with the planned change or a clear reason for disagreement.
- Mark resolved only after the code or discussion actually resolves the point.
- If the implementation changes materially during review, update the PR summary or add a comment.
- If feedback reveals a durable decision, create or update an ADR.

## Status Updates

Status updates should be short and concrete:

- Current state.
- What changed since the last update.
- Blockers or decisions needed.
- Next action and owner.
- Expected timing when known.

Use absolute dates for deadlines and release coordination.

Example:

```text
Status: Invoice approval validation is implemented and unit-tested.
Blocker: Waiting for QA confirmation on the UAT scenario list.
Next: Add browser coverage after QA confirms scenarios by 2026-06-25.
Owner: Backend team.
```

## Handoffs

Use a handoff when work moves between engineers, teams, or support/operations.

A useful handoff includes:

- Current state.
- What has been completed.
- What remains.
- Known risks and blockers.
- How to run, test, deploy, or validate the work.
- Links to PRs, tickets, documents, dashboards, and runbooks.

Example:

```md
## Current State
Invoice approval validation is implemented in the API and covered by service tests.

## Remaining Work
- Add browser coverage for the approval flow.
- Confirm Arabic validation copy with product.

## How To Continue
1. Pull the branch.
2. Run `pnpm run test:run`.
3. Add the browser scenario from the test plan.

## Risks And Blockers
- UAT copy is not final.
- Release requires the API contract update to be reviewed.
```

## Code Comments

- Explain why, not what.
- Add comments near non-obvious business rules, security decisions, fallbacks, or integration quirks.
- Remove stale comments when behavior changes.
- Do not leave TODOs without an owner, reason, or follow-up link.

## ADR Triggers

Create or update an ADR when a decision:

- Changes system architecture or service boundaries.
- Introduces a new framework, database, queue, cloud service, or major dependency.
- Changes auth, security, privacy, or compliance posture.
- Creates a contract other teams depend on.
- Chooses one meaningful tradeoff over another.
- Will be hard to reverse later.

## Communication Review Checklist

- [ ] PR explains why, what, tests, risks, rollout, and links.
- [ ] Review comments are actionable and tagged by importance when useful.
- [ ] Blocking feedback is resolved or explicitly accepted as follow-up.
- [ ] Handoffs include enough context for the next owner to continue safely.
- [ ] ADRs are created for durable technical decisions.
