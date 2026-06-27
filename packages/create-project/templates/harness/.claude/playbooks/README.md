# Playbooks

Reusable multi-step workflows the `{{PM_AGENT_NAME}}` orchestrator runs on a trigger. Each playbook
is a checklist, not code — it sequences agent dispatch and sign-offs.

| Playbook | Trigger |
|---|---|
| `discovery-to-prd` | A new project / major capability with no PRD yet |
| `sprint-cycle` | Start/close of a work cycle |
| `version-bump` | A release / version increment |
| `incident-response` | A P0/P1 production issue |
| `security-incident` | A suspected breach / exposure / control failure |
| `worktree-isolation` | Starting an isolated multi-PR scope |
| `external-integration-diagnosis` | An external authority/service rejects with an opaque/masked error |
