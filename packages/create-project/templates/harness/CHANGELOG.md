# Changelog

All notable changes are recorded here. `VERSION` is the source of truth; the `version-sync` gate keeps
it aligned with your project's package/manifest file.

## [0.3.0] - 2026-06-19 — External-integration diagnosis playbook

### Added
- `.claude/playbooks/external-integration-diagnosis.md` — playbook for diagnosing **opaque/masked
  rejections from an external compliance authority** (the dominant hard-failure mode of an integrator).
  Distilled from the Taxera **2026-06 GTA episode**: 4 days + 6 onboarding devices burned on a "GTA
  platform bug" theory when the real cause was our own genesis-PDH assumption (we used ZATCA's rule,
  GTA hashes the device public key), invisible because the SDK masked the HTTP 400 `EGA-02-0009` as a
  generic `E-S-34`. The five moves: raw-signal-first, assumption-first hypothesis space, adversarially
  disprove blame-external, escalate to the authority in parallel on day one, and a resource stop-loss
  (diagnosis burns resources with zero fixes, so `/investigate`'s failed-fix counter never fires).
  Maps to IS-GL-014 change-control discipline; cites the OceanMate↔Taxera evidence. Generalized — no
  real secrets or domain data.

### Changed
- Playbook index (`.claude/playbooks/README.md`) now lists every playbook — added the new playbook and
  the previously-missing `discovery-to-prd` row.

## [0.2.2] - 2026-06-06 — Generated-artifact lifecycle guardrail

### Added
- **Generated-artifact lifecycle** documented in `gates/README.md`: a two-tier model (machine-only
  snapshots gitignored; human-readable status either gitignored or tracked-with-a-self-healing
  consistency gate) plus an **idempotent-generator** rule and a **venv-interpreter** rule.
- `dashboard-consistency` (self-heal) row in the gate matrix.
- Trial-and-error entry in `docs/harness-engineering.md`: the dirty-tree → stash-accumulation
  incident (OceanMate 22 stashes) and the silent `datetime.UTC` hook failure, each turned into a
  guardrail. Evidence: Taxera PR #160; OceanMate artifact-lifecycle overhaul.

### Changed
- `harness/scripts/build_dashboard.py` is now **idempotent** — rewrites `DASHBOARD.md` only when its
  non-timestamp content changes, so no-op regenerations never dirty the working tree.
- `.gitignore` documents the two-tier model and ignores `harness/status/` + `*.snapshot.json`.

## [0.2.1] - 2026-06-02 — PRD register (one goal, many PRDs)

### Changed
- Restructured `product/` into a **PRD register**: `BUSINESS-GOAL.md` (one north star) + `PRD-TEMPLATE.md` (copy per feature) + `prds/INDEX.md` (the register) + `prds/0001-example-feature.md` (worked example). Same pattern as ADRs/plans — a clear place to *register* each PRD.
- Updated all references (README, SETUP, CLAUDE.md, discovery-to-prd playbook, product/README) to the register flow: copy template → `prds/NNNN-<slug>.md` → list in `INDEX.md`.

## [0.2.0] - 2026-06-02 — Product front-end + clearer onboarding

### Added
- `product/` front-end — define *why* before *how*: `BUSINESS-GOAL.md` and `PRD.md` templates, plus a `product/README.md` explaining the goal → discovery → PRD → plan → build flow.
- `.claude/playbooks/discovery-to-prd.md` — how to go from idea to an approved PRD with Claude Code (PM interviews → domain-sme drafts → architect reviews → PM plans).

### Changed
- README: a **Mermaid usage-flow diagram** clarifying "Use this template → your own repo (fresh history, your remote) → setup → goal/PRD → git sync", an explicit *don't `git clone` the template* warning, a new **Step 2 — define the goal & PRD**, and a git-sync step. Fixed the process-loop Mermaid (removed unsupported `linkStyle`/`font-weight`).
- SETUP.md: added the use-this-template note and a "Define the goal & PRD" step.
- CLAUDE.md: added a **Product Definition** section.

## [0.1.0] - 2026-06-02 — Initial Milaha harness template

### Added
- Agent roster (`pm` sole-caller + architect, developer, qa, security-officer, designer, ops, domain-sme stub).
- Teams (delivery, discovery, governance, release) and playbooks (sprint-cycle, version-bump, incident-response, security-incident, worktree-isolation).
- Session hooks (session-open, pm-write-lock, block-reset-hard, post-agent-dashboard) + `.claude/settings.json` wiring.
- `harness/` PM plumbing: append-only activity log (7 event types), TODOS, AI inventory schema, stdlib `build_dashboard.py`, Phase A–D governance skeletons.
- Dual-stack commit gates: `lefthook` (TypeScript) and `pre-commit` (Python), same logical gates.
- `compliance/` scaffolding mapped to the **Milaha security baseline (IS-GL-014 / IS-ST-003 / IS-ST-004)** + Secure Coding Checklist by reference.
- `docs/harness-engineering.md` — the full explainer (story, architecture, OceanMate ⇄ Taxera co-evolution, lessons).
- Tooling: `scripts/setup.sh` (token substitution) and `scripts/check_internal.sh` (internal confidentiality gate — blocks secrets / real operational data).
- Docs: README (layered for leadership + engineering), SETUP, TEMPLATE_VARS, PROVENANCE, LICENSE placeholder.
