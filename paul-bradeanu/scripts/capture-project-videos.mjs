#!/usr/bin/env node
/**
 * Record homepage videos (load + continuous scroll) for each demo.
 *
 * Usage:
 *   node scripts/capture-project-videos.mjs
 *   node scripts/capture-project-videos.mjs --only=veltra --device=desktop
 *
 * - 60fps capture (Chromium)
 * - Wait for branded intro / hero ready (do NOT strip loaders early)
 * - Keep scroll reveals + pin ScrollTriggers; Lenis kept (instant scroll)
 */
import { chromium } from "playwright";
import {
  mkdirSync,
  copyFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  unlinkSync,
  statSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const exportDir = join(root, "screenshots-for-mockups", "videos");
const desktopExport = join(
  process.env.HOME || "",
  "Desktop",
  "screenshots-proiecte",
  "videos",
);

const args = process.argv.slice(2);
const onlySlug = args.find((a) => a.startsWith("--only="))?.slice(7) || null;
const onlyDevice =
  args.find((a) => a.startsWith("--device="))?.slice(9) || null;
const portOverride = args.find((a) => a.startsWith("--port="))?.slice(7);

const targets = [
  { slug: "bella-notte", port: 3001 },
  { slug: "veltra", port: 3002 },
  { slug: "vanta-ink", port: 3003 },
  { slug: "aurelia-estates", port: 3004 },
  { slug: "elan-skin", port: 3005 },
]
  .filter((t) => !onlySlug || t.slug === onlySlug)
  .map((t) => (portOverride ? { ...t, port: Number(portOverride) } : t));

const devices = [
  {
    name: "desktop",
    width: 1480,
    height: 900,
    scale: 1,
    outW: 1480,
    outH: 900,
    isMobile: false,
  },
  {
    name: "mobile",
    width: 450,
    height: 970,
    scale: 1,
    outW: 900,
    outH: 1940,
    isMobile: true,
  },
].filter((d) => !onlyDevice || d.name === onlyDevice);

const VIDEO_FPS = 60;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Wait until branded intro finishes and hero text is visible. */
async function waitForIntroReady(page, { maxMs = 4500 } = {}) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    const state = await page.evaluate(() => {
      const blockers = [...document.querySelectorAll("body *")].filter((el) => {
        if (!(el instanceof HTMLElement)) return false;
        const s = getComputedStyle(el);
        if (s.position !== "fixed" && s.position !== "absolute") return false;
        if (s.visibility === "hidden" || s.display === "none") return false;
        if (parseFloat(s.opacity || "1") < 0.05) return false;
        const z = parseInt(s.zIndex || "0", 10);
        if (z < 80) return false;
        const r = el.getBoundingClientRect();
        if (r.width < innerWidth * 0.9 || r.height < innerHeight * 0.9) return false;
        if (el.querySelector("main, header, nav")) return false;
        return true;
      });
      const h1 = document.querySelector("h1");
      let heroOk = false;
      if (h1) {
        let n = h1;
        heroOk = true;
        while (n && n !== document.body) {
          const s = getComputedStyle(n);
          if (parseFloat(s.opacity || "1") < 0.15) {
            heroOk = false;
            break;
          }
          n = n.parentElement;
        }
      }
      return { blockers: blockers.length, heroOk };
    });
    if (state.blockers === 0 && state.heroOk) return;
    await sleep(120);
  }
}

async function prepareForCapture(page) {
  await page.addStyleTag({
    content: `
      html, body { scroll-behavior: auto !important; }
      img { image-rendering: auto; }
    `,
  }).catch(() => {});

  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";

    // Keep Lenis alive (Veltra pin + ST bridge). Make it instant for capture.
    const lenis = window.__lenis || window.lenis || null;
    try {
      if (lenis) {
        if (typeof lenis.options === "object") {
          lenis.options.lerp = 1;
          lenis.options.duration = 0;
          lenis.options.smoothWheel = false;
        }
        lenis.start?.();
      }
    } catch {
      /* ignore */
    }

    // Kill ONLY non-pin scrub parallax (gallery rails). KEEP pin ScrollTriggers
    // (Veltra floor explorer scroll-lock needs them).
    try {
      const ST = window.ScrollTrigger || globalThis.ScrollTrigger;
      if (ST?.getAll) {
        ST.getAll().forEach((t) => {
          try {
            if (t.pin) return;
            const el = t.trigger;
            if (el?.closest?.(".floor-explorer-pin-host, .floor-explorer-section")) return;
            // Only kill scrub parallax without pin
            if (t.vars?.scrub || t.animation) {
              const isPinHost = el?.classList?.contains?.("floor-explorer-pin-host");
              if (!isPinHost && !t.pin) t.kill(false);
            }
          } catch {
            /* ignore */
          }
        });
      }
      ST?.refresh?.();
    } catch {
      /* ignore */
    }

    // Eager-load lazy images so they don't pop in mid-scroll blank
    document.querySelectorAll("img[loading='lazy']").forEach((img) => {
      img.loading = "eager";
      const src = img.currentSrc || img.src;
      if (src) img.src = src;
    });

    await Promise.all(
      [...document.images].map(
        (img) =>
          img.complete ||
          new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
            window.setTimeout(resolve, 2500);
          }),
      ),
    );

    document.documentElement.classList.add("capture-scroll");
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  });
}

