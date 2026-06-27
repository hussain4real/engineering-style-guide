# Setup — adapting this template to a new project

> **Start with GitHub's "Use this template", not `git clone`.** That creates a new repo with *your*
> project name, a **fresh git history**, and *your* remote. Cloning this template directly would tie
> you to its history/remote. Then clone **your** new repo and work there.

This template ships with `{{TOKENS}}` everywhere a project-specific value belongs. Adapting it is:
**create your repo → fill tokens → define the goal & PRD → pick a gate engine → wire the hook.**

## 1. Fill the tokens

Run the interactive helper (recommended):

```bash
bash scripts/setup.sh
```

It prompts for each token in [`TEMPLATE_VARS.md`](./TEMPLATE_VARS.md), substitutes them across the
repo, and removes the gate engine you did not pick. Re-runnable; it only touches `{{...}}` markers.

Or do it by hand:

```bash
# example
grep -rl '{{PROJECT_NAME}}' . | xargs sed -i '' 's/{{PROJECT_NAME}}/Acme Service/g'
```

Verify nothing is left:

```bash
grep -rn '{{' . --include='*.md' --include='*.yml' --include='*.yaml' --include='*.py' --include='*.sh' --include='*.json'
# (should print nothing)
```

## 1.5 Define the goal & PRD (before building)

Decide *what* and *why* before wiring the *how*:

1. Fill [`product/BUSINESS-GOAL.md`](./product/BUSINESS-GOAL.md) — objective, users, success metrics, constraints.
2. Register a PRD — copy [`product/PRD-TEMPLATE.md`](./product/PRD-TEMPLATE.md) → `product/prds/NNNN-<slug>.md`, fill it, and list it in [`product/prds/INDEX.md`](./product/prds/INDEX.md). One goal, many PRDs.

In Claude Code, run the `discovery-to-prd` playbook: ask the PM agent to interview you through the
business goal, have the domain specialist draft the PRD, the architect review it, and the PM write the
plan in `docs/plans/`. **Don't dispatch build work until the PRD is approved.**

## 2. Pick a commit-gate engine

The same logical gates are provided for both stacks. Pick one:

```bash
# TypeScript / Node
cp gates/typescript/lefthook.yml ./lefthook.yml
npm install -g lefthook && lefthook install

# Python
cp gates/python/.pre-commit-config.yaml ./
pipx install pre-commit && pre-commit install
```

Both share the **bypass convention**: every gate honors `<GATE_NAME>_BYPASS=1` and the bypass must be
recorded in the commit message. See [`gates/README.md`](./gates/README.md).

## 3. Wire the session-open hook

`.claude/settings.json` already references `.claude/hooks/session-open.sh`. Edit the hook's
`REFERENCE_DIRS` array to your project's standards/architecture/compliance directories, and set
`PROJECT_MEMORY_PATH` if you use a persistent memory file.

## 4. First run

```bash
python3 harness/scripts/build_dashboard.py     # writes harness/DASHBOARD.md
```

Start a session — the hook prints working-tree state, dashboard, and any open assumptions.

## 5. Grow it

Do **not** enable every governance gate on day one. Start with the core (agents, hooks, dashboard,
secret scanning, version-sync). Add a Phase A–D governance gate from `compliance/` only when a real
need appears. The harness is meant to grow with the project.

## Adapting the agent roster

`.claude/agents/` ships seven neutral roles plus a `domain-sme` stub. Rename `domain-sme` to your
domain (e.g. `payments-sme`), delete roles you don't need, and keep the **sole-caller invariant**:
only the `pm` agent dispatches the others.
