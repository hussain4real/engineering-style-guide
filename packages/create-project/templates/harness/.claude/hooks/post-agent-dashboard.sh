#!/usr/bin/env bash
# After an agent dispatch (PostToolUse: Task), refresh the dashboard so project health
# always reflects the latest state. Best-effort; never blocks.
set -u
if [ -f harness/scripts/build_dashboard.py ]; then
  python3 harness/scripts/build_dashboard.py >/dev/null 2>&1 || true
fi
exit 0