async function getScrollMax(page) {
  return page.evaluate(() =>
    Math.max(
      0,
      Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      ) - window.innerHeight,
    ),
  );
}

async function setScrollY(page, y) {
  await page.evaluate((target) => {
    const y = Math.max(0, Math.round(target));
    const lenis = window.__lenis || window.lenis || null;
    try {
      if (lenis?.scrollTo) {
        lenis.scrollTo(y, { immediate: true, force: true });
      } else {
        document.documentElement.scrollTop = y;
        document.body.scrollTop = y;
        window.scrollTo(0, y);
      }
    } catch {
      document.documentElement.scrollTop = y;
      document.body.scrollTop = y;
      window.scrollTo(0, y);
    }
    // Ensure observers / GSAP see the scroll
    try {
      window.dispatchEvent(new Event("scroll"));
      (window.ScrollTrigger || globalThis.ScrollTrigger)?.update?.();
    } catch {
      /* ignore */
    }
  }, y);
}

/**
 * Safety for reveals that miss IntersectionObserver during programmatic scroll.
 * Curtain image reveals (clip-path inset 100%) stay invisible at opacity 1 — must unclip.
 */
async function nudgeReveals(page) {
  await page.evaluate(() => {
    const vh = window.innerHeight || 800;

    const inView = (r, pad = 0.08) =>
      r.bottom > vh * pad && r.top < vh * (1 - pad) && r.width > 8 && r.height > 8;

    document.querySelectorAll(".scroll-reveal:not(.scroll-reveal-visible)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (inView(r, 0.02)) el.classList.add("scroll-reveal-visible");
    });

    const forceShow = (el) => {
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("filter", "none", "important");
      el.style.setProperty("clip-path", "none", "important");
      el.classList?.add?.("scroll-reveal-visible");
    };

    const clipClosed = (clip) => {
      if (!clip || clip === "none") return false;
      // Motion curtain: inset(0 100% 0 0) / inset(0 0 0 100%) / large inset masks
      if (/inset\(\s*0(?:px|%)?\s+100%/.test(clip)) return true;
      if (/inset\(\s*0(?:px|%)?\s+0(?:px|%)?\s+0(?:px|%)?\s+100%/.test(clip)) return true;
      if (/inset\(\s*\d{2,}%/.test(clip)) return true;
      if (clip.includes("110%") || clip.includes("100% 0 0")) return true;
      return false;
    };

    // Motion curtain / mask nodes (Veltra RevealImage etc.)
    for (const el of document.querySelectorAll("[data-motion-reveal]")) {
      if (!(el instanceof HTMLElement)) continue;
      const r = el.getBoundingClientRect();
      if (!inView(r, 0.05)) continue;
      const cs = getComputedStyle(el);
      const op = parseFloat(cs.opacity);
      const hasMedia = Boolean(el.querySelector("img, video, picture, canvas"));
      if (clipClosed(cs.clipPath) || op < 0.12 || (hasMedia && clipClosed(cs.clipPath))) {
        forceShow(el);
      }
    }

    // Any in-view media whose ancestors still hide it
    for (const img of document.querySelectorAll("main img, main video, main canvas")) {
      if (!(img instanceof HTMLElement)) continue;
      const r = img.getBoundingClientRect();
      if (!inView(r, 0.04)) continue;
      if (img instanceof HTMLImageElement && (!img.complete || img.naturalWidth === 0)) {
        const src = img.currentSrc || img.src;
        if (src) img.src = src;
      }
      let n = img;
      while (n && n !== document.body) {
        if (!(n instanceof HTMLElement)) break;
        const cs = getComputedStyle(n);
        if (parseFloat(cs.opacity) < 0.12 || clipClosed(cs.clipPath)) forceShow(n);
        n = n.parentElement;
      }
    }

    // Generic opacity-0 leftovers in the central band
    for (const el of document.querySelectorAll("main *, footer *")) {
      if (!(el instanceof HTMLElement)) continue;
      const r = el.getBoundingClientRect();
      if (r.height < 12 || r.width < 12) continue;
      if (r.top < vh * 0.1 || r.bottom > vh * 0.9) continue;
      if (parseFloat(getComputedStyle(el).opacity) < 0.08) forceShow(el);
    }
  });
}

/** Wait for Aurelia leaflet tiles once the map section is near view. */
async function maybeWaitForMap(page) {
  const near = await page.evaluate(() => {
    const loading = [...document.querySelectorAll("body *")].some(
      (el) => /Se deschide harta/i.test(el.textContent || "") && el.getBoundingClientRect().top < innerHeight * 1.4,
    );
    const box = document.querySelector(".leaflet-container");
    if (!box && !loading) return false;
    const el = box || document.body;
    const r = (box || [...document.querySelectorAll("p,div")].find((n) => /Se deschide harta/i.test(n.textContent || "")))?.getBoundingClientRect?.();
    if (!r) return loading;
    return r.top < innerHeight * 1.35 && r.bottom > -100;
  });
  if (!near) return;

  const deadline = Date.now() + 6000;
  while (Date.now() < deadline) {
    const ok = await page.evaluate(() => {
      const box = document.querySelector(".leaflet-container");
      if (!box) return false;
      const tiles = [...document.querySelectorAll(".leaflet-tile")];
      if (tiles.length === 0) return false;
      const loaded = tiles.filter((t) => {
        if (t instanceof HTMLImageElement) return t.complete && t.naturalWidth > 0;
        const img = t.querySelector?.("img");
        return img ? img.complete && img.naturalWidth > 0 : t.complete !== false;
      }).length;
      return loaded >= Math.min(4, tiles.length);
    });
    if (ok) return;
    await sleep(200);
  }
}

/**
 * Continuous scroll driven from Node (~60 updates/sec).
 * Lenis.scrollTo(immediate) + ScrollTrigger.update keep Veltra pin scrubbing.
 * Scroll reveals / whileInView stay intact (no force-visible at start).
 */
async function continuousScroll(page, {
  pxPerSec = 380,
  upPxPerSec = 1800,
  pauseTopMs = 2200,
} = {}) {
  await sleep(Math.min(pauseTopMs, 800));
  await waitForIntroReady(page, { maxMs: Math.max(pauseTopMs, 2800) });
  await prepareForCapture(page);
  // Let hero eager animations play before scrolling
  await sleep(900);

  const frameMs = 16;
  let maxY = await getScrollMax(page);
  const t0 = Date.now();
  let y = 0;
  let lastY = -1;

  try {
    while (y < maxY - 0.5) {
      y = Math.min(maxY, ((Date.now() - t0) / 1000) * pxPerSec);
      const rounded = Math.round(y);
      if (rounded !== lastY) {
        await setScrollY(page, rounded);
        lastY = rounded;
        if (rounded % 240 < 20) {
          await nudgeReveals(page);
          await maybeWaitForMap(page);
        }
      }
      if (rounded % 900 < 20) {
        maxY = Math.max(maxY, await getScrollMax(page));
      }
      await sleep(frameMs);
    }
    await setScrollY(page, maxY);
    await nudgeReveals(page);
  } catch {
    /* navigation mid-scroll — keep recorded frames */
  }

  await sleep(500);

  let startY = maxY;
  try {
    startY = await page.evaluate(
      () => window.scrollY || document.documentElement.scrollTop || 0,
    );
  } catch {
    return;
  }
  const tUp = Date.now();
  let uy = startY;
  try {
    while (uy > 0.5) {
      uy = Math.max(0, startY - ((Date.now() - tUp) / 1000) * upPxPerSec);
      await setScrollY(page, Math.round(uy));
      await sleep(frameMs);
    }
    await setScrollY(page, 0);
  } catch {
    /* ignore */
  }
  await sleep(400);
}

function runFfmpeg(ffmpegArgs) {
  const r = spawnSync("ffmpeg", ffmpegArgs, { encoding: "utf8" });
  if (r.status !== 0 && r.stderr) {
    console.warn(String(r.stderr).slice(-400));
  }
  return r.status === 0;
}

function finalizeVideo(rawWebm, label, outW, outH) {
  const webmOut = join(exportDir, `${label}.webm`);
  const mp4Out = join(exportDir, `${label}.mp4`);
  copyFileSync(rawWebm, webmOut);

  const scaled = join(exportDir, `${label}__scaled.mp4`);
  const ok = runFfmpeg([
    "-y",
    "-i",
    webmOut,
    "-vf",
    `fps=${VIDEO_FPS},scale=${outW}:${outH}:force_original_aspect_ratio=decrease,pad=${outW}:${outH}:(ow-iw)/2:(oh-ih)/2:black,setsar=1`,
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    scaled,
  ]);

  if (ok && existsSync(scaled)) {
    copyFileSync(scaled, mp4Out);
    unlinkSync(scaled);
    return mp4Out;
  }

  runFfmpeg([
    "-y",
    "-i",
    webmOut,
    "-r",
    String(VIDEO_FPS),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    mp4Out,
  ]);
  return existsSync(mp4Out) ? mp4Out : webmOut;
}

async function blockDevHmr(page) {
  await page.route("**/_next/webpack-hmr**", (route) => route.abort());
  await page.route("**/_next/hmr**", (route) => route.abort());
  if (typeof page.routeWebSocket === "function") {
    await page.routeWebSocket("**/*", (ws) => {
      const url = ws.url();
      if (url.includes("hmr") || url.includes("webpack-hmr")) {
        ws.close();
        return;
      }
      ws.connectToServer();
    });
  }
}

async function capture() {
  if (!targets.length || !devices.length) {
    console.error("Niciun target/device — verifică --only / --device.");
    process.exit(1);
  }

  mkdirSync(exportDir, { recursive: true });
  if (desktopExport) mkdirSync(desktopExport, { recursive: true });

  for (const f of readdirSync(exportDir)) {
    if (f.startsWith("page@")) unlinkSync(join(exportDir, f));
  }

  const browser = await chromium.launch({
    headless: true,
    args: [
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
    ],
  });
  const manifest = [];

  for (const target of targets) {
    const url = `http://127.0.0.1:${target.port}/`;

    for (const device of devices) {
      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        deviceScaleFactor: device.scale,
        colorScheme: "light",
        reducedMotion: "no-preference",
        isMobile: device.isMobile,
        hasTouch: device.isMobile,
        recordVideo: {
          dir: exportDir,
          size: { width: device.width, height: device.height },
          fps: VIDEO_FPS,
        },
      });

      const page = await context.newPage();
      await blockDevHmr(page);

      await page.addInitScript(() => {
        try {
          sessionStorage.clear();
        } catch {
          /* ignore */
        }
      });

      const label = `${target.slug}__${device.name}`;
      try {
        console.log(`REC ${label} …`);
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
        await page.waitForLoadState("networkidle").catch(() => {});

        const pauseTopMs =
          target.slug === "vanta-ink"
            ? 2600
            : target.slug === "veltra" || target.slug === "aurelia-estates"
              ? 2200
              : 1800;
        // Slightly slower so reveal/whileInView animations are readable
        const speed = device.isMobile ? 320 : 360;
        await continuousScroll(page, {
          pxPerSec: speed,
          upPxPerSec: device.isMobile ? 1500 : 1800,
          pauseTopMs,
        });

        const video = page.video();
        await context.close();
        if (!video) {
          console.error(`FAIL ${label}: no video`);
          continue;
        }

        const rawPath = await video.path();
        const out = finalizeVideo(rawPath, label, device.outW, device.outH);
        const base = out.endsWith(".mp4") ? `${label}.mp4` : `${label}.webm`;

        if (desktopExport) {
          try {
            copyFileSync(out, join(desktopExport, base));
            const webm = join(exportDir, `${label}.webm`);
            if (existsSync(webm)) {
              copyFileSync(webm, join(desktopExport, `${label}.webm`));
            }
          } catch (err) {
            console.warn(`sync Desktop failed: ${err.message}`);
          }
        }

        const sizeMb = (statSync(out).size / (1024 * 1024)).toFixed(1);
        let fpsInfo = "";
        try {
          const probe = spawnSync(
            "ffprobe",
            [
              "-v",
              "error",
              "-select_streams",
              "v:0",
              "-show_entries",
              "stream=r_frame_rate,avg_frame_rate",
              "-of",
              "csv=p=0",
              out,
            ],
            { encoding: "utf8" },
          );
          fpsInfo = ` fps=${String(probe.stdout || "").trim()}`;
        } catch {
          /* ignore */
        }

        manifest.push({
          file: base,
          project: target.slug,
          device: device.name,
        });
        console.log(
          `OK ${label} → ${base} (${device.outW}x${device.outH}, ${sizeMb}MB${fpsInfo})`,
        );
      } catch (error) {
        console.error(`FAIL ${label}:`, error.message);
        await context.close().catch(() => {});
      }
    }
  }

  for (const f of readdirSync(exportDir)) {
    if (f.startsWith("page@") || f.includes("__scaled")) {
      try {
        unlinkSync(join(exportDir, f));
      } catch {
        /* ignore */
      }
    }
  }

  if (!onlySlug) {
    writeFileSync(
      join(exportDir, "README.txt"),
      [
        "Video-uri homepage: load + scroll CONTINUU @ 60fps.",
        "Desktop: 1480×900  |  Mobil: 900×1940.",
        "Animații păstrate; pin ScrollTriggers (Veltra) active.",
        "",
        ...manifest.map((m) => `- ${m.file}`),
        "",
      ].join("\n"),
    );
  }

  await browser.close();
  console.log(`\nGata. Video-urile sunt în:\n  ${exportDir}\n`);
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
