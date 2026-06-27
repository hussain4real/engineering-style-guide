# Playbook: worktree-isolation

**Trigger:** starting an isolated scope (a multi-PR sequence, or work that must not mix with another session).

## Why
Creating a sibling directory and `cd`-ing into it does **not** move your session — read commands can
silently target the main checkout. Use the mechanism that physically relocates the session.

## Steps
1. Use the editor's "enter worktree" mechanism (not `git worktree add` + `cd`).
2. **Verify** the status line / `pwd` shows the worktree directory and the new branch. If it still
   shows the main checkout, stop and diagnose.
3. One worktree per scope. Cross-scope work needs a second worktree or explicit approval.
4. On finish: keep (leave on disk) or remove (delete dir + branch only if merged/clean).

## Never
Run commands against the main checkout from inside a worktree session — confine with explicit paths
if you must read main-repo state.
