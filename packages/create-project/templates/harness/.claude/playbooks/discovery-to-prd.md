# Playbook: discovery-to-prd

**Trigger:** a new project, or a new major capability with no PRD yet. **Goal:** go from a fuzzy idea
to an approved PRD that the build loop can execute — driven with Claude Code.

> Front-end of the development loop: **BUSINESS-GOAL → DISCOVERY → PRD → PLAN → BUILD.** Nothing gets
> built until the PRD names the goal it serves.

## Steps (with Claude Code)

1. **Frame the goal** — ask the `{{PM_AGENT_NAME}}` agent to interview you through
   `product/BUSINESS-GOAL.md` (objective, user, status quo, wedge, metrics, constraints, horizon).
   Brainstorm widely first; an *office-hours*-style questioning pass works well. Write the answers in.

2. **Discovery** — the `discovery` team (`{{DOMAIN_SME_ROLE}}` + architect + qa) gathers evidence:
   how it's done today, sources/standards, constraints. Capture notes in `product/`.

3. **Draft the PRD** — have `{{DOMAIN_SME_ROLE}}` register a PRD: copy `product/PRD-TEMPLATE.md` →
   `product/prds/NNNN-<slug>.md`, draft it from the business goal, and add a row to
   `product/prds/INDEX.md`. Every requirement must trace back to a goal/metric; keep goals vs
   non-goals explicit.

4. **Review** — `architect` reviews feasibility + system impact (drafts an ADR if a decision is
   needed); `qa` turns requirements into acceptance criteria. Iterate in-review.

5. **Approve & plan** — once `Status: approved`, the `{{PM_AGENT_NAME}}` writes the execution plan in
   `docs/plans/YYYY-MM-DD-<slug>.md` and records a DECISION activity-log entry.

6. **Hand to the build loop** — only now does dispatch/build begin. The PRD + plan are the contract;
   the harness enforces *how* it ships.

## Definition of done
`product/BUSINESS-GOAL.md` filled · a PRD in `product/prds/` at `Status: approved` with acceptance criteria ·
an execution plan in `docs/plans/` · a DECISION entry in the activity log.
