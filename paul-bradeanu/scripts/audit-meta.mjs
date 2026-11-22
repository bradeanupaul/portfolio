#!/usr/bin/env node
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const required = [
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "public/favicon.svg",
  "public/images/paul/portrait.jpg",
  "src/data/projects.ts",
];

let failed = 0;

for (const file of required) {
  const path = join(root, file);
  if (!existsSync(path)) {
    console.error(`Missing: ${file}`);
    failed += 1;
  } else {
    console.log(`OK: ${file}`);
  }
}

const projectsDir = join(root, "public/projects");
for (const slug of readdirSync(projectsDir)) {
  const dir = join(projectsDir, slug);
  const files = readdirSync(dir);
  if (!files.some((f) => f.startsWith("hero"))) {
    console.error(`Missing hero asset for ${slug}`);
    failed += 1;
  } else {
    console.log(`OK: projects/${slug} has hero asset`);
  }
}

const projectsData = readFileSync(join(root, "src/data/projects.ts"), "utf8");
if (projectsData.includes("lighthouse: {") && projectsData.includes("performance: 98")) {
  console.error("Suspicious hardcoded lighthouse scores found in projects.ts");
  failed += 1;
}

process.exit(failed ? 1 : 0);
