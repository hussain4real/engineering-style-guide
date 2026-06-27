# Playbook: security-incident

**Trigger:** suspected breach, secret/data exposure, or a control failure. **Lead:** security-officer.

## Steps
1. **Contain** — revoke/rotate exposed credentials immediately; disable the affected surface (kill-switch if AI-related).
2. **Assess** — `security-officer` scopes blast radius: what data, which systems, what window.
3. **Eradicate + recover** — `{{PM_AGENT_NAME}}` dispatches `developer`/`ops` to remediate (separation of duties: security-officer directs, does not write the fix).
4. **Notify** — follow the disclosure obligations for your data classes/jurisdiction.
5. **Evidence** — record the incident in `compliance/` and update `harness/AI_INVENTORY.yaml` if an AI surface was involved.
6. **Harden** — add the control/gate that prevents recurrence; re-run Phase A–D.
