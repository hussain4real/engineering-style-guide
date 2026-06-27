#!/usr/bin/env python3
"""Phase D — evaluate secure-coding checklist evidence (skeleton, stdlib only).

Idea: a checklist of secure-coding items, each marked Yes / Partial / No / N/A with evidence.
This prints the coverage so you can track it as a trend (not a one-time pass). Point CHECKLIST at
your file; the skeleton tolerates absence.
"""
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
CHECKLIST = os.path.join(ROOT, "compliance", "secure-coding-checklist.md")


def main():
    if not os.path.exists(CHECKLIST):
        print("secure-coding: no checklist yet (compliance/secure-coding-checklist.md) — skipping")
        return 0
    counts = {"Yes": 0, "Partial": 0, "No": 0, "N/A": 0}
    with open(CHECKLIST, "r", encoding="utf-8") as f:
        for ln in f:
            for k in counts:
                if re.search(r"\b%s\b" % re.escape(k), ln):
                    counts[k] += 1
                    break
    scored = counts["Yes"] + counts["Partial"] + counts["No"]
    pct = (counts["Yes"] + 0.5 * counts["Partial"]) / scored * 100 if scored else 0.0
    print("secure-coding: Yes=%d Partial=%d No=%d N/A=%d (%.0f%% weighted)"
          % (counts["Yes"], counts["Partial"], counts["No"], counts["N/A"], pct))
    return 0


if __name__ == "__main__":
    sys.exit(main())
