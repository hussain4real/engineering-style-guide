#!/usr/bin/env python3
"""Phase A — external source / standard drift detection (skeleton, stdlib only).

Idea: you absorb external standards/specs into the repo and record a hash. When the source changes,
this flags that your derived rules may be stale. Configure SOURCES below.
Exit 0 = no drift; exit 1 = drift found (set SOURCE_DRIFT_BYPASS=1 to override, document in commit).
"""
import os
import sys
import hashlib

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))

# Map: absorbed-copy path -> recorded sha256 (fill in for your project).
# Example shape only; empty by default so the skeleton passes.
SOURCES = {
    # "docs/standards/some-spec.md": "<sha256>",
}


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def main():
    if os.environ.get("SOURCE_DRIFT_BYPASS") == "1":
        print("source-drift: bypassed")
        return 0
    drifted = []
    for rel, expected in SOURCES.items():
        p = os.path.join(ROOT, rel)
        if not os.path.exists(p):
            drifted.append((rel, "missing"))
            continue
        actual = sha256(p)
        if actual != expected:
            drifted.append((rel, "changed"))
    if drifted:
        for rel, why in drifted:
            print("source-drift: %s (%s)" % (rel, why), file=sys.stderr)
        return 1
    print("source-drift: ok (%d sources)" % len(SOURCES))
    return 0


if __name__ == "__main__":
    sys.exit(main())
