# {{PROJECT_NAME}}

{{PROJECT_ONE_LINER}}

This file is the project charter the AI reads first. It defines *how we work*, not *what the product
does*. Keep it lean; it is loaded into every session.

## Workflow

`Think → Plan → Build → Review → Test → Ship → Reflect.` Plan before executing. Prefer editing
existing files over creating new ones. Read a file before editing it. Run independent tool calls in
parallel.

## Product Definition

Define **what** and **why** before **how**. The business goal and PRD live in `product/`:
- `product/BUSINESS-GOAL.md` — objective, users, success metrics, constraints (fill first).
- `product/prds/` — one registered PRD per feature (copy `product/PRD-TEMPLATE.md`, list in `product/prds/INDEX.md`); each requirement traces back to the goal.

Create them with the `discovery-to-prd` playbook: the PM interviews you for the goal → the
`{{DOMAIN_SME_ROLE}}` drafts the PRD → architect reviews → the PM writes the plan in `docs/plans/`.
**Nothing gets built until the PRD names the goal it serves.**

## PM Session Protocol

A `SessionStart` hook (`.claude/hooks/session-open.sh`) runs automatically and prints:
1. Working-tree state + current branch
2. Remote-branch staleness (anything > 2 days behind main → investigate first)
3. Dashboard regeneration (`python3 harness/scripts/build_dashboard.py`)
4. Memory index (if `{{PROJECT_MEMORY_PATH}}` is set)
5. Open assumptions (any `ASSUMPTIONS.md` rows marked Open/Triggered → address first)
6. Reference-directory inventory (`{{REFERENCE_DIRS}}`)

**Single PM writer.** Only one session at a time may write PM artifacts (`harness/TODOS.md`,
`harness/DASHBOARD.md`, memory). Enforced by `.claude/hooks/pm-write-lock.sh` (4-hour stale timeout).

## Agent Team

The project runs on role-specialized agents (`.claude/agents/`). **`{{PM_AGENT_NAME}}` is the sole
caller** — it orchestrates; agents never call each other directly. This preserves the audit trail and
prevents context fragmentation.

| Agent | Role |
|---|---|
| `{{PM_AGENT_NAME}}` | Orchestrator — plan, dispatch, journal, dashboard |
| `architect` | Architecture, schema, ADRs, cross-cutting design |
| `developer` | Implementation + delivery |
| `qa` | Test strategy, regression, UAT |
| `security-officer` | Security governance, control mapping, incident command |
| `designer` | UX, visual system, component consistency |
| `ops` | Build, deploy, runtime, observability |
| `{{DOMAIN_SME_ROLE}}` | Authority on the project's {{DOMAIN_NOUN}} |

Teams (`.claude/teams/`) group agents by trigger; playbooks (`.claude/playbooks/`) are reusable
multi-agent workflows.

## Plan Management

Plans live in `docs/plans/`, filename `YYYY-MM-DD-{slug}.md`, with frontmatter
`title, status (draft|active|completed|archived), created, updated, tags`. Strategy lives in plans;
execution tracking lives in `harness/TODOS.md`; the event journal is `harness/logs/activity-*.md`.

## Version & History Management

On a version bump, keep `{{VERSION_SYNC_FILES}}` in lockstep — a commit gate enforces it. `VERSION`
is the single source of truth. Record every change in `CHANGELOG.md` (Added/Changed/Fixed) with a
one-line theme per release.

## Activity Log

`harness/logs/activity-YYYY-Www.md` is **append-only**, newest-first, weekly-rolling, with 7 event
types: `SHIP / DEMO / INCIDENT / STAKEHOLDER / DECISION / MODULE / RELEASE`. Corrections are new
entries, never overwrites. See `harness/logs/README.md`.

## Worktree Safety Protocol

To isolate a scope, use the editor's worktree mechanism that physically moves the session into the
worktree (not `git worktree add` + `cd`, which leaves the session anchored at main). Verify the
status line shows the worktree directory before working. One worktree per scope.

## Commit Gates

Gates run at commit time via `{{GATE_ENGINE}}` (see `gates/`). Core gates: secret scanning,
sensitive-file block, lint, type/format check, version-sync, activity-log nudge. Each gate honors
`<GATE_NAME>_BYPASS=1`, and any bypass must be documented in the commit message.

## Security governance baseline (Milaha)

Security is wired in, not bolted on, and aligned to the Milaha standards:
- **IS-GL-014** — AI / general security governance: the `security-officer` agent + an AI-system
  inventory (`harness/AI_INVENTORY.yaml`) with kill-switch refs and pre-prod gates.
- **IS-ST-003 / IS-ST-004** — security technical standards, incl. the **semi-annual** AI-surface
  review cadence (IS-ST-004) recorded in the inventory.
- **Milaha Secure Coding Checklist** — referenced by the commit gate (the checklist workbook itself
  is never copied into this repo).
- **Separation of duties** — security-officer owns policy; developer/architect implement via the PM.
- Controls are mapped to these standards in `compliance/POSTURE.md` and tracked as a trend.

## Language Policy

**All repo files: English only.** Bilingual is fine in live conversation and personal notes, never in
committed files.

## Milestone Invariant

No demo-only or throwaway parallel screens. Demos and reviews start from the real entry points of the
product. If a real screen is insufficient, reinforce it — do not build a copy.

## Cross-platform Engineering Rules

- ASCII-only stdout in scripts (no characters that break non-UTF terminals).
- Harness scripts are Python **stdlib only** — no third-party imports.
- Shell conditionals must be POSIX-portable.

## Skill Routing

When a request matches an available skill, invoke it as the first action rather than improvising.
