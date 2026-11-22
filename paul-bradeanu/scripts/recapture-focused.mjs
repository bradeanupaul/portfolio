import { chromium } from "playwright";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const ROOT = path.resolve("public/projects");

/** @type {{ out: string; url: string; prepare?: (page: import('playwright').Page) => Promise<void>; selector?: string }[]} */
const shots = [
  {
    out: "bella-notte/highlight-menu.png",
    url: "http://localhost:3001/meniu",
    prepare: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 520));
      await page.waitForTimeout(500);
    },
  },
  {
    out: "bella-notte/highlight-booking.png",
    url: "http://localhost:3001/rezervari",
    prepare: async (page) => {
      const form = page.locator("form, [class*='rezerv'], main").first();
      await form.scrollIntoViewIfNeeded().catch(() => null);
      await page.evaluate(() => window.scrollTo(0, 180));
      await page.waitForTimeout(400);
    },
  },
  {
    out: "bella-notte/highlight-gallery.png",
    url: "http://localhost:3001/galerie",
    prepare: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 420));
      await page.waitForTimeout(600);
    },
  },
  {
    out: "veltra/highlight-rooms.png",
    url: "http://localhost:3002/camere/mountain-view-suite",
    prepare: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(800);
    },
  },
  {
    out: "veltra/highlight-booking.png",
    url: "http://localhost:3002/rezervari",
    prepare: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 200));
      await page.waitForTimeout(500);
    },
  },
  {
    out: "veltra/highlight-admin.png",
    url: "http://localhost:3002/admin/rezervari",
    prepare: async (page) => {
      await page.goto("http://localhost:3002/admin/login", {
        waitUntil: "networkidle",
      });
      await page.evaluate(async () => {
        await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "admin@veltra.demo",
            password: "VeltraDemo2026!",
          }),
        });
      });
      await page.goto("http://localhost:3002/admin/rezervari", {
        waitUntil: "networkidle",
      });
      await page.waitForTimeout(500);
    },
  },
  {
    out: "vanta-ink/highlight-portfolio.png",
    url: "http://localhost:3003/portofoliu",
    prepare: async (page) => {
      await page.getByText("17 / 17").first().waitFor({ timeout: 15000 }).catch(() => null);
      await page.evaluate(() => window.scrollTo(0, 360));
      await page.waitForTimeout(900);
    },
  },
  {
    out: "vanta-ink/highlight-artist.png",
    url: "http://localhost:3003/artisti/alex-muresan",
    prepare: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(600);
    },
  },
  {
    out: "vanta-ink/highlight-booking.png",
    url: "http://localhost:3003/programare",
    prepare: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 280));
      await page.waitForTimeout(500);
    },
  },
  {
    out: "aurelia-estates/highlight-catalog.png",
    url: "http://localhost:3004/proprietati",
    prepare: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 340));
      await page.waitForTimeout(700);
    },
  },
  {
    out: "aurelia-estates/highlight-filters.png",
    url: "http://localhost:3004/proprietati?locatie=herastrau&camere=3&view=grid",
    prepare: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 220));
      await page.waitForTimeout(700);
    },
  },
  {
    out: "aurelia-estates/highlight-map.png",
    url: "http://localhost:3004/proprietati?view=map",
    prepare: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 280));
      await page.waitForTimeout(1500);
    },
  },
  {
    out: "elan-skin/highlight-shop.png",
    url: "http://localhost:3005/magazin",
    prepare: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 180));
      await page.waitForTimeout(700);
    },
  },
  {
    out: "elan-skin/highlight-cart.png",
    url: "http://localhost:3005/cos",
    prepare: async (page) => {
      await page.goto("http://localhost:3005/produs/glow-drops", {
        waitUntil: "networkidle",
      });
      await page.getByRole("button", { name: /Adaugă în coș/i }).first().click();
      await page.waitForTimeout(500);
      await page.goto("http://localhost:3005/cos", { waitUntil: "networkidle" });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
    },
  },
  {
    out: "elan-skin/highlight-checkout.png",
    url: "http://localhost:3005/checkout",
    prepare: async (page) => {
      await page.goto("http://localhost:3005/produs/glow-drops", {
        waitUntil: "networkidle",
      });
      await page.getByRole("button", { name: /Adaugă în coș/i }).first().click();
      await page.waitForTimeout(400);
      await page.goto("http://localhost:3005/checkout", {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
    },
  },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
  colorScheme: "dark",
});
const page = await context.newPage();

await page.addInitScript(() => {
  try {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query) => ({
        matches: String(query).includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
      }),
    });
  } catch {
    /* ignore */
  }
});

for (const shot of shots) {
  try {
    if (!shot.prepare || !String(shot.prepare).includes("goto")) {
      await page.goto(shot.url, { waitUntil: "load", timeout: 90000 });
    }
    if (shot.prepare) await shot.prepare(page);
    await page.addStyleTag({
      content: `
        *,*::before,*::after{animation:none!important;transition:none!important}
        [style*="opacity: 0"]{opacity:1!important;visibility:visible!important;transform:none!important}
        nextjs-portal,[data-nextjs-toast],[class*="cookie" i]{display:none!important}
      `,
    });
    await page.waitForTimeout(350);
    const out = path.join(ROOT, shot.out);
    await mkdir(path.dirname(out), { recursive: true });
    await page.screenshot({ path: out, type: "png" });
    console.log("ok", shot.out);
  } catch (error) {
    console.error("FAIL", shot.out, error.message);
  }
}

await browser.close();
