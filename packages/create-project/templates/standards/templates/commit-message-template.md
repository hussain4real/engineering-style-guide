# Commit Message Guide

Use concise, imperative commit messages that describe one coherent change.

## Format

```text
<verb> <scope or outcome>
```

## Good Examples

```text
Add phased implementation template
Fix Tooltip story placement
Document FastAPI validation baseline
Harden package publish workflow
```

## Avoid

```text
fix
changes
updates
wip
misc
```

## Rules

- Start with an imperative verb, such as `Add`, `Fix`, `Update`, `Remove`, `Refactor`, `Document`, or `Harden`.
- Keep the subject under 72 characters when practical.
- Mention the affected area when it helps, such as `auth`, `api`, `storybook`, `templates`, or `release`.
- Use the body for context only when the subject is not enough.
- Do not include secrets, tokens, passwords, or private customer data.

## Optional Body

```text
Explain why the change was needed, important tradeoffs, or follow-up work.
Reference tickets, incidents, ADRs, or release notes when useful.
```
