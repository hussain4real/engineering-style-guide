#!/usr/bin/env bash
# Guard: block destructive `git reset --hard` during a session unless explicitly overridden.
# Wired as a PreToolUse(Bash) hook. Reads the proposed command from stdin (hook payload)
# or from $CLAUDE_TOOL_INPUT depending on harness; falls back to scanning argv.
set -u

payload="${CLAUDE_TOOL_INPUT:-}"
if [ -z "$payload" ] && [ ! -t 0 ]; then
  payload="$(cat 2>/dev/null || true)"
fi
payload="$payload $*"

if printf '%s' "$payload" | grep -qE 'git[[:space:]]+reset[[:space:]]+--hard'; then
  if [ "${RESET_OVERRIDE:-0}" = "1" ]; then
    echo "git reset --hard allowed (RESET_OVERRIDE=1)." >&2
    exit 0
  fi
  echo "BLOCKED: 'git reset --hard' is destructive. Set RESET_OVERRIDE=1 to allow." >&2
  exit 2
fi
exit 0
