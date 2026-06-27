#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repo = "Qatar-Navigation-Milaha/agent-harness";
const branch = process.argv[2] ?? "main";
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const targetDir = path.join(packageRoot, "templates", "harness");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "milaha-harness-"));
const archivePath = path.join(tempRoot, "harness.tar.gz");
const extractDir = path.join(tempRoot, "extract");

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    stdio: options.stdio ?? "pipe",
    encoding: options.encoding ?? "utf8"
  });
}

const commit = run("gh", ["api", `repos/${repo}/commits/${branch}`, "--jq", ".sha"]).trim();
const archive = run("gh", [`api`, `repos/${repo}/tarball/${commit}`], { encoding: "buffer" });

fs.writeFileSync(archivePath, archive);
fs.mkdirSync(extractDir, { recursive: true });
run("tar", ["-xzf", archivePath, "-C", extractDir], { stdio: "inherit" });

const [sourceName] = fs.readdirSync(extractDir);
if (!sourceName) {
  throw new Error("Harness archive did not contain a source directory.");
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.cpSync(path.join(extractDir, sourceName), targetDir, { recursive: true });
fs.writeFileSync(
  path.join(targetDir, ".milaha-harness-source.json"),
  `${JSON.stringify(
    {
      source: repo,
      url: `https://github.com/${repo}`,
      branch,
      commit,
      syncedAt: new Date().toISOString().slice(0, 10)
    },
    null,
    2
  )}\n`
);

console.log(`Synced ${repo}@${commit} into ${path.relative(process.cwd(), targetDir)}`);
