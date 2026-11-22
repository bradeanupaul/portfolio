#!/usr/bin/env node
/**
 * Builds sibling demo apps as static exports into public/<slug>/.
 * Run locally via `npm run build:demos` when demo sources change, then commit.
 * Vercel uses the committed exports (see package.json `build`).
 */
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const portfolioRoot = resolve(__dirname, "..");
const monorepoRoot = resolve(portfolioRoot, "..");
const publicRoot = join(portfolioRoot, "public");

const demos = [
  { dir: "bellanotte", slug: "bella-notte", stashApp: [] },
  { dir: "veltra", slug: "veltra", stashApp: ["admin"] },
  { dir: "vantaink", slug: "vanta-ink", stashApp: [] },
  { dir: "aureliaestates", slug: "aurelia-estates", stashApp: [] },
  { dir: "elanskin", slug: "elan-skin", stashApp: [], stubActions: true },
];

const stashAppNames = [
  "api",
  "sitemap.ts",
  "sitemap.xml",
  "robots.ts",
  "robots.txt",
  "opengraph-image.tsx",
  "opengraph-image.ts",
  "twitter-image.tsx",
  "twitter-image.ts",
  "icon.tsx",
  "apple-icon.tsx",
];

function run(command, args, cwd, env = {}) {
  console.log(`[demos] $ ${command} ${args.join(" ")}  (cwd=${cwd})`);
  const result = spawnSync(command, args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed in ${cwd} (exit ${result.status})`);
  }
}

function stashPath(from, label) {
  if (!existsSync(from)) return null;
  const parent = dirname(from);
  const to = join(parent, `__static_stash_${label.replace(/[./]/g, "_")}`);
  if (existsSync(to)) rmSync(to, { recursive: true, force: true });
  renameSync(from, to);
  return { from, to };
}

function stashBlocking(appDir, extraAppStash = []) {
  const appPath = join(appDir, "src", "app");
  const stashed = [];
  for (const name of [...stashAppNames, ...extraAppStash]) {
    const item = stashPath(join(appPath, name), name);
    if (item) stashed.push(item);
  }
  return stashed;
}

function restoreStash(stashed) {
  for (const { from, to } of stashed.reverse()) {
    if (existsSync(from)) rmSync(from, { recursive: true, force: true });
    if (existsSync(to)) renameSync(to, from);
  }
}

function ensureDeps(appDir) {
  const modules = join(appDir, "node_modules");
  const force = process.env.VERCEL === "1" || process.env.FORCE_DEMO_INSTALL === "1";
  if (!force && existsSync(modules)) return;
  console.log(`[demos] npm install in ${appDir}`);
  run("npm", ["install", "--no-audit", "--no-fund"], appDir);
}

function stripInstantExports(appDir) {
  const src = join(appDir, "src");
  const touched = [];

  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const st = statSync(full);
      if (st.isDirectory()) {
        if (name === "node_modules" || name.startsWith("__static_stash")) continue;
        walk(full);
        continue;
      }
      if (!/\.(tsx|ts|jsx|js)$/.test(name)) continue;
      const before = readFileSync(full, "utf8");
      const after = before.replace(
        /^export const instant\s*=\s*false\s*;?\s*$/gm,
        "/* static-export: instant removed */",
      );
      if (after !== before) {
        writeFileSync(full, after);
        touched.push({ file: full, before });
      }
    }
  }

  walk(src);
  return touched;
}

function restoreInstantExports(touched) {
  for (const { file, before } of touched) {
    writeFileSync(file, before);
  }
}

function stubElanActions(appDir) {
  const actionsDir = join(appDir, "src", "actions");
  const stashed = stashPath(actionsDir, "actions");
  if (!stashed) return null;

  mkdirSync(actionsDir, { recursive: true });
  const msg = "Demo static: formularul nu rulează pe exportul din portofoliu.";
  writeFileSync(
    join(actionsDir, "checkout.ts"),
    `export type CheckoutResult =\n  | { ok: true; code: string }\n  | { ok: false; message: string; fields?: Record<string, string> };\n\nexport async function placeOrder(_input: unknown): Promise<CheckoutResult> {\n  return { ok: false, message: ${JSON.stringify(msg)} };\n}\n`,
  );
  writeFileSync(
    join(actionsDir, "contact.ts"),
    `export type FormResult = { ok: true; message: string } | { ok: false; message: string };\n\nexport async function sendContact(_input: unknown): Promise<FormResult> {\n  return { ok: false, message: ${JSON.stringify(msg)} };\n}\nexport async function subscribeNewsletter(_input: unknown): Promise<FormResult> {\n  return { ok: false, message: ${JSON.stringify(msg)} };\n}\n`,
  );
  writeFileSync(
    join(actionsDir, "orders.ts"),
    `export type FoundOrder = {\n  code: string;\n  fullName: string;\n  city: string;\n  total: number;\n  payment: string;\n  createdAt: string;\n  items: { name: string; quantity: number; unitPrice: number }[];\n};\nexport type LookupResult = { ok: true; order: FoundOrder } | { ok: false; message: string };\n\nexport async function findOrder(_input: unknown): Promise<LookupResult> {\n  return { ok: false, message: ${JSON.stringify(msg)} };\n}\n`,
  );
  return stashed;
}

function assertExportSafe(appDir) {
  const appPath = join(appDir, "src", "app");
  for (const name of ["api", "robots.ts", "sitemap.ts", "opengraph-image.tsx"]) {
    if (existsSync(join(appPath, name))) {
      throw new Error(`[demos] expected ${name} to be stashed before export in ${appDir}`);
    }
  }
}

function buildDemo(demo) {
  const { dir, slug, stashApp = [], stubActions = false } = demo;
  const appDir = join(monorepoRoot, dir);
  if (!existsSync(join(appDir, "package.json"))) {
    console.warn(`[demos] skip missing ${dir}`);
    return;
  }

  console.log(`\n[demos] building ${dir} → /${slug}`);
  ensureDeps(appDir);

  const stashed = stashBlocking(appDir, stashApp);
  if (stubActions) {
    const actionStash = stubElanActions(appDir);
    if (actionStash) stashed.push(actionStash);
  }
  const instantTouched = stripInstantExports(appDir);
  assertExportSafe(appDir);

  const outDir = join(appDir, "out");
  const destDir = join(publicRoot, slug);

  try {
    rmSync(join(appDir, ".next"), { recursive: true, force: true });
    rmSync(outDir, { recursive: true, force: true });
    run("npx", ["next", "build"], appDir, {
      STATIC_EXPORT: "1",
      NEXT_PUBLIC_BASE_PATH: `/${slug}`,
      NEXT_PUBLIC_SITE_URL: `https://paulbradeanu.com/${slug}`,
      NODE_ENV: "production",
      // Avoid picking up a developer .env that breaks CI/export assumptions.
      DATABASE_URL: process.env.DATABASE_URL || "file:./prisma/dev.db",
    });

    if (!existsSync(outDir) || !statSync(outDir).isDirectory()) {
      throw new Error(`No out/ directory after static build for ${dir}`);
    }

    rmSync(destDir, { recursive: true, force: true });
    mkdirSync(publicRoot, { recursive: true });
    cpSync(outDir, destDir, { recursive: true });
    console.log(`[demos] copied to public/${slug}`);
  } finally {
    restoreInstantExports(instantTouched);
    restoreStash(stashed);
  }
}

function main() {
  if (process.env.SKIP_DEMO_STATIC === "1") {
    console.log("[demos] SKIP_DEMO_STATIC=1 — skipping");
    return;
  }

  const only = process.env.DEMO_ONLY?.trim();
  const selected = only
    ? demos.filter((d) => d.slug === only || d.dir === only)
    : demos;

  if (selected.length === 0) {
    throw new Error(`No demos matched DEMO_ONLY=${only}`);
  }

  for (const demo of selected) {
    buildDemo(demo);
  }
  console.log("\n[demos] all static demos ready under public/");
}

main();
