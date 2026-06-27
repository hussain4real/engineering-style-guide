#!/usr/bin/env bash
# Single PM-writer lock. Prevents two concurrent sessions from writing PM artifacts
# (harness/TODOS.md, harness/DASHBOARD.md, memory). Generic, project-agnostic.
# Usage: source or call before a PM write; pass a session id as $1.
set -u

LOCK_DIR=".harness/locks"
LOCK_FILE="$LOCK_DIR/pm-write.lock"
STALE_SECONDS=14400   # 4 hours
SESSION_ID="${1:-$$}"

mkdir -p "$LOCK_DIR"

now=$(date +%s)

if [ -f "$LOCK_FILE" ]; then
  owner=$(sed -n '1p' "$LOCK_FILE" 2>/dev/null)
  ts=$(sed -n '2p' "$LOCK_FILE" 2>/dev/null)
  ts=${ts:-0}
  age=$(( now - ts ))
  if [ "$owner" != "$SESSION_ID" ] && [ "$age" -lt "$STALE_SECONDS" ]; then
    echo "PM-write LOCKED by session $owner (${age}s ago). Another session holds the lock." >&2
    exit 1
  fi
  if [ "$age" -ge "$STALE_SECONDS" ]; then
    echo "PM-write lock is stale (${age}s) — taking over." >&2
  fi
fi

printf '%s\n%s\n' "$SESSION_ID" "$now" > "$LOCK_FILE"
echo "PM-write lock acquired by $SESSION_ID"
