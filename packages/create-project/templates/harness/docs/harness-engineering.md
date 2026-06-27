# Harness Engineering at Milaha — how we build, and keep improving the way we build

> **Audience:** Milaha engineering teams considering adopting this harness, and leadership evaluating
> it as a shared asset. **Companion:** the template in this repo is the *thing*; this doc is the
> *why and how*.

---

## 0. The one idea

There is **no single correct harness.** It is project-specific, *earned through trial and error*, and
**never finished** — it grows by folding each development-time issue back in (security expansion, new
agents, new teams, regression prevention, design discipline) and by **cross-project learning**.

At Milaha we have proven this twice, in parallel: **OceanMate** (maritime ops, TypeScript) and
**Taxera** (e-invoicing compliance, Python). Different domains, different languages, same harness DNA.

---

## 1. What a harness is (plain words)

The harness is everything **around** the code that lets an AI-assisted team produce trustworthy
software, repeatably. It is **not** the product. People hear "AI wrote it" and worry about chaos — the
harness is the answer: the chaos is fenced by structure.

```
            ungoverned                          governed
   fast   |  single-agent vibe coding |  <-- the harness -->  governed speed
   slow   |          -                |  classic enterprise IT
```

Speed without governance can't pass a security review; governance without speed can't ship. The
harness refuses the trade-off — **startup speed *with* IS-GL-014-aligned governance, simultaneously.**

---

## 2. How it started

It did **not** start as a grand design. Each project began with one repo, one `CLAUDE.md`, and a few
conventions. Harness pieces were added **one at a time, each in response to a real problem**:

| The pain (real) | The harness piece it created |
|---|---|
| A seed file grew to ~11,660 lines, unmanageable | a dedicated **data-architect agent**, then a manifest-driven seed dispatcher |
| Version numbers drifted across footer / changelog / docs | the **N-file version-bump protocol**, enforced by a commit gate |
| Docs and code silently diverged | **sync skills** that re-align rules ↔ tests ↔ code |
| AI surfaces needed audit evidence | an **AI-system inventory** (`AI_INVENTORY.yaml`) tied to IS-GL-014 / IS-ST-004 |

**Pain → name the failure → encode the fix as a permanent gate.** Do that enough times and you have an
engineering system.

---

## 3. The architecture (seven layers)

```
1. AGENTS       role-specialized AI agents, 1 sole-caller orchestrator
2. TEAMS        trigger-based agent subsets
3. PLAYBOOKS    reusable multi-step workflows
4. GUARDRAILS   commit-time gates (rules as code)
5. MEMORY+LOGS  append-only activity log (7 event types) + stdlib dashboard
6. SYNC         docs <-> tests <-> code coherence
7. SECURITY+DESIGN  IS-GL-014/IS-ST aligned governance + a codified design guide
```

- **Sole-caller invariant** — only the PM agent dispatches others. Agents never call each other. This
  keeps the audit trail single-threaded and reconstructable: who decided what, in what order.
- **Guardrails as code** — secret scan, version-sync, AI-inventory validation, owners coverage, and a
  destructive-command guard run at commit time. Rules live in the hook, not in willpower.
- **Security as a first-class citizen** — the `security-officer` agent owns *policy* (mapping to
  IS-GL-014 / IS-ST-003 / IS-ST-004), while implementation stays with developer/architect via the PM.
  **The auditor does not write the audited code.**
- **Design as harness** — the design guide is codified in `CLAUDE.md` and enforced per page by review
  skills, so a small team keeps 30+ screens coherent without a dedicated design team. Encoding taste
  is as much harness work as encoding a commit gate.

---

## 4. Co-evolution: OceanMate ⇄ Taxera (verified, internal)

Two products, one philosophy — and the cross-over is in the git history, not the slideware.

