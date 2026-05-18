#!/usr/bin/env bash
set -euo pipefail

required_node="22.20.0"
required_major="22"
required_minor="12"

node_is_supported() {
  node -e '
    const [major, minor] = process.versions.node.split(".").map(Number);
    process.exit(major > 22 || (major === 22 && minor >= 12) ? 0 : 1);
  ' >/dev/null 2>&1
}

if ! node_is_supported; then
  nvm_dir="${NVM_DIR:-$HOME/.nvm}"

  if [ -s "$nvm_dir/nvm.sh" ]; then
    # Load the project version from .nvmrc so VS Code tasks do not inherit an
    # older global Node that Storybook cannot run on.
    # shellcheck disable=SC1090
    . "$nvm_dir/nvm.sh"
    nvm use --silent >/dev/null
  fi
fi

if ! node_is_supported; then
  current_node="$(node -v 2>/dev/null || echo "not found")"
  cat >&2 <<EOF
This project needs Node.js >=${required_major}.${required_minor}.0.
Current Node.js: ${current_node}

Run:
  nvm install ${required_node}
  nvm use

Then retry the command.
EOF
  exit 1
fi

exec "$@"
