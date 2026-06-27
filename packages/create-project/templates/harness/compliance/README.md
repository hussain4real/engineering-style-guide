# compliance/ — governance scaffolding (Milaha baseline)

The Phase A–D governance pattern, pre-aligned to the **Milaha security standards**. **Do not enable
all of this on day one.** Add a phase when a real need appears (a security review, an audit, an AI
surface going to production).

```
Phase A  external sources & standards   -> harness/scripts/governance/check_source_drift.py
Phase B  control mapping & ownership     -> build_security_posture.py + check_owners_coverage.py
Phase C  AI system inventory             -> validate_ai_inventory.py + harness/AI_INVENTORY.yaml  (IS-GL-014 / IS-ST-004)
Phase D  secure-coding evidence          -> secure_coding_eval.py                                  (Milaha Secure Coding Checklist, by reference)
```

The control-mapping pattern: **standard → your control → evidence → status → trend.** Controls map to
**IS-GL-014 / IS-ST-003 / IS-ST-004** in `POSTURE.md`. Track posture as a trend over time.

## Files
- `POSTURE.md` — control status table mapped to the Milaha standards.
- `BACKLOG.md` — prioritized control improvements (P0–P3).
- `OWNERS.yaml` — who owns each control area.

> Reference standards by ID. Do not copy the Secure Coding Checklist workbook or any real
> customer / vessel / financial data into this methodology repo.
