import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("public/projects");
const VIEWPORT = { width: 1440, height: 900 };

async function settle(page) {
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    document.querySelectorAll(
      '[class*="cookie" i], [id*="cookie" i], [data-cookie], [aria-label*="cookie" i]',
    ).forEach((el) => {
      if (el instanceof HTMLElement) el.style.display = "none";
    });
    // Next.js / tooling badges
    document.querySelectorAll("nextjs-portal, [data-nextjs-toast]").forEach((el) => {
      if (el instanceof HTMLElement) el.style.display = "none";
    });
  }).catch(() => null);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
}

async function shot(page, slug, file) {
  const dir = path.join(ROOT, slug);
  await mkdir(dir, { recursive: true });
  await settle(page);
  const out = path.join(dir, file);
  await page.screenshot({ path: out, type: "png" });
  console.log("ok", slug, file, "←", page.url());
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 1,
});
const page = await context.newPage();

// --- VANTA portfolio (wait for gallery) ---
await page.goto("http://localhost:3003/portofoliu", { waitUntil: "domcontentloaded" });
await page.getByRole("heading", { name: /molie|linie|portofoliu/i }).first().waitFor({ timeout: 20000 });
await page.waitForTimeout(1200);
await shot(page, "vanta-ink", "highlight-portfolio.png");

// --- VELTRA admin via API session ---
await page.goto("http://localhost:3002/admin/login", { waitUntil: "networkidle" });
const login = await page.evaluate(async () => {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@veltra.demo",
      password: "VeltraDemo2026!",
    }),
  });
  return res.json();
});
console.log("veltra login", login);
await page.goto("http://localhost:3002/admin/rezervari", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await shot(page, "veltra", "highlight-admin.png");

// --- ÉLAN cart with product ---
await page.goto("http://localhost:3005/produs/glow-drops", { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Adaugă în coș/i }).first().click();
await page.waitForTimeout(700);
await page.goto("http://localhost:3005/cos", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await shot(page, "elan-skin", "highlight-cart.png");

// Favorites page as alternate if cart still empty - also capture checkout
await page.goto("http://localhost:3005/checkout", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await shot(page, "elan-skin", "highlight-checkout.png");

// --- Aurelia filters with correct district ---
await page.goto(
  "http://localhost:3004/proprietati?locatie=herastrau&camere=3&view=grid",
  { waitUntil: "networkidle" },
);
await page.waitForTimeout(1000);
await shot(page, "aurelia-estates", "highlight-filters.png");

await page.goto("http://localhost:3004/proprietati?view=map", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(2000);
await shot(page, "aurelia-estates", "highlight-map.png");

await browser.close();
