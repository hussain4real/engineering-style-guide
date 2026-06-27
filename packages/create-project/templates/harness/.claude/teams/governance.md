# Team: governance

**Lead:** security-officer · **Members:** architect, developer · **Trigger:** sprint close, a material change (model swap / new integration / new data class), an audit, or a scheduled drill.

## Flow
1. `security-officer` runs the Phase A–D checks (`harness/scripts/governance/`).
2. Gaps become `compliance/BACKLOG.md` items (P0–P3) with named owners.
3. `architect`/`developer` are dispatched by `{{PM_AGENT_NAME}}` to implement controls (separation of duties: the security-officer does not write the audited code).
4. `security-officer` updates `compliance/POSTURE.md` and the posture trend.

## Output
A refreshed posture (trend, not a one-time pass) + a prioritized control backlog.
