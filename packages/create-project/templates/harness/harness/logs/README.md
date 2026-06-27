# Activity log — format spec

The activity log is the project's event journal. It is the institutional memory of *how* the project
moved, not just *what* the code is.

## Invariants
1. **Append-only.** Never overwrite a past entry. A correction is a new entry that references the old one.
2. **Newest-first.** New entries go at the top of the file.
3. **Weekly rollover.** One file per ISO week: `activity-YYYY-Www.md`. On rollover, append a
   `## Week summary` to the closing file.

## Seven event types
`SHIP` · `DEMO` · `INCIDENT` · `STAKEHOLDER` · `DECISION` · `MODULE` · `RELEASE`

## Entry format
```
### <TYPE> — <short title>  (YYYY-MM-DD HH:MM, <agent>)
- what: one line
- why: one line (for DECISION/INCIDENT)
- refs: PR/commit/plan links
```

Each agent appends the types it owns (e.g. developer → SHIP/MODULE, security-officer → INCIDENT,
PM → DECISION/STAKEHOLDER). The dashboard reads the latest entries.
