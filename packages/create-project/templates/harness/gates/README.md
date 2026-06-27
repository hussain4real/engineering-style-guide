# Commit gates (dual-stack)

The same logical gates, provided for both stacks. **Pick one** and copy it to your repo root.

| Logical gate | TypeScript (`lefthook`) | Python (`pre-commit`) |
|---|---|---|
| Secret scan | `gitleaks` | `gitleaks` |
| Sensitive files blocked | `sensitive-files` | `sensitive-files` |
| Lint | `eslint` | `ruff` |
| Type / format | `tsc --noEmit` | `ruff-format`, `mypy` (push) |
| SAST | (eslint security rules) | `bandit` |
| Version sync | `version-sync` | `version-sync` |
| Activity-log nudge | `activity-log-nudge` | `activity-log-nudge` |
| Generated-artifact consistency | `dashboard-consistency` (self-heal) | `dashboard-consistency` (self-heal) |
| Governance (Phase A–D) | calls `harness/scripts/governance/*.py` | calls `harness/scripts/governance/*.py` |

The governance Python scripts are shared verbatim across both stacks — domain logic is
language-agnostic, only the trigger syntax differs.

## Install

```bash
# TypeScript
cp gates/typescript/lefthook.yml ./lefthook.yml && lefthook install

# Python
cp gates/python/.pre-commit-config.yaml ./ && pre-commit install
```

## Bypass convention

Every gate honors `<GATE_NAME>_BYPASS=1`. A bypass must be recorded in the commit message. Use it
rarely; the point of a gate is that bypassing is visible.

## Generated-artifact lifecycle

Generators (e.g. `harness/scripts/build_dashboard.py`) write status files. Two tiers, two rules:

- **Tier 1 — machine-only snapshots** (status JSON/XLSX nobody reads by hand): **gitignore them.**
  Never track an artifact regenerated on every run; it only churns the tree and forces stashes.
- **Tier 2 — human-readable status you want visible in-repo** (the dashboard): **either** gitignore
  it (simplest — this template does, see `.gitignore`) **or** track it AND add a **self-healing**
  consistency gate — a hook that *regenerates and `git add`s* the artifact at commit time so the
  committed copy always matches state. A self-healer (regenerate + stage), **not** a blocker that
  just fails the commit and makes you do it by hand.

Either way, **generators must be idempotent** — write only when non-timestamp content changes — so a
no-op run never dirties the tree. (Hardened across two production projects: a generator that stamps
wall-clock time on every run dirtied the tree on every session-open, forcing stash accumulation.)

## Interpreter

Hooks and harness scripts must invoke the **project venv interpreter** (`.venv/bin/python`, falling
back to `python3`), never a bare `python3`. A bare `python3` can resolve to an old system Python
(e.g. macOS ships 3.9, which `ImportError`s on `datetime.UTC`); the step then fails silently and the
gate becomes a no-op without anyone noticing.

## Philosophy

Fast checks (lint, secret scan, format) run on **every commit**; heavy checks (tests, type-check)
run on **push**. Rules live in the hook, not in anyone's memory.
