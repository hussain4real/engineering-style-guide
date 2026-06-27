# Playbook: version-bump

**Trigger:** a release / version increment. **A commit gate blocks the bump unless all sync files agree.**

## Steps
1. Decide the new SemVer from the change set (breaking → major, feature → minor, fix → patch).
2. Update every file in `{{VERSION_SYNC_FILES}}` in lockstep. `VERSION` is the source of truth.
3. Add a `CHANGELOG.md` entry: `## [X.Y.Z] - YYYY-MM-DD — <theme>` with Added/Changed/Fixed.
4. Run the gates locally; the `version-sync` gate confirms the files match.
5. `release` team (ops) builds + deploys; `{{PM_AGENT_NAME}}` records a RELEASE entry.

## Skip when
A doc-only typo or a partial commit inside an in-progress feature — bump when the whole increment is done.
