#!/usr/bin/env node
/**
 * Capture desktop/mobile screenshots from sibling demo apps (ports 3001–3005).
 *
 * Output sizes (exact):
 *  - desktop: 1480 × 900
 *  - mobile:  900 × 1940  (viewport 450×970 @2x so Tailwind still uses mobile layout)
 */
import { chromium } from "playwright";
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const exportDir = join(root, "screenshots-for-mockups");

const targets = [
  { slug: "bella-notte", port: 3001 },
  { slug: "veltra", port: 3002 },
  { slug: "vanta-ink", port: 3003 },
  { slug: "aurelia-estates", port: 3004 },
  { slug: "elan-skin", port: 3005 },
];

const devices = [
  {
    name: "desktop",
    // Exact CSS viewport = output size
    width: 1480,
    height: 900,
    scale: 1,
    outW: 1480,
    outH: 900,
    file: "screen-desktop.png",
  },
  {
    name: "mobile",
    // Keep width < 768 so md: desktop styles don't kick in
    width: 450,
    height: 970,
    scale: 2,
    outW: 900,
    outH: 1940,
    file: "screen-mobile.png",
    isMobile: true,
  },
];

function ensureSize(path, w, h) {
  execFileSync("sips", ["-z", String(h), String(w), path], { stdio: "pipe" });
}

async function prepare(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    try {
      sessionStorage.setItem("bn-loader-shown", "1");
      sessionStorage.setItem("veltra-loader-seen", "1");
    } catch {
      /* ignore */
    }
    window.scrollTo(0, 0);
    for (const el of [...document.querySelectorAll("body *")]) {
      const s = getComputedStyle(el);
      if (s.position !== "fixed") continue;
      const z = parseInt(s.zIndex || "0", 10);
      if (z < 90) continue;
      const r = el.getBoundingClientRect();
      if (r.width >= innerWidth * 0.85 && r.height >= innerHeight * 0.85) {
        el.remove();
      }
    }
    for (const el of document.querySelectorAll("main *, body section *, [style]")) {
      const s = el.getAttribute("style") || "";
      if (/opacity|transform|filter|clip-path/i.test(s) || el.tagName === "IMG") {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
        el.style.setProperty("filter", "none", "important");
        el.style.setProperty("clip-path", "none", "important");
      }
    }
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    await Promise.all(
      [...document.images].map((img) =>
        img.complete && img.naturalWidth
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
              setTimeout(resolve, 5000);
            }),
      ),
    );
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    for (const el of document.querySelectorAll("main *, body section *")) {
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("filter", "none", "important");
    }
  });
  await page.waitForTimeout(400);
}

async function capture() {
  mkdirSync(exportDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const manifest = [];

  for (const target of targets) {
    const url = `http://127.0.0.1:${target.port}/`;
    const outDir = join(root, "public/projects", target.slug);
    mkdirSync(outDir, { recursive: true });

    for (const device of devices) {
      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        deviceScaleFactor: device.scale,
        colorScheme: "light",
        reducedMotion: "reduce",
        isMobile: Boolean(device.isMobile),
        hasTouch: Boolean(device.isMobile),
      });
      const page = await context.newPage();
      await page.addInitScript(() => {
        try {
          sessionStorage.setItem("bn-loader-shown", "1");
          sessionStorage.setItem("veltra-loader-seen", "1");
        } catch {
          /* ignore */
        }
      });
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
        await prepare(page);
        await page.addStyleTag({
          content:
            "*,*::before,*::after{caret-color:transparent!important}::-webkit-scrollbar{display:none!important}",
        });
        const dest = join(outDir, device.file);
        await page.screenshot({ path: dest, fullPage: false, type: "png" });
        ensureSize(dest, device.outW, device.outH);
        const exportName = `${target.slug}__${device.name}.png`;
        copyFileSync(dest, join(exportDir, exportName));
        manifest.push({
          project: target.slug,
          device: device.name,
          url,
          size: `${device.outW}x${device.outH}`,
          file: exportName,
        });
        console.log(`OK ${exportName} (${device.outW}x${device.outH})`);
      } catch (error) {
        console.error(`FAIL ${target.slug} ${device.name}:`, error.message);
      } finally {
        await context.close();
      }
    }
  }

  writeFileSync(
    join(exportDir, "README.txt"),
    [
      "Screenshot-uri actualizate pentru mockup-uri.",
      "Desktop: 1480×900  |  Mobil: 900×1940",
      "Surse: demo locale 3001–3005 (versiuni curente).",
      "",
      ...manifest.map((m) => `- ${m.file}  ←  ${m.url}  (${m.size})`),
      "",
    ].join("\n"),
  );
  writeFileSync(join(exportDir, "manifest.json"), JSON.stringify(manifest, null, 2));

  await browser.close();
  console.log(`\nGata. Pozele sunt în:\n  ${exportDir}\n`);
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
