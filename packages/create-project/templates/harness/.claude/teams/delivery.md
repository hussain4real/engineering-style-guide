# Team: delivery

**Lead:** developer · **Members:** qa, architect (sign-off) · **Trigger:** a feature or bugfix ready to build and ship.

## Flow
1. `{{PM_AGENT_NAME}}` scopes the change and dispatches `developer`.
2. `developer` implements + writes tests; runs commit gates locally.
3. `qa` reviews coverage, exercises edge cases, signs off (or files a P0–P3 gap).
4. `architect` signs off if the change touches schema or boundaries.
5. `{{PM_AGENT_NAME}}` records a SHIP/MODULE activity-log entry.

## Definition of done
Passing lint + types/format + tests; changelog updated; no open P0/P1 from qa.
