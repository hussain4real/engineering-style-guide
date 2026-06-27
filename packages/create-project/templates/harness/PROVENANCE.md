# Provenance

This harness was distilled from two live Milaha software builds:

- **OceanMate** — TypeScript / Next.js, maritime operations.
- **Taxera** — Python / FastAPI, e-invoicing compliance.

Two unrelated domains, two languages, one anchor (Milaha). Each project arrived at nearly the same
development harness on its own — an agent roster with a single orchestrator, a `harness/` PM-plumbing
folder with an append-only activity log and a stdlib dashboard, commit gates, and a Phase A–D
governance pattern. Patterns proven on one were repeatedly adopted by the other; the cross-over is
visible in git history (for example, Taxera's absorption of OceanMate's security-governance harness
on 2026-05-23, commits #139 / #140 / #145, and the "OceanMate pattern" / "OceanMate parity" commit
messages).

The convergence is the point: what survived being re-expressed in both projects is the universal
core, and that core is what this template captures. Domain rules, business logic, real operational
data, and secrets are **not** included — those stay in the product repositories. This is the
*method*, made reusable for the next Milaha team.
