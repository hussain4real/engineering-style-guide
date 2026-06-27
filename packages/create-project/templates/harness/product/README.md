# product/ — define *why* before *how*

The rest of this template governs **how** you build. This folder governs **what** you build and
**why** — the business goal and the PRDs. Fill these *before* you start dispatching build work.

```
product/
├── BUSINESS-GOAL.md   ← the WHY (one per project) — objective · users · metrics · constraints  (start here)
├── PRD-TEMPLATE.md    ← copy this for each new PRD
└── prds/
    ├── INDEX.md        ← the PRD register — the single list of what you're committing to
    └── NNNN-<slug>.md  ← one PRD per feature/capability (e.g. 0001-checkout.md)
```

**One goal, many PRDs.** The business goal is the north star (one file). Each feature/capability gets
its own registered PRD under `prds/`, numbered and listed in `INDEX.md` — the same pattern as ADRs and
plans. To add one: copy `PRD-TEMPLATE.md` → `prds/NNNN-<slug>.md`, fill it, add a row to `INDEX.md`.

## The front-end of the loop

```
 BUSINESS-GOAL  ──►  DISCOVERY  ──►  PRD (registered in prds/)  ──►  PLAN (docs/plans/)  ──►  BUILD LOOP
   (why)            (evidence)        (what — one per feature)        (how/sequence)          (the harness)
```

Drive this with Claude Code using the [`discovery-to-prd`](../.claude/playbooks/discovery-to-prd.md)
playbook: brainstorm the goal → the domain specialist drafts a PRD → architect reviews → the PM turns
it into a plan. **Nothing gets built until an approved PRD names the goal it serves.**

> A bigger lifecycle (00-context → 01-discovery → 02-prd → 03-design → 04-develop → 05-validate →
> 06-operate, phase-gated) is a proven option for regulated builds. Start with this folder; adopt the
> full phased structure only when the project's risk justifies it.
