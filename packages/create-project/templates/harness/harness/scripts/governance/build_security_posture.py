#!/usr/bin/env python3
"""Phase B — build a security posture snapshot from control status (skeleton, stdlib only).

Reads compliance/POSTURE.md (a simple table of controls + status) and prints a summary:
how many Implemented / Partial / Not. Replace the parser with your standard's control format.
"""
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
POSTURE = os.path.join(ROOT, "compliance", "POSTURE.md")

STATUSES = ("Implemented", "Partial", "Not")


def main():
    if not os.path.exists(POSTURE):
        print("posture: compliance/POSTURE.md not found (nothing to summarize)")
        return 0
    counts = {s: 0 for s in STATUSES}
    with open(POSTURE, "r", encoding="utf-8") as f:
        for ln in f:
            for s in STATUSES:
                if re.search(r"\b%s\b" % re.escape(s), ln):
                    counts[s] += 1
                    break
    total = sum(counts.values())
    pct = (counts["Implemented"] + 0.5 * counts["Partial"]) / total * 100 if total else 0.0
    print("posture: %d controls — Implemented=%d Partial=%d Not=%d (%.0f%% weighted)"
          % (total, counts["Implemented"], counts["Partial"], counts["Not"], pct))
    return 0


if __name__ == "__main__":
    sys.exit(main())
