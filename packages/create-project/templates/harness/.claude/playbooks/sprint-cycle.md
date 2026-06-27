# Playbook: sprint-cycle

**Trigger:** start or close of a work cycle.

## Open
1. Regenerate the dashboard; review `harness/TODOS.md` (P0 → P3).
2. `{{PM_AGENT_NAME}}` sets the cycle goal and dispatches the `delivery`/`discovery` teams.
3. Capture the plan in `docs/plans/YYYY-MM-DD-<slug>.md`.

## During
- One PM-writer at a time (lock). Append activity-log entries as work lands.
- Keep changes scoped; prefer small, reviewable increments.

## Close
1. Each agent appends its activity-log entries (SHIP/MODULE/DECISION/...).
2. Run the `governance` team if the cycle touched security-relevant surfaces.
3. Regenerate the dashboard; roll any unfinished P0/P1 forward with a reason.
4. Write a one-paragraph cycle summary.
