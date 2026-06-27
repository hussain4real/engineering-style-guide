#!/usr/bin/env bash
# Session-open routine. Prints orienting context at the start of every session.
# Parameterize REFERENCE_DIRS and PROJECT_MEMORY_PATH for your project.
set -u

echo "===================================================="
echo "  {{PROJECT_NAME}} — Session Open"
echo "===================================================="

# [1/6] Working tree + branch
echo "--- [1/6] Working tree + branch ---"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 && {
  echo "branch: $(git branch --show-current 2>/dev/null)"
  git status --short
} || echo "(not a git repo)"

# [2/6] Remote branch staleness (informational)
echo "--- [2/6] Recent remote branches ---"
git for-each-ref --sort=-committerdate --count=6 \
  --format='  %(refname:short)  %(committerdate:relative)' refs/remotes/origin 2>/dev/null || true

# [3/6] Dashboard regeneration
echo "--- [3/6] Dashboard ---"
if [ -f harness/scripts/build_dashboard.py ]; then
  python3 harness/scripts/build_dashboard.py 2>&1 | tail -3 || echo "  (dashboard generation skipped)"
fi

# [4/6] Memory index (optional)
echo "--- [4/6] Memory ---"
MEMORY_PATH="{{PROJECT_MEMORY_PATH}}"
if [ -n "$MEMORY_PATH" ] && [ -f "$MEMORY_PATH" ]; then
  head -8 "$MEMORY_PATH"
else
  echo "  (no memory file configured)"
fi

# [5/6] Open assumptions
echo "--- [5/6] Open assumptions ---"
if [ -f ASSUMPTIONS.md ]; then
  grep -iE 'open|triggered' ASSUMPTIONS.md || echo "  (none open)"
else
  echo "  (no ASSUMPTIONS.md)"
fi

# [6/6] Reference directory inventory
echo "--- [6/6] Reference directories ---"
REFERENCE_DIRS=({{REFERENCE_DIRS}})
for d in "${REFERENCE_DIRS[@]}"; do
  [ -d "$d" ] && echo "  $d: $(ls -1 "$d" 2>/dev/null | wc -l | tr -d ' ') items" || true
done

echo "===================================================="
