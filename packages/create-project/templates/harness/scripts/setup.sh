#!/usr/bin/env bash
# Interactive template setup: fills {{TOKENS}}, picks a gate engine, trims the unused one.
# Re-runnable; only touches {{...}} markers and the gates/ dir. Uses perl for portable in-place edit.
set -u

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "== Agent Harness Template setup =="
echo "Fill each value (Enter to skip optional ones)."

ask() { # ask VAR "prompt" "default"
  local var="$1" prompt="$2" def="${3:-}"
  local val
  if [ -n "$def" ]; then printf "%s [%s]: " "$prompt" "$def"; else printf "%s: " "$prompt"; fi
  read -r val
  val="${val:-$def}"
  eval "$var=\$val"
}

ask PROJECT_NAME       "Project name"                 ""
ask PROJECT_SLUG       "Project slug (kebab-case)"    ""
ask PROJECT_ONE_LINER  "One-line description"         ""
ask PRIMARY_LANGUAGE   "Primary language"             "TypeScript"
ask GATE_ENGINE        "Gate engine (lefthook|pre-commit)" "lefthook"
ask DOMAIN_SME_ROLE    "Domain specialist role name"  "domain-sme"
ask DOMAIN_NOUN        "What the domain rules describe" "domain rules"
ask PM_AGENT_NAME      "Orchestrator agent name"      "pm"
ask REFERENCE_DIRS     "Reference dirs (space-sep, quoted)" '"docs/standards" "docs/adr"'
ask PROJECT_MEMORY_PATH "Memory file path (optional)" ""
ask VERSION_SYNC_FILES "Version-sync files (comma-sep)" "VERSION, package.json, CHANGELOG.md"
ask COMPLIANCE_STANDARD "Compliance standard (optional)" "OWASP ASVS"
ask ORG_OR_OWNER       "GitHub owner for the repo"    ""

subst() { # subst TOKEN VALUE
  local token="$1" value="$2"
  grep -rl --exclude-dir=.git --exclude-dir=node_modules --exclude="setup.sh" "{{$token}}" . 2>/dev/null \
    | while read -r f; do
        TOKEN="$token" VALUE="$value" perl -pi -e 's/\Q{{$ENV{TOKEN}}}\E/$ENV{VALUE}/g' "$f"
      done
}

for pair in \
  "PROJECT_NAME=$PROJECT_NAME" "PROJECT_SLUG=$PROJECT_SLUG" "PROJECT_ONE_LINER=$PROJECT_ONE_LINER" \
  "PRIMARY_LANGUAGE=$PRIMARY_LANGUAGE" "GATE_ENGINE=$GATE_ENGINE" "DOMAIN_SME_ROLE=$DOMAIN_SME_ROLE" \
  "DOMAIN_NOUN=$DOMAIN_NOUN" "PM_AGENT_NAME=$PM_AGENT_NAME" "REFERENCE_DIRS=$REFERENCE_DIRS" \
  "PROJECT_MEMORY_PATH=$PROJECT_MEMORY_PATH" "VERSION_SYNC_FILES=$VERSION_SYNC_FILES" \
  "COMPLIANCE_STANDARD=$COMPLIANCE_STANDARD" "ORG_OR_OWNER=$ORG_OR_OWNER"; do
  subst "${pair%%=*}" "${pair#*=}"
done

# Rename the domain-sme agent file to the chosen role.
if [ "$DOMAIN_SME_ROLE" != "domain-sme" ] && [ -f .claude/agents/domain-sme.md ]; then
  mv .claude/agents/domain-sme.md ".claude/agents/${DOMAIN_SME_ROLE}.md"
fi

# Install the chosen gate engine to the repo root and drop the other.
if [ "$GATE_ENGINE" = "pre-commit" ]; then
  cp gates/python/.pre-commit-config.yaml ./.pre-commit-config.yaml
  echo "Installed .pre-commit-config.yaml — run: pre-commit install"
else
  cp gates/typescript/lefthook.yml ./lefthook.yml
  echo "Installed lefthook.yml — run: lefthook install"
fi

echo "Done. Verify no tokens remain:"
echo "  grep -rn '{{' . --include='*.md' --include='*.yml' --include='*.yaml' --include='*.py' --include='*.sh' --include='*.json'"
