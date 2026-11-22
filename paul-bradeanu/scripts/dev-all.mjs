#!/usr/bin/env node
/**
 * Development-only orchestrator: starts Paul portfolio + 5 sibling demos.
 * Does not modify sibling projects. Cleans up children on SIGINT/SIGTERM.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const portfolioRoot = resolve(__dirname, "..");
const parentRoot = resolve(portfolioRoot, "..");

const apps = [
  {
    name: "paul-bradeanu",
    cwd: portfolioRoot,
    port: 3000,
    // Avoid recursion: package.json `dev` points at this orchestrator.
    npmScript: "dev:site",
  },
  { name: "bellanotte", cwd: join(parentRoot, "bellanotte"), port: 3001, npmScript: "dev" },
  { name: "veltra", cwd: join(parentRoot, "veltra"), port: 3002, npmScript: "dev" },
  { name: "vantaink", cwd: join(parentRoot, "vantaink"), port: 3003, npmScript: "dev" },
  { name: "aureliaestates", cwd: join(parentRoot, "aureliaestates"), port: 3004, npmScript: "dev" },
  { name: "elanskin", cwd: join(parentRoot, "elanskin"), port: 3005, npmScript: "dev" },
];

const children = [];

function startApp(app) {
  if (!existsSync(app.cwd)) {
    console.error(`[skip] Missing directory: ${app.cwd}`);
    return;
  }
  if (!existsSync(join(app.cwd, "package.json"))) {
    console.error(`[skip] No package.json in ${app.cwd}`);
    return;
  }

  const child = spawn(
    "npm",
    ["run", app.npmScript, "--", "-p", String(app.port)],
    {
      cwd: app.cwd,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PORT: String(app.port) },
      shell: process.platform === "win32",
    },
  );

  children.push(child);
  console.log(`[start] ${app.name} → http://localhost:${app.port}`);

  child.stdout.on("data", (buf) => {
    process.stdout.write(`[${app.name}] ${buf}`);
  });
  child.stderr.on("data", (buf) => {
    process.stderr.write(`[${app.name}] ${buf}`);
  });
  child.on("exit", (code) => {
    console.log(`[exit] ${app.name} code=${code}`);
  });
}

function shutdown() {
  console.log("\nShutting down child processes...");
  for (const child of children) {
    try {
      child.kill("SIGTERM");
    } catch {
      // ignore
    }
  }
  setTimeout(() => process.exit(0), 400);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("Paul portfolio + sibling demos (development only)");
console.log("Ports: Paul 3000 · Bella 3001 · VELTRA 3002 · VANTA 3003 · Aurelia 3004 · ÉLAN 3005\n");

for (const app of apps) startApp(app);
