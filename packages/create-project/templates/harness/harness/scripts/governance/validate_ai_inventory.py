#!/usr/bin/env python3
"""Phase C — validate harness/AI_INVENTORY.yaml structure (skeleton, stdlib only).

No YAML library: does a lightweight line-based check that each declared surface carries the
required keys. Replace with a full parser if you add PyYAML to your project (not the harness).
Set AI_INVENTORY_BYPASS=1 to override (document in commit).
"""
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
INV = os.path.join(ROOT, "harness", "AI_INVENTORY.yaml")

REQUIRED = ("status", "use_case", "business_owner", "risk_tier", "data_scope",
            "kill_switch_ref", "next_review_due")


def main():
    if os.environ.get("AI_INVENTORY_BYPASS") == "1":
        print("ai-inventory: bypassed")
        return 0
    if not os.path.exists(INV):
        print("ai-inventory: harness/AI_INVENTORY.yaml not found (skipping)")
        return 0
    with open(INV, "r", encoding="utf-8") as f:
        text = f.read()
    # Split into surface blocks on '- id:' markers.
    blocks = []
    cur = []
    for ln in text.splitlines():
        if ln.lstrip().startswith("- id:"):
            if cur:
                blocks.append("\n".join(cur))
            cur = [ln]
        elif cur:
            cur.append(ln)
    if cur:
        blocks.append("\n".join(cur))

    problems = []
    for b in blocks:
        sid = b.split("- id:", 1)[1].splitlines()[0].strip().strip('"').strip("'")
        for key in REQUIRED:
            if (key + ":") not in b:
                problems.append("%s missing '%s'" % (sid, key))
    if problems:
        for p in problems:
            print("ai-inventory: " + p, file=sys.stderr)
        return 1
    print("ai-inventory: %d surface(s) valid" % len(blocks))
    return 0


if __name__ == "__main__":
    sys.exit(main())
