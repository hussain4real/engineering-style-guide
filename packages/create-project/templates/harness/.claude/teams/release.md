# Team: release

**Lead:** ops · **Members:** developer, {{PM_AGENT_NAME}} (approval) · **Trigger:** a version bump / deployment.

## Flow
1. `developer` confirms the change set and updates `CHANGELOG.md`.
2. Follow the `version-bump` playbook — keep `{{VERSION_SYNC_FILES}}` in lockstep (a gate enforces it).
3. `ops` builds, deploys, verifies runtime + observability.
4. `{{PM_AGENT_NAME}}` approves and records a RELEASE activity-log entry.

## Output
A tagged, traceable release with a changelog entry and a green deploy.