| | OceanMate | Taxera |
|---|---|---|
| Domain | Maritime operations | E-invoicing compliance |
| Anchor | Milaha | Milaha (KSA reference) |
| Stack | TypeScript · Next.js | Python · FastAPI |
| Gate engine | `lefthook` | `pre-commit` (ruff/mypy/bandit) |
| Structure | module-based | phase-gated (00→06) |
| Shared DNA | `.claude/{agents,teams,playbooks}`, `harness/` + `build_dashboard.py`, `AI_INVENTORY.yaml`, PM-write lock, session-open hook, gstack, English-only | (same) |

**Traceable transfer (OceanMate → Taxera):** the whole **security-governance harness** was ported
(Taxera stories `security-harness-port-complete`, `secure-coding-167-mapping`, plus
`build_security_posture.py` / `secure_coding_eval.py`); commit **#145** security-status reports
("OceanMate pattern"); commit **#140** Lucide icons ("OceanMate parity"); the in-product copilot's AI
governance mirrors OceanMate's. The same idea re-expressed: gates are `lefthook` in TypeScript and
`pre-commit` in Python — different tool, identical principle. When a concept survives a change of
language and domain, you've found something universal — and that universal core is exactly what this
template ships.

---

## 5. Trial and error → lessons learned (the honest part)

The harness is a record of mistakes we chose not to repeat:

- Agents *thought* they were isolated in a worktree but were editing `main` → the **Worktree Safety
  Protocol** + a verify-by-statusline step.
- A seed extraction silently dropped a `password_hash` field → logins failed two weeks later on a
  fresh volume → a **5-step seed-extraction regression checklist**.
- Phantom citations (made-up rule IDs) survived in code ~10 days → a **citation-audit gate**.
- Two agents wrote 87% of the activity log → restructured so the doers record.
- Assumptions caused incidents → a standing rule: **verify first, no assumptions; quote the source.**
- Generators wrote a wall-clock timestamp into *tracked* status files on every run → the working tree
  went dirty on every session-open, forcing stash-on-branch-switch (OceanMate hit 22 stranded
  stashes) → the **two-tier generated-artifact model** (machine-only snapshots gitignored; tracked
  status made **idempotent** — write only on substantive change — plus a **self-healing** consistency
  gate that regenerates + `git add`s at commit time instead of just blocking). Taxera PR #160.
- A harness hook ran `python3` (= macOS system 3.9), which `ImportError`ed on `datetime.UTC` and
  **failed silently**, masking the dirty-tree bug for weeks → the **venv-interpreter rule**: every
  hook/script uses `.venv/bin/python` with a `python3` fallback.

**Meta-lesson:** every incident becomes a guardrail. That single loop is the engine of the harness —
and the reason you can't just copy another team's harness wholesale. You copy the *loop*, not the
exact gates.

---

## 6. Principles

1. **No correct harness** — project-specific and earned, not adopted.
2. **Pain first** — add a piece only when a real problem demands it.
3. **Encode the fix** — every incident becomes a permanent guardrail.
4. **Cross-project learning** — OceanMate and Taxera make each other stronger.
5. **Security, regression, and design are first-class** — aligned to Milaha standards, not afterthoughts.
6. **Humans stay the authors** — the harness proposes and enforces; people decide.

---

## 7. How your Milaha team adopts it

1. **Use this template** → new repo under the Milaha org.
2. `bash scripts/setup.sh` — fill project identity; the **Milaha governance baseline is already wired**
   (IS-GL-014 / IS-ST-003 / IS-ST-004 mapping, AI-inventory cadence, English-only, single-PM-writer).
3. Pick a gate engine (`lefthook` or `pre-commit`).
4. **Start minimal, grow on pain** — don't enable every governance gate on day one; add Phase A–D
   controls when a real review/audit/AI-surface demands it.
5. Keep it clean: `bash scripts/check_internal.sh` before committing (no secrets / customer / vessel /
   financial data).

> The goal is not to install a framework. It's to start a third Milaha project already standing on the
> structure OceanMate and Taxera spent months earning — and to keep improving it from there.
