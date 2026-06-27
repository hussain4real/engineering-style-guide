# harness/scripts

Stdlib-only Python (no `pip install` for the harness). Each script is safe to run anytime and
tolerant of missing files.

| Script | Purpose |
|---|---|
| `build_dashboard.py` | Regenerate `harness/DASHBOARD.md` from VERSION / CHANGELOG / TODOS / activity log |
| `governance/check_source_drift.py` | **Phase A** — detect drift in external source/standard docs |
| `governance/build_security_posture.py` | **Phase B** — aggregate control status into a posture |
| `governance/check_owners_coverage.py` | **Phase B** — verify every control area has an owner |
| `governance/validate_ai_inventory.py` | **Phase C** — validate `harness/AI_INVENTORY.yaml` structure |
| `governance/secure_coding_eval.py` | **Phase D** — evaluate secure-coding checklist evidence |

## Adding a gate
1. Write a stdlib-only script here that exits non-zero on failure and prints a one-line reason.
2. Wire it into your gate engine (`gates/typescript/lefthook.yml` or `gates/python/.pre-commit-config.yaml`).
3. Give it a `<NAME>_BYPASS=1` escape hatch and require documenting any bypass in the commit message.

The governance scripts are **skeletons**: they implement the *shape* of each phase and pass by
default. Replace the `TODO` bodies with checks specific to your project's standards.
