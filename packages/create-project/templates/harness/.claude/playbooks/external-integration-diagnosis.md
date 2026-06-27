# Playbook: external-integration-diagnosis

**Trigger:** an external authority/service (`{{EXTERNAL_AUTHORITY}}`) rejects or behaves unexpectedly,
the error is **opaque or masked**, and the published docs do not explain it.

> Layers **on top of** `/investigate` — it does not replace it. Run `/investigate`'s phases as the
> spine and insert the five moves below at the marked points. Use this only for *external-authority*
> failures; a bug you can reproduce locally is plain `/investigate`, and a breach is `security-incident`.

Why it exists: opaque external rejections have a failure dynamic ordinary debugging mishandles — the
real signal is masked at the boundary, the true cause is often **our own unverified assumption**, and
the comfortable "it's their fault" theory hardens because the same invested context keeps confirming it.

## Team
`developer` (instrument + reproduce) · `qa` (verify + CAPA) · `{{DOMAIN_SME_ROLE}}` + `architect`
(authority/protocol interpreters) · a **fresh** subagent as adversary (Move 3) · `{{PM_AGENT_NAME}}`
tracks resource burn (Move 5).

## The five moves
1. **Raw signal first.** Never conclude from a transformed/masked error. Capture the raw boundary
   response (`status + body + headers + correlationId`) *before* any SDK/wrapper touched it. If you are
   quoting an SDK error code as the symptom, you have not done Move 1 — SDK codes are downstream.
2. **Assumption-first hypothesis space.** Before suspecting the authority, suspect **our own
   unverified values**. Enumerate every Open/`NEEDS_VERIFY` assumption feeding the failing flow and ask
   in writing: *"which unverified assumption of ours reproduces exactly this symptom?"* A value that is
   only *internally consistent* is not proven correct if its seed was itself a copied assumption.
3. **Adversarially disprove the blame-external theory.** The moment the leading theory becomes "it's
   the authority's fault," spawn a **fresh subagent** with no investment in that theory, briefed to
   *disprove* it: "assume OUR code/assumption is wrong — what value, if wrong, reproduces this exact
   symptom? Default to 'it is us' unless you can prove otherwise." The invested session cannot
   self-correct here.
4. **Escalate to the authority in parallel, day one.** When a rule lives only with the authority (no
   public doc), the authority is the only resolving source — send the inquiry on day one *in parallel*
   with self-diagnosis, not as a last resort. Attach the Move 1 raw capture; archive inquiry + reply.
5. **Resource stop-loss.** This class burns resources in *diagnosis* (re-submissions, attempts, hours)
   with zero fixes, so `/investigate`'s failed-fix counter never fires. Set a budget up front (e.g. N
   attempts OR 1 working day). On breach: mandatory **perspective reset** — reopen every "ruled out"
   hypothesis, re-run Move 3 with a fresh adversary, confirm Move 4 was actually sent.

## Live-gate pre-flight
Before the **first** live external submission of any class, assert: no Open assumption is tagged as
blocking this gate; every value copied across contexts has an authority citation or a signed-off
risk-acceptance; Move 1 instrumentation is active on this call path.

## Definition of done
Root cause **authority-confirmed** (not merely self-consistent) · raw capture + inquiry/reply archived ·
`qa` regression fixture pinned to the *confirmed* value (never the prior assumption) · blocking
assumption Closed with its source reference · resource burn recorded · a new assumption class, if
revealed, logged as a guardrail.

## Anti-patterns
Quoting the masked SDK error as the symptom · "the chain is consistent, so it's correct" (consistency
to a wrong seed is still wrong) · blame-external as the default (accept it *last*, only after Move 3
fails to refute it) · "ask the authority" as a last resort · counting only failed fixes for stop-loss ·
letting the invested session self-correct.
