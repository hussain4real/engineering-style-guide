# gh-milaha

`gh-milaha` is the GitHub CLI extension for starting Milaha projects without asking developers to
configure npm registry credentials by hand.

## Install

```bash
gh auth login
gh auth refresh -h github.com -s read:packages
gh extension install Qatar-Navigation-Milaha/gh-milaha
```

## Use

```bash
gh milaha init my-service
```

The extension uses `gh auth token` to create a temporary npm config for the child process, runs the
private starter package with `npm exec`, and deletes the temporary config when it exits.

It does not write `~/.npmrc`, require `NODE_AUTH_TOKEN`, or require pnpm/Corepack to launch the
starter.

## Examples

```bash
gh milaha init port-ops-api
gh milaha init port-ops-api --backend fastapi
gh milaha init port-ops-platform --backend nestjs --frontend nextjs
gh milaha init agentic-service --workflow-runtime temporal
gh milaha init simple-api --agent-runtime none --no-harness
```
