import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("public/projects");
const VIEWPORT = { width: 1440, height: 900 };

/** @type {{ slug: string; file: string; url: string; prepare?: (page: import('playwright').Page) => Promise<void> }[]} */
const shots = [
  {
    slug: "bella-notte",
    file: "highlight-menu.png",
    url: "http://localhost:3001/meniu",
  },
  {
    slug: "bella-notte",
    file: "highlight-booking.png",
    url: "http://localhost:3001/rezervari",
  },
  {
    slug: "bella-notte",
    file: "highlight-gallery.png",
    url: "http://localhost:3001/galerie",
  },
  {
    slug: "veltra",
    file: "highlight-rooms.png",
    url: "http://localhost:3002/camere/mountain-view-suite",
  },
  {
    slug: "veltra",
    file: "highlight-booking.png",
    url: "http://localhost:3002/rezervari",
  },
  {
    slug: "veltra",
    file: "highlight-admin.png",
    url: "http://localhost:3002/admin/rezervari",
    prepare: async (page) => {
      await page.goto("http://localhost:3002/admin/login", {
        waitUntil: "networkidle",
      });
      await page.fill('input[type="email"], input[name="email"]', "admin@veltra.demo");
      await page.fill('input[type="password"], input[name="password"]', "VeltraDemo2026!");
      await Promise.all([
        page.waitForURL(/\/admin/, { timeout: 15000 }).catch(() => null),
        page.click('button[type="submit"]'),
      ]);
      await page.goto("http://localhost:3002/admin/rezervari", {
        waitUntil: "networkidle",
      });
    },
  },
  {
    slug: "vanta-ink",
    file: "highlight-portfolio.png",
    url: "http://localhost:3003/portofoliu",
  },
  {
    slug: "vanta-ink",
    file: "highlight-artist.png",
    url: "http://localhost:3003/artisti/alex-muresan",
  },
  {
    slug: "vanta-ink",
    file: "highlight-booking.png",
    url: "http://localhost:3003/programare",
  },
  {
    slug: "aurelia-estates",
    file: "highlight-catalog.png",
    url: "http://localhost:3004/proprietati",
  },
  {
    slug: "aurelia-estates",
    file: "highlight-filters.png",
    url: "http://localhost:3004/proprietati?locatie=Herastrau&camere=3&view=grid",
  },
  {
    slug: "aurelia-estates",
    file: "highlight-map.png",
    url: "http://localhost:3004/proprietati?view=map",
  },
  {
    slug: "elan-skin",
    file: "highlight-shop.png",
    url: "http://localhost:3005/magazin",
  },
  {
    slug: "elan-skin",
    file: "highlight-cart.png",
    url: "http://localhost:3005/cos",
    prepare: async (page) => {
      await page.goto("http://localhost:3005/produs/glow-drops", {
        waitUntil: "networkidle",
      });
      const add = page
        .getByRole("button", { name: /adaug|coș|cos|wishlist|favorite/i })
        .first();
      if (await add.count()) {
        await add.click().catch(() => null);
        await page.waitForTimeout(400);
      }
      const wish = page.getByRole("button", { name: /favorite|wishlist/i }).first();
      if (await wish.count()) {
        await wish.click().catch(() => null);
        await page.waitForTimeout(300);
      }
      await page.goto("http://localhost:3005/cos", { waitUntil: "networkidle" });
    },
  },
  {
    slug: "elan-skin",
    file: "highlight-checkout.png",
    url: "http://localhost:3005/rutina-mea",
  },
];

async function dismissNoise(page) {
  await page.evaluate(() => {
    const selectors = [
      '[data-cookie]',
      '[class*="cookie"]',
      '[id*="cookie"]',
      '[aria-label*="cookie" i]',
    ];
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        if (el instanceof HTMLElement) el.style.display = "none";
      });
    }
  }).catch(() => null);
}

async function capture(page, shot) {
  const dir = path.join(ROOT, shot.slug);
  await mkdir(dir, { recursive: true });
  const out = path.join(dir, shot.file);

  if (shot.prepare) {
    await shot.prepare(page);
  } else {
    await page.goto(shot.url, { waitUntil: "networkidle", timeout: 60000 });
  }

  await page.waitForTimeout(900);
  await dismissNoise(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.screenshot({ path: out, type: "png" });
  console.log("ok", shot.slug, shot.file, "←", page.url());
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 1,
});
const page = await context.newPage();

for (const shot of shots) {
  try {
    await capture(page, shot);
  } catch (error) {
    console.error("FAIL", shot.slug, shot.file, error.message);
  }
}

await browser.close();
