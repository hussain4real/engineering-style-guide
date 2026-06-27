#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

assert_file_contains() {
  local file="$1"
  local expected="$2"

  if ! grep -Fq -- "${expected}" "${file}"; then
    echo "Expected ${file} to contain: ${expected}" >&2
    echo "--- ${file} ---" >&2
    cat "${file}" >&2
    exit 1
  fi
}

assert_command_succeeds() {
  local label="$1"
  shift

  if ! "$@"; then
    echo "Expected command to succeed: ${label}" >&2
    exit 1
  fi
}

with_fake_tools() {
  local temp_dir="$1"
  local token="${2:-gh-token}"
  local fake_bin="${temp_dir}/bin"

  mkdir -p "${fake_bin}"

  cat >"${fake_bin}/gh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
if [[ "\${1:-}" == "auth" && "\${2:-}" == "token" ]]; then
  printf '%s\n' "${token}"
  exit 0
fi
echo "unexpected gh invocation: \$*" >&2
exit 1
EOF

  cat >"${fake_bin}/npm" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
: "${GH_MILAHA_TEST_LOG:?GH_MILAHA_TEST_LOG is required}"
{
  printf 'argv:'
  for arg in "$@"; do
    printf ' <%s>' "$arg"
  done
  printf '\n'
  printf 'userconfig:%s\n' "${NPM_CONFIG_USERCONFIG:-}"
} >>"${GH_MILAHA_TEST_LOG}"

if [[ -n "${NPM_CONFIG_USERCONFIG:-}" && -f "${NPM_CONFIG_USERCONFIG}" ]]; then
  cp "${NPM_CONFIG_USERCONFIG}" "${GH_MILAHA_TEST_LOG}.npmrc"
fi
EOF

  chmod +x "${fake_bin}/gh" "${fake_bin}/npm"
  printf '%s' "${fake_bin}"
}

test_help_does_not_require_tools() {
  local temp_dir
  temp_dir="$(mktemp -d)"
  trap 'rm -rf "${temp_dir}"' RETURN

  assert_command_succeeds "help without gh/npm auth" "${BASH}" "${ROOT_DIR}/gh-milaha" --help
}

test_uses_gh_auth_token_and_temp_npmrc() {
  local temp_dir
  local fake_bin
  local log_file

  temp_dir="$(mktemp -d)"
  trap 'rm -rf "${temp_dir}"' RETURN
  log_file="${temp_dir}/npm.log"
  fake_bin="$(with_fake_tools "${temp_dir}" "from-gh")"

  GH_MILAHA_TEST_LOG="${log_file}" PATH="${fake_bin}:$PATH" \
    assert_command_succeeds "init through npm exec" \
    "${ROOT_DIR}/gh-milaha" init my-service --backend fastapi --no-harness

  assert_file_contains "${log_file}" "argv: <exec> <--yes> <--package=@qatar-navigation-milaha/create-project@latest> <--> <milaha> <init> <my-service> <--backend> <fastapi> <--no-harness>"
  assert_file_contains "${log_file}.npmrc" "@qatar-navigation-milaha:registry=https://npm.pkg.github.com"
  assert_file_contains "${log_file}.npmrc" "//npm.pkg.github.com/:_authToken=from-gh"
}

test_prefers_existing_node_auth_token() {
  local temp_dir
  local fake_bin
  local log_file

  temp_dir="$(mktemp -d)"
  trap 'rm -rf "${temp_dir}"' RETURN
  log_file="${temp_dir}/npm.log"
  fake_bin="$(with_fake_tools "${temp_dir}" "from-gh")"

  NODE_AUTH_TOKEN="from-env" GH_MILAHA_TEST_LOG="${log_file}" PATH="${fake_bin}:$PATH" \
    assert_command_succeeds "init with existing token" \
    "${ROOT_DIR}/gh-milaha" init env-service

  assert_file_contains "${log_file}.npmrc" "//npm.pkg.github.com/:_authToken=from-env"
}

test_reports_missing_auth() {
  local temp_dir
  local fake_bin
  local output

  temp_dir="$(mktemp -d)"
  trap 'rm -rf "${temp_dir}"' RETURN
  fake_bin="${temp_dir}/bin"
  mkdir -p "${fake_bin}"

  cat >"${fake_bin}/gh" <<'EOF'
#!/usr/bin/env bash
exit 1
EOF
  cat >"${fake_bin}/npm" <<'EOF'
#!/usr/bin/env bash
exit 0
EOF
  chmod +x "${fake_bin}/gh" "${fake_bin}/npm"

  set +e
  output="$(PATH="${fake_bin}:$PATH" "${ROOT_DIR}/gh-milaha" init missing-auth 2>&1)"
  status=$?
  set -e

  if [[ "${status}" -eq 0 ]]; then
    echo "Expected missing auth to fail." >&2
    exit 1
  fi

  if [[ "${output}" != *"gh auth login"* ]]; then
    echo "Expected missing auth output to mention gh auth login." >&2
    echo "${output}" >&2
    exit 1
  fi
}

test_help_does_not_require_tools
test_uses_gh_auth_token_and_temp_npmrc
test_prefers_existing_node_auth_token
test_reports_missing_auth

echo "gh-milaha tests passed."
