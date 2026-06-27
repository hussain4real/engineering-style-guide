#!/usr/bin/env python3
"""Phase B — verify every control area has a named owner (skeleton, stdlib only).

Reads compliance/OWNERS.yaml as plain lines (no YAML dependency): expects 'area: owner' pairs.
Fails if any owner is blank/TODO. Set OWNERS_BYPASS=1 to override (document in commit).
"""
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
OWNERS = os.path.join(ROOT, "compliance", "OWNERS.yaml")


def main():
    if os.environ.get("OWNERS_BYPASS") == "1":
        print("owners: bypassed")
        return 0
    if not os.path.exists(OWNERS):
        print("owners: compliance/OWNERS.yaml not found (skipping)")
        return 0
    missing = []
    with open(OWNERS, "r", encoding="utf-8") as f:
        for ln in f:
            s = ln.strip()
            if not s or s.startswith("#") or ":" not in s:
                continue
            area, owner = s.split(":", 1)
            owner = owner.strip().strip('"').strip("'")
            if not owner or owner.upper() in ("TODO", "TBD", "NULL", "NONE"):
                missing.append(area.strip())
    if missing:
        print("owners: missing owner for: %s" % ", ".join(missing), file=sys.stderr)
        return 1
    print("owners: all areas owned")
    return 0


if __name__ == "__main__":
    sys.exit(main())
