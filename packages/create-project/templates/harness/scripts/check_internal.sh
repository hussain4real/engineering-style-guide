#!/usr/bin/env bash
# Internal confidentiality gate (Milaha edition).
# This is an INTERNAL repo: naming our standards (IS-GL-014, ...) and our projects
# (OceanMate, Taxera) is fine. What must NEVER land here: real secrets and real
# operational data (customers, vessels, financials). Run before every commit.
# Excludes itself and .git from the scan.
set -u

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

fail=0

# 1) Secret-shaped strings (lightweight; use gitleaks for the real scan).
SECRETS='(AKIA[0-9A-Z]{16})|(-----BEGIN [A-Z ]*PRIVATE KEY-----)|(xox[baprs]-[0-9A-Za-z-]+)|(ghp_[0-9A-Za-z]{30,})|(password\s*=\s*["'"'"']?[^"'"'"'[:space:]]{6,})'
hits=$(grep -rInE "$SECRETS" . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.venv \
        --exclude="check_internal.sh" --exclude=".env.example" 2>/dev/null || true)
if [ -n "$hits" ]; then echo "BLOCKED: secret-shaped content:" >&2; echo "$hits" >&2; fail=1; fi

# 2) Real operational data must not be committed to this methodology repo.
#    (Keep customer/vessel/financial data in the product repos, never here.)
#    Add your project's sentinel tokens to OPS_TOKENS if you want a hard block; left
#    generic by default so this template ships clean.
OPS_TOKENS='REAL_CUSTOMER_DATA_SENTINEL'
ops=$(grep -rInE "$OPS_TOKENS" . --exclude-dir=.git --exclude="check_internal.sh" 2>/dev/null || true)
if [ -n "$ops" ]; then echo "BLOCKED: real operational data sentinel:" >&2; echo "$ops" >&2; fail=1; fi

# 3) The Milaha Secure Coding Checklist must be referenced, not copied in full.
if grep -rIl "167" . --include="*.xlsx" >/dev/null 2>&1; then
  echo "BLOCKED: a checklist workbook appears to be committed — reference it, don't copy it." >&2; fail=1
fi

if [ "$fail" -ne 0 ]; then
  echo "" >&2
  echo "Internal gate FAILED. Remove the above before committing." >&2
  exit 1
fi
echo "internal gate: PASS (no secrets / no real operational data)"
exit 0
