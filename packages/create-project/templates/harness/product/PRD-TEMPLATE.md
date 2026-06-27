# PRD — <feature / capability name>

> **How to register a PRD:** copy this file to `product/prds/NNNN-<slug>.md` (next number), fill it in,
> and add a row to [`product/prds/INDEX.md`](./prds/INDEX.md). Every requirement traces back to
> [`BUSINESS-GOAL.md`](./BUSINESS-GOAL.md). Tip (Claude Code): have the domain specialist draft it from
> the business goal, then the architect reviews — see the `discovery-to-prd` playbook.

| | |
|---|---|
| **PRD #** | NNNN |
| **Status** | draft \| in-review \| approved |
| **Owner** | _(name/role)_ |
| **Last updated** | _(date)_ |
| **Traces to** | `product/BUSINESS-GOAL.md` |

## 1. Summary
_2–3 sentences: what we're building and the outcome it creates._

## 2. Problem & business goal
_Restate the goal this PRD serves. Link the metrics from the business goal._

## 3. Users & key journeys
_Primary users and the 1–3 journeys this must support end-to-end._

## 4. Goals / Non-goals
- **Goals:** _what success includes_
- **Non-goals:** _what we deliberately exclude (prevents scope creep)_

## 5. Requirements
- **Functional** — _numbered, testable statements (each becomes acceptance criteria + a regression test)._
- **Non-functional** — _performance, security (map to the governance baseline), accessibility, i18n._

## 6. Scope & phases
_The wedge first, then increments. Map to `docs/plans/` for sequencing._

## 7. Success metrics & acceptance
_How each requirement is verified. What "done" means for the first release._

## 8. Risks, assumptions, open questions
_Known unknowns. Assumptions to validate._

## 9. References
_Source docs, standards (by ID), prior art, ADRs._
