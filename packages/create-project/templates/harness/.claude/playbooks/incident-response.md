# Playbook: incident-response

**Trigger:** a P0/P1 production issue (outage, data loss, broken gate, auth failure).

## Steps
1. **Declare** — `{{PM_AGENT_NAME}}` opens an INCIDENT activity-log entry with time + severity.
2. **Stabilize** — `ops`/`developer` mitigate first (roll back, disable the surface). Restore service before root-causing.
3. **Root-cause** — `developer`/`qa` find the cause; reproduce it in a test (Iron Law: no fix without root cause).
4. **Fix + verify** — land the fix behind the gates; `qa` confirms the repro test now passes.
5. **Encode** — turn the failure into a permanent guardrail (a new gate, check, or rule) so it can't recur silently.
6. **Post-mortem** — short write-up: timeline, cause, fix, the guardrail added. Blameless.
