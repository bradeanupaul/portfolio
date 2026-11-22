#!/usr/bin/env node
/**
 * Resolve every local image path referenced under src/ + prisma seed,
 * reject missing/zero-byte/invalid files, report dimensions.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = path.join(root, "src");
const publicRoot = path.join(root, "public");

const PATH_RE = /["'`](\/images\/[^"'`\s]+\.(?:webp|png|jpe?g|svg|avif))["'`]/gi;
const refs = new Set();

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx?|jsx?|mjs|json|md|csv)$/.test(entry.name)) {
      const text = fs.readFileSync(full, "utf8");
      let m;
      while ((m = PATH_RE.exec(text))) refs.add(m[1]);
    }
  }
}

walk(srcRoot);
const seed = path.join(root, "prisma", "seed.ts");
if (fs.existsSync(seed)) {
  const text = fs.readFileSync(seed, "utf8");
  let m;
  while ((m = PATH_RE.exec(text))) refs.add(m[1]);
}

const rows = [];
let failures = 0;

for (const ref of [...refs].sort()) {
  const file = path.join(publicRoot, ref.replace(/^\//, ""));
  if (!fs.existsSync(file)) {
    rows.push({ ref, status: "MISSING" });
    failures++;
    continue;
  }
  const size = fs.statSync(file).size;
  if (size === 0) {
    rows.push({ ref, status: "ZERO_BYTE" });
    failures++;
    continue;
  }
  try {
    const meta = await sharp(file).metadata();
    rows.push({
      ref,
      status: "OK",
      bytes: size,
      width: meta.width,
      height: meta.height,
      format: meta.format,
    });
  } catch (err) {
    rows.push({ ref, status: "INVALID", error: String(err.message || err) });
    failures++;
  }
}

const outDir = path.join(root, "docs");
fs.mkdirSync(outDir, { recursive: true });
const reportPath = path.join(outDir, "V4-asset-integrity.json");
fs.writeFileSync(reportPath, JSON.stringify({ generatedAt: new Date().toISOString(), failures, rows }, null, 2));

console.log(`Checked ${rows.length} image refs · failures=${failures}`);
console.log(`Wrote ${reportPath}`);
if (failures > 0) process.exitCode = 1;
