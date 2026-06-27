# Security posture

Maps each control to the **Milaha security baseline (IS-GL-014 / IS-ST-003 / IS-ST-004)** plus the
Milaha Secure Coding Checklist (by reference). Summarized by
`harness/scripts/governance/build_security_posture.py`. Status: Implemented / Partial / Not.

| Control area | Standard ref | Status | Evidence | Notes |
|---|---|---|---|---|
| Secret management | IS-ST-003 | Partial | gitleaks gate + `.env` block | example row |
| Authentication | IS-ST-003 | Not | — | example row |
| Logging & audit | IS-GL-014 | Implemented | append-only activity log | example row |
| AI governance | IS-GL-014 / IS-ST-004 | Partial | `harness/AI_INVENTORY.yaml` + semi-annual review | example row |
| Secure coding | Milaha Secure Coding Checklist | Partial | commit gate (referenced, not copied) | example row |

> Replace the example rows with your real controls. Track the weighted % over time as a **trend** —
> the point is movement, not a one-time pass. Reference standards by ID; never copy the checklist
> workbook into this repo (`scripts/check_internal.sh` guards this).
