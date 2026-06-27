# harness/ — PM plumbing

Everything here is *project management plumbing*, kept separate from product content. It is the
factory floor: the dashboard, the task list, the append-only journal, and the scripts that keep them
honest.

| Path | Role | Owner |
|---|---|---|
| `DASHBOARD.md` | Auto-generated health snapshot — **never hand-edit** | `{{PM_AGENT_NAME}}` |
| `TODOS.md` | P0–P3 living task list | `{{PM_AGENT_NAME}}` + all agents |
| `logs/activity-YYYY-Www.md` | Append-only weekly journal (7 event types) | each agent writes its types |
| `logs/README.md` | Activity-log format spec | `{{PM_AGENT_NAME}}` |
| `AI_INVENTORY.yaml` | Inventory of AI surfaces (schema-validated) | security-officer |
| `scripts/build_dashboard.py` | Stdlib-only dashboard generator | `{{PM_AGENT_NAME}}` |
| `scripts/governance/` | Phase A–D governance checks | security-officer |

## Dashboard

Always regenerate, never hand-edit:

```bash
python3 harness/scripts/build_dashboard.py
```

Re-run after any meaningful change (P0 added, plan status changed, version bump).

## Single-writer rule

Only one session writes PM artifacts at a time. The `pm-write-lock` hook enforces a 4-hour stale
timeout. Acquire before writing `TODOS.md`, `DASHBOARD.md`, or memory.
