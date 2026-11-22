#!/usr/bin/env node
/**
 * Client PDFs — short UI copy, photo-led layouts, video-matched aspect ratios.
 * Desktop: 1480×900  |  Mobile: 900×1940
 */
import { chromium } from "playwright";
import {
  copyFileSync,
  mkdirSync,
  writeFileSync,
  existsSync,
  readdirSync,
  readFileSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outRoot = join(root, "..", "client-presentations");
const desktopOut = join(homedir(), "Desktop", "prezentari-clienti");
const logoOnDark = join(root, "public/branding/logo-pb-mark.png");
const logoOnLight = join(root, "public/branding/logo-pb-mark-dark.png");
const techDir = join(outRoot, "tech");
const COPY = JSON.parse(readFileSync(join(outRoot, "copy.json"), "utf8"));

const CONTACT = {
  name: "Paul Brădeanu",
  role: "Full-Stack Developer · Frontend & AI",
  email: "paul.bradeanu@gmail.com",
  phone: "+40 787 340 457",
  linkedin: "linkedin.com/in/paulbradeanu",
  github: "github.com/bradeanupaul",
  city: "Cluj-Napoca",
};

const TECH_FILE = {
  "Next.js": "nextjs",
  React: "react",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  "Framer Motion": "framermotion",
  Motion: "framermotion",
  GSAP: "workflow",
  Prisma: "prisma",
  SQLite: "sqlite",
  Zod: "zod",
  Vitest: "vitest",
  Leaflet: "leaflet",
  Zustand: "zustand",
};

/** Capture routes for known keys (s2/s3 are scroll crops of same route) */
const ROUTE_OF = {
  home: "/",
  meniu: "/meniu",
  preparat: "/meniu/tagliatelle-al-tartufo",
  rezervari: "/rezervari",
  galerie: "/galerie",
  despre: "/despre-noi",
  evenimente: "/evenimente",
  contact: "/contact",
  recenzii: "/",
  camere: "/camere",
  camera: "/camere/mountain-view-suite",
  spa: "/spa",
  restaurant: "/restaurant",
  experiente: "/experiente",
  imprejurimi: "/imprejurimi",
  admin: "/admin",
  portofoliu: "/portofoliu",
  lucrare: "/portofoliu/molie-blackwork-umar",
  artist: "/artisti/mara-ionescu",
  artisti: "/artisti",
  proces: "/proces",
  programare: "/programare",
  servicii: "/servicii",
  catalog: "/proprietati",
  proprietate: "/proprietati/vila-sculpturala-herastrau",
  colectii: "/colectii",
  echipa: "/echipa",
  vizionare: "/programeaza-vizionare",
  favorite: "/favorite",
  vinde: "/vinde",
  magazin: "/magazin",
  produs: "/produs/glow-drops",
  rutina: "/rutina-mea",
  checkout: "/checkout",
  jurnal: "/jurnal",
  cos: "/cos",
};

const META = {
  "bella-notte": {
    fileName: "Bella_Notte_Prezentare",
    name: "Bella Notte",
    category: "Restaurant italian",
    port: 3001,
    theme: darkTheme(
      "#0a0908",
      "#12100e",
      "#1b1713",
      "#f6efe4",
      "#c9beae",
      "#d8af5b",
      "Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700",
      '"Cormorant Garamond", Georgia, serif',
      '"DM Sans", system-ui, sans-serif',
    ),
  },
  veltra: {
    fileName: "VELTRA_Prezentare",
    name: "VELTRA Alpine Hideaway & Spa",
    category: "Lodge · Spa · Retreat montan",
    port: 3002,
    theme: lightTheme(
      "#faf7f0",
      "#f3ebe1",
      "#ffffff",
      "#1b2a25",
      "#5a6a62",
      "#9a6445",
      "Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700",
      '"Cormorant Garamond", Georgia, serif',
      '"Manrope", system-ui, sans-serif',
    ),
  },
  "vanta-ink": {
    fileName: "VANTA_INK_Prezentare",
    name: "VANTA INK",
    category: "Studio de tatuaje",
    port: 3003,
    theme: {
      ...darkTheme(
        "#0b0b0c",
        "#141416",
        "#1c1c1f",
        "#f5f3ee",
        "#b1b0ae",
        "#ff5538",
        "Anton&family=Manrope:wght@400;500;600;700",
        '"Anton", Impact, sans-serif',
        '"Manrope", system-ui, sans-serif',
      ),
      upperDisplay: true,
    },
  },
  "aurelia-estates": {
    fileName: "Aurelia_Estates_Prezentare",
    name: "Aurelia Estates",
    category: "Agenție imobiliară",
    port: 3004,
    theme: lightTheme(
      "#ffffff",
      "#f4f8fd",
      "#ffffff",
      "#111f35",
      "#66758b",
      "#2563b8",
      "Plus+Jakarta+Sans:wght@500;600;700&family=Manrope:wght@400;500;600;700",
      '"Plus Jakarta Sans", system-ui, sans-serif',
      '"Manrope", system-ui, sans-serif',
    ),
  },
  "elan-skin": {
    fileName: "ELAN_SKIN_Prezentare",
    name: "ÉLAN SKIN",
    category: "E-commerce · Skincare",
    port: 3005,
    theme: lightTheme(
      "#faf8fc",
      "#eae1f2",
      "#ffffff",
      "#292632",
      "#78717d",
      "#8463a1",
      "DM+Serif+Display&family=Manrope:wght@400;500;600;700",
      '"DM Serif Display", Georgia, serif',
      '"Manrope", system-ui, sans-serif',
    ),
  },
};

function darkTheme(paper, paperAlt, surface, ink, muted, accent, fontsCss, display, sans) {
  return {
    mode: "dark",
    paper,
    paperAlt,
    surface,
    ink,
    muted,
    accent,
    line: "rgba(255,255,255,0.12)",
    fontsCss,
    display,
    sans,
  };
}
function lightTheme(paper, paperAlt, surface, ink, muted, accent, fontsCss, display, sans) {
  return {
    mode: "light",
    paper,
    paperAlt,
    surface,
    ink,
    muted,
    accent,
    line: "rgba(0,0,0,0.10)",
    fontsCss,
    display,
    sans,
  };
}

const ICONS = {
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 9.5H4V20h2.5V9.5zM5.25 4A1.5 1.5 0 105.26 7a1.5 1.5 0 00-.01-3zM20 20h-2.5v-5.6c0-1.9-.7-3.2-2.4-3.2-1.3 0-2 .9-2.3 1.7-.1.3-.1.8-.1 1.2V20H10.2s.05-9.3 0-10.5H12.7v1.7c.5-.8 1.5-2 3.6-2 2.6 0 4.5 1.7 4.5 5.4V20z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.2-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 015 0c2-.1 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.6 5.1.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0022 12.2C22 6.6 17.5 2 12 2z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M4 8l8 6 8-6"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 4h3l1 4-2 1a10 10 0 005 5l1-2 4 1v3a2 2 0 01-2 2A13 13 0 016 6a2 2 0 012-2z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.2"/></svg>`,
  // Distinct feature icons — never reuse checkmarks for everything
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5z"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v5h5"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.4"/><path d="M21 16l-5-4-4 3-3-2-4 3"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="8" r="3"/><path d="M3 19c0-2.8 2.7-5 6-5s6 2.2 6 5"/><circle cx="17" cy="9" r="2.2"/><path d="M21 19c0-2-1.6-3.6-4-4"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 5h2l2.2 11h11.3l2-8H7"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="6"/><path d="M16.5 16.5L21 21"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 4l6 2 5-2v14l-5 2-6-2-5 2V6l5-2z"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg>`,
  steps: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 17h4v3H4zM10 11h4v9h-4zM16 6h4v14h-4z"/></svg>`,
  form: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9z"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 3L5 14h6l-1 7 9-12h-6l1-6z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 13a5 5 0 007.1 0l2-2a5 5 0 00-7.1-7.1l-1.2 1.1"/><path d="M14 11a5 5 0 00-7.1 0l-2 2a5 5 0 007.1 7.1l1.2-1.1"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 16a8 8 0 1114 0"/><path d="M12 16l4-5"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 3v6c0 5-3.5 8.2-8 9-4.5-.8-8-4-8-9V6l8-3z"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 5.5A2.5 2.5 0 017.5 3H20v16H7.5A2.5 2.5 0 005 16.5v-11z"/><path d="M5 16.5A2.5 2.5 0 017.5 19H20"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/></svg>`,
};

const FEATURE_ICON_KEYS = ["grid", "filter", "file", "calendar", "image", "users", "cart", "search", "map", "heart", "steps", "form"];
const FLOW_ICON_KEYS = ["home", "steps", "bolt", "form", "link", "layers"];
const SEO_ICON_KEYS = ["search", "link", "gauge", "shield"];
const COVER_ICON_KEYS = ["bolt", "grid", "form"];

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}
function fileUrl(absPath) {
  const u = absPath.replaceAll("\\", "/");
  return u.startsWith("/") ? `file://${u}` : `file:///${u}`;
}
function esc(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
function shotSrc(slug, key, device) {
  if (!key) return null;
  const jpg = join(outRoot, "screens", slug, `${key}__${device}.jpg`);
  const png = join(outRoot, "screens", slug, `${key}__${device}.png`);
  if (existsSync(jpg)) return fileUrl(jpg);
  if (existsSync(png)) return fileUrl(png);
  // fallback: strip -s2/-s3 for alternate crops
  const base = key.replace(/-s\d+$/, "");
  if (base !== key) return shotSrc(slug, base, device);
  return null;
}
function logoFor(onDark) {
  return fileUrl(onDark ? logoOnDark : logoOnLight);
}
function techIconUrl(name) {
  const file = TECH_FILE[name];
  if (!file) return null;
  const p = join(techDir, `${file}.svg`);
  return existsSync(p) ? fileUrl(p) : null;
}
function ico(key) {
  return ICONS[key] || ICONS.grid;
}

function brandBar(onDark) {
  return `
  <div class="brandbar">
    <div class="brand-left">
      <img class="logo" src="${logoFor(onDark)}" alt="" />
      <div class="brand-text">
        <strong>${esc(CONTACT.name)}</strong>
        <span>${esc(CONTACT.role)}</span>
      </div>
    </div>
    <div class="brand-right">
      <span class="ico">${ICONS.linkedin}</span><span>LinkedIn</span>
      <span class="sep"></span>
      <span class="ico">${ICONS.github}</span><span>GitHub</span>
      <span class="sep"></span>
      <span class="ico">${ICONS.mail}</span><span>${esc(CONTACT.email)}</span>
    </div>
  </div>`;
}

function deskFig(slug, key, caption = true) {
  const src = shotSrc(slug, key, "desktop");
  if (!src) return "";
  return `<figure class="fig desk"><img src="${src}" alt="" />${caption ? `<figcaption>Desktop</figcaption>` : ""}</figure>`;
}
function phoneFig(slug, key, caption = true) {
  const src = shotSrc(slug, key, "mobile");
  if (!src) return "";
  return `<figure class="fig phone"><img src="${src}" alt="" />${caption ? `<figcaption>Mobil</figcaption>` : ""}</figure>`;
}

function buildHtml(slug) {
  const meta = META[slug];
  const copy = COPY.projects[slug];
  const shared = COPY.shared;
  const t = meta.theme;
  const isDark = t.mode === "dark";
  const upper = Boolean(t.upperDisplay);
  const u = upper ? "upper" : "";

  // —— Cover ——
  const coverChips = (copy.coverPoints || [])
    .map(
      (p, i) => `
      <div class="chip">
        <span class="ico">${ico(COVER_ICON_KEYS[i % COVER_ICON_KEYS.length])}</span>
        <div>
          <strong>${esc(p.title)}</strong>
          <span>${esc(p.subtitle)}</span>
        </div>
      </div>`,
    )
    .join("");

  const coverFeat = (copy.features || []).slice(0, 3);
  const cover = `
  <section class="page cover">
    <div class="page-inner">
      ${brandBar(isDark)}
      <p class="eyebrow">${esc(meta.category)}</p>
      <h1 class="${u}">${esc(meta.name)}</h1>
      <p class="tagline">${esc(copy.tagline)}</p>
      <div class="cover-main">
        ${deskFig(slug, "home", false)}
        <div class="cover-side">
          ${phoneFig(slug, "home", false)}
          <div class="chip-col">${coverChips}</div>
        </div>
      </div>
      <div class="cover-strip">
        ${coverFeat.map((f) => deskFig(slug, f.shot, false)).join("")}
      </div>
    </div>
    <footer class="page-foot"><span>${esc(meta.name)}</span><span>Prezentare · ${esc(CONTACT.name)}</span></footer>
  </section>`;

  // —— One module per page: icon+title+subtitle, then photos of THAT screen ——
  const features = copy.features || [];
  const featurePages = features.map((f, i) => {
    const icon = ico(FEATURE_ICON_KEYS[i % FEATURE_ICON_KEYS.length]);
    const alt = `${f.shot}-s2`;
    const layout = i % 3; // vary composition
    return `
    <section class="page feat layout-${layout}">
      <div class="page-inner tight">
        ${brandBar(isDark)}
        <div class="feat-head">
          <span class="ico xl">${icon}</span>
          <div>
            <p class="eyebrow">Modul ${i + 1}/${features.length} · ${esc(meta.name)}</p>
            <h2 class="${u}">${esc(f.title)}</h2>
            <p class="sub">${esc(f.subtitle)}</p>
          </div>
        </div>
        <div class="feat-stage">
          ${deskFig(slug, f.shot, false)}
          ${phoneFig(slug, f.shot, false)}
        </div>
        <div class="feat-strip">
          ${deskFig(slug, alt, false)}
          ${phoneFig(slug, alt, false) || phoneFig(slug, f.shot, false)}
        </div>
      </div>
      <footer class="page-foot"><span>${esc(meta.name)}</span><span>${esc(f.title)}</span></footer>
    </section>`;
  });

  // —— Flow pages: 1 flow per page, 2 desk shots + phone, short bullets ——
  const flowPages = (copy.flows || [])
    .map((fl, i) => {
      const icon = ico(FLOW_ICON_KEYS[i % FLOW_ICON_KEYS.length]);
      const s0 = fl.shots?.[0];
      const s1 = fl.shots?.[1] || s0;
      const bullets = (fl.bullets || [])
        .map((b, bi) => {
          const bIcon = ico(FEATURE_ICON_KEYS[(i + bi + 3) % FEATURE_ICON_KEYS.length]);
          return `<li><span class="ico">${bIcon}</span><span>${esc(b)}</span></li>`;
        })
        .join("");
      return `
      <section class="page">
        <div class="page-inner tight">
          ${brandBar(isDark)}
          <div class="flow-head">
            <span class="ico lg">${icon}</span>
            <div class="flow-titles">
              <p class="eyebrow">Flux · ${i + 1}/${(copy.flows || []).length}</p>
              <h2 class="${u}">${esc(fl.title)}</h2>
              <p class="sub">${esc(fl.subtitle)}</p>
            </div>
            <ul class="mini-list vert">${bullets}</ul>
          </div>
          <div class="flow-hero">
            ${deskFig(slug, s0, false)}
          </div>
          <div class="flow-row">
            ${deskFig(slug, s1, false)}
            ${phoneFig(slug, s0, false)}
            ${phoneFig(slug, s1, false)}
          </div>
        </div>
        <footer class="page-foot"><span>${esc(meta.name)}</span><span>${esc(fl.title)}</span></footer>
      </section>`;
    })
    .join("");

  // —— Stack ——
  const stackItems = (copy.stack || [])
    .map((name) => {
      const src = techIconUrl(name);
      return `<li class="tech">${src ? `<img src="${src}" alt="" />` : `<span class="ico">${ico("layers")}</span>`}<span>${esc(name)}</span></li>`;
    })
    .join("");
  const next = (copy.nextSteps || [])
    .map((s, i) => {
      const icon = ico(["link", "bolt", "calendar", "shield"][i % 4]);
      return `<li><span class="ico">${icon}</span><span>${esc(s)}</span></li>`;
    })
    .join("");

  const stackPage = `
  <section class="page">
    <div class="page-inner">
      ${brandBar(isDark)}
      <p class="eyebrow">Tehnologie</p>
      <h2 class="${u}">Stack · ${esc(meta.name)}</h2>
      <p class="sub">${esc(copy.stackNote)}</p>
      <ul class="tech-list">${stackItems}</ul>
      <div class="split-foot">
        <div>
          <p class="eyebrow">După demo</p>
          <ul class="mini-list">${next}</ul>
        </div>
        <div class="stack-phones">
          ${phoneFig(slug, "home", false)}
          ${phoneFig(slug, features[0]?.shot || "home", false)}
        </div>
      </div>
    </div>
    <footer class="page-foot"><span>${esc(meta.name)}</span><span>Stack</span></footer>
  </section>`;

  // —— SEO: 4 short cards + supporting shots ——
  const seoCards = (copy.seo || [])
    .map((s, i) => {
      const icon = ico(SEO_ICON_KEYS[i % SEO_ICON_KEYS.length]);
      return `
      <article class="seo-card">
        <span class="ico">${icon}</span>
        <strong>${esc(s.title)}</strong>
        <p>${esc(s.subtitle)}</p>
      </article>`;
    })
    .join("");
  const seoShotA = features[1]?.shot || "home";
  const seoShotB = features[2]?.shot || features[0]?.shot || "home";

  const seoPage = `
  <section class="page">
    <div class="page-inner">
      ${brandBar(isDark)}
      <p class="eyebrow">Vizibilitate</p>
      <h2 class="${u}">Cum apare ${esc(meta.name)} în căutare</h2>
      <div class="seo-grid">${seoCards}</div>
      <div class="seo-shots">
        ${deskFig(slug, seoShotA, true)}
        ${deskFig(slug, seoShotB, true)}
      </div>
    </div>
    <footer class="page-foot"><span>${esc(meta.name)}</span><span>SEO</span></footer>
  </section>`;

  // —— Contact ——
  const contact = `
  <section class="page cta">
    <div class="page-inner">
      ${brandBar(true)}
      <p class="eyebrow">Contact</p>
      <h2 class="${u}" style="font-size:20pt">${esc(meta.name)} pe datele tale</h2>
      <p class="sub" style="margin-top:3mm">${esc(shared.contactLead)}</p>
      <div class="contact-grid">
        <div>
          <h3>${esc(CONTACT.name)}</h3>
          <p>${esc(CONTACT.role)}</p>
          <p class="big">${esc(CONTACT.email)}</p>
          <div class="social"><span class="ico">${ICONS.phone}</span>${esc(CONTACT.phone)}</div>
          <div class="social"><span class="ico">${ICONS.pin}</span>${esc(CONTACT.city)}</div>
        </div>
        <div>
          <h3>Online</h3>
          <div class="social"><span class="ico">${ICONS.linkedin}</span>${esc(CONTACT.linkedin)}</div>
          <div class="social"><span class="ico">${ICONS.github}</span>${esc(CONTACT.github)}</div>
          <div class="social"><span class="ico">${ICONS.mail}</span>Subiect: ${esc(meta.name)}</div>
        </div>
      </div>
      <div class="cta-shots">
        ${deskFig(slug, "home", false)}
        ${phoneFig(slug, "home", false)}
      </div>
    </div>
    <footer class="page-foot"><span>${esc(meta.name)}</span><span>Contact</span></footer>
  </section>`;

  return `<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="utf-8" />
<title>${esc(meta.name)} · ${esc(CONTACT.name)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?${t.fontsCss}&display=swap" rel="stylesheet" />
<style>
  :root{
    --paper:${t.paper}; --paper-alt:${t.paperAlt}; --surface:${t.surface};
    --ink:${t.ink}; --muted:${t.muted}; --accent:${t.accent}; --line:${t.line};
    --display:${t.display}; --sans:${t.sans};
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:#111;color:var(--ink);font-family:var(--sans);font-size:10pt;line-height:1.35;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{size:A4;margin:0}
  .page{width:210mm;height:297mm;page-break-after:always;break-after:page;position:relative;overflow:hidden;background:var(--paper)}
  .page:last-child{page-break-after:auto}
  .page-inner{padding:9mm 11mm 14mm;height:100%;display:flex;flex-direction:column}
  .page-inner.tight{padding-bottom:13mm}
  .page-foot{position:absolute;left:11mm;right:11mm;bottom:5.5mm;display:flex;justify-content:space-between;font-size:7pt;color:var(--muted);border-top:1px solid var(--line);padding-top:2mm}

  .brandbar{display:flex;justify-content:space-between;align-items:center;gap:3mm;margin-bottom:4mm;padding-bottom:2.5mm;border-bottom:1px solid var(--line);flex-shrink:0}
  .brand-left{display:flex;align-items:center;gap:2.5mm}
  .logo{height:8.5mm;width:8.5mm;object-fit:contain}
  .brand-text{display:flex;flex-direction:column;gap:.2mm}
  .brand-text strong{font-family:var(--display);font-size:9pt;font-weight:600}
  .brand-text span{font-size:6.5pt;color:var(--muted)}
  .brand-right{display:flex;align-items:center;gap:1.8mm;font-size:6.8pt;color:var(--muted)}
  .sep{width:2px;height:2px;border-radius:50%;background:var(--accent);opacity:.7}
  .ico{width:3.8mm;height:3.8mm;color:var(--accent);display:inline-flex;flex-shrink:0}
  .ico svg{width:100%;height:100%}
  .ico.lg{width:6.5mm;height:6.5mm}
  .ico.xl{width:9mm;height:9mm}

  .eyebrow{font-size:7pt;letter-spacing:.14em;text-transform:uppercase;font-weight:650;color:var(--accent);margin-bottom:1.5mm}
  h1,h2,h3{font-family:var(--display);font-weight:650;letter-spacing:-.02em}
  h1{font-size:${upper ? "22pt" : "24pt"};line-height:1.05;max-width:180mm}
  h1.upper,h2.upper{text-transform:uppercase;letter-spacing:.03em}
  h2{font-size:${upper ? "13.5pt" : "15pt"};margin-bottom:2mm}
  h3{font-size:12pt;margin:1.5mm 0 1mm}
  .tagline{margin-top:2mm;font-size:10pt;color:var(--muted);max-width:175mm}
  .sub{font-size:9pt;color:var(--muted);max-width:170mm;line-height:1.4}

  /* Cover */
  .cover-main{display:grid;grid-template-columns:1.45fr 0.55fr;gap:3.5mm;align-items:start;margin-top:3mm;flex:1;min-height:0}
  .cover-main > .desk img{aspect-ratio:1480/900;width:100%;height:auto;max-height:118mm;object-fit:cover;object-position:top;display:block}
  .cover-side{display:flex;flex-direction:column;gap:2.5mm;min-height:0}
  .cover-side .phone img{aspect-ratio:900/1940;width:72%;margin-left:auto;max-height:78mm;object-fit:cover;object-position:top;display:block}
  .chip-col{display:grid;gap:0;margin-top:1mm}
  .chip{display:grid;grid-template-columns:4.2mm 1fr;gap:1.8mm;align-items:start;padding:2mm 0;border-top:1px solid var(--line)}
  .chip:first-child{border-top:2px solid var(--accent)}
  .chip strong{display:block;font-size:8pt;margin-bottom:.4mm}
  .chip span:last-child{font-size:6.9pt;color:var(--muted);line-height:1.25}
  .cover-strip{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2.5mm;margin-top:3mm}
  .cover-strip .desk img{aspect-ratio:1480/900;width:100%;object-fit:cover;object-position:top;display:block}

  /* Feature — one module, photos of that screen fill the page */
  .feat-head{display:grid;grid-template-columns:10mm 1fr;gap:3.5mm;align-items:start;margin-bottom:3mm;flex-shrink:0}
  .feat-head h2{margin-bottom:1.2mm}
  .feat-stage{display:grid;grid-template-columns:1.55fr 0.45fr;gap:3mm;align-items:end;flex:1;min-height:0}
  .feat-stage .desk img{aspect-ratio:1480/900;width:100%;max-height:135mm;object-fit:cover;object-position:top;display:block}
  .feat-stage .phone img{aspect-ratio:900/1940;width:100%;max-height:135mm;object-fit:cover;object-position:top;display:block}
  .feat-strip{display:grid;grid-template-columns:1.4fr 0.4fr;gap:3mm;align-items:end;margin-top:3mm}
  .feat-strip .desk img{aspect-ratio:1480/900;width:100%;object-fit:cover;object-position:top;display:block}
  .feat-strip .phone img{aspect-ratio:900/1940;width:100%;max-height:70mm;object-fit:cover;object-position:top;display:block}
  .feat.layout-1 .feat-stage{grid-template-columns:0.42fr 1.58fr}
  .feat.layout-1 .feat-stage .phone{order:-1}
  .feat.layout-2 .feat-strip{grid-template-columns:1fr}

  /* Flows */
  .flow-head{display:grid;grid-template-columns:6.5mm 1fr 0.85fr;gap:3mm;align-items:start;margin-bottom:2.5mm;flex-shrink:0}
  .flow-head h2{margin-bottom:1mm}
  .flow-head .sub{margin-top:0}
  .flow-hero{margin-bottom:2.5mm}
  .flow-hero .desk img{aspect-ratio:1480/900;width:100%;max-height:112mm;object-fit:cover;object-position:top;display:block}
  .flow-row{display:grid;grid-template-columns:1.4fr 0.4fr 0.4fr;gap:2.5mm;align-items:end;margin-top:auto}
  .flow-row .desk img{aspect-ratio:1480/900;width:100%;object-fit:cover;object-position:top;display:block}
  .flow-row .phone img{aspect-ratio:900/1940;width:100%;max-height:88mm;object-fit:cover;object-position:top;display:block}
  .fig{margin:0}
  .fig figcaption{font-size:6.5pt;color:var(--muted);margin-top:1.2mm;letter-spacing:.03em}

  .mini-list{list-style:none;display:grid;grid-template-columns:1fr 1fr 1fr;gap:2.5mm}
  .mini-list.vert{grid-template-columns:1fr;gap:1.8mm}
  .mini-list li{display:grid;grid-template-columns:4mm 1fr;gap:1.8mm;align-items:start;font-size:7.4pt;color:var(--muted);line-height:1.25}

  /* Stack */
  .tech-list{list-style:none;display:flex;flex-wrap:wrap;gap:2.2mm;margin:3mm 0 5mm}
  .tech{display:inline-flex;align-items:center;gap:2mm;padding:2mm 2.8mm;border:1px solid var(--line);border-radius:2mm;font-size:8pt;font-weight:600}
  .tech img{width:4.2mm;height:4.2mm;object-fit:contain;${isDark ? "filter:brightness(0) invert(1);" : ""}}
  .split-foot{display:grid;grid-template-columns:1.2fr 0.8fr;gap:5mm;margin-top:auto;align-items:end}
  .split-foot .mini-list{grid-template-columns:1fr;gap:2.2mm}
  .stack-phones{display:grid;grid-template-columns:1fr 1fr;gap:3mm;align-items:end}
  .stack-phones .phone img{aspect-ratio:900/1940;width:100%;max-height:88mm;object-fit:cover;object-position:top;display:block}

  /* SEO */
  .seo-grid{display:grid;grid-template-columns:1fr 1fr;gap:3.5mm;margin:3mm 0 4mm}
  .seo-card{padding:3mm;border-left:2.5px solid var(--accent);background:var(--paper-alt)}
  .seo-card .ico{margin-bottom:1.5mm}
  .seo-card strong{display:block;font-size:9.5pt;margin-bottom:1mm;font-family:var(--display)}
  .seo-card p{font-size:7.8pt;color:var(--muted);line-height:1.35}
  .seo-shots{display:grid;grid-template-columns:1fr 1fr;gap:3.5mm;margin-top:auto}
  .seo-shots .desk img{aspect-ratio:1480/900;width:100%;object-fit:cover;object-position:top;display:block}

  /* Contact */
  .cta{background:${isDark ? t.paperAlt : "#121826"};color:${isDark ? t.ink : "#F4F7FB"}}
  .cta .page-foot{color:${isDark ? t.muted : "rgba(244,247,251,.55)"};border-color:${isDark ? t.line : "rgba(244,247,251,.15)"}}
  .cta h2,.cta h3,.cta .brand-text strong{color:${isDark ? t.ink : "#fff"}}
  .cta .sub,.cta .brand-text span,.cta .brand-right,.cta p{color:${isDark ? t.muted : "rgba(244,247,251,.72)"}}
  .cta .ico{color:var(--accent)}
  .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:6mm;margin-top:6mm}
  .social{display:flex;align-items:center;gap:2.5mm;margin-top:2.8mm;font-size:9pt}
  .social .ico{width:4.5mm;height:4.5mm}
  .big{font-family:var(--display);font-size:13pt;margin-top:2mm;color:${isDark ? t.ink : "#fff"}}
  .cta-shots{margin-top:auto;display:grid;grid-template-columns:1.5fr .4fr;gap:4mm;align-items:end;padding-top:5mm}
  .cta-shots .desk img{aspect-ratio:1480/900;width:100%;object-fit:cover;object-position:top;display:block;opacity:.92}
  .cta-shots .phone img{aspect-ratio:900/1940;width:100%;max-height:70mm;object-fit:cover;object-position:top;display:block;opacity:.92}
</style>
</head>
<body>
${cover}
${featurePages.join("\n")}
${flowPages}
${stackPage}
${seoPage}
${contact}
</body>
</html>`;
}

async function prepare(page) {
  await page.waitForLoadState("domcontentloaded").catch(() => {});
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    try {
      sessionStorage.setItem("bn-loader-shown", "1");
      sessionStorage.setItem("veltra-loader-seen", "1");
      sessionStorage.setItem("elan-loader-seen", "1");
    } catch {}
    // kill full-screen loaders / error toasts
    for (const el of [...document.querySelectorAll("body *")]) {
      const s = getComputedStyle(el);
      if (s.position !== "fixed" && s.position !== "absolute") continue;
      const z = parseInt(s.zIndex || "0", 10);
      if (z < 40) continue;
      const r = el.getBoundingClientRect();
      if (r.width >= innerWidth * 0.8 && r.height >= innerHeight * 0.8) el.style.display = "none";
    }
    for (const el of document.querySelectorAll("main *, body section *, body header *, body footer *")) {
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("filter", "none", "important");
      el.style.setProperty("visibility", "visible", "important");
    }
  });
  await page.waitForTimeout(400);
  await page.evaluate(async () => {
    const imgs = [...document.images];
    await Promise.all(
      imgs.slice(0, 40).map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.onload = img.onerror = () => res();
                setTimeout(res, 2000);
              }),
      ),
    );
  });
}

function baseKey(key) {
  return String(key || "").replace(/-s\d+$/, "");
}

async function captureProject(browser, slug) {
  const meta = META[slug];
  const copy = COPY.projects[slug];
  const dir = join(outRoot, "screens", slug);
  ensureDir(dir);
  console.log(`\n▶ capture ${slug}`);

  const keys = new Set(["home", "home-s2"]);
  for (const f of copy.features || []) {
    if (!f.shot) continue;
    keys.add(f.shot);
    keys.add(`${f.shot}-s2`);
  }
  for (const fl of copy.flows || []) for (const s of fl.shots || []) keys.add(s);
  for (const s of copy._captureExtra || []) keys.add(s);

  const devices = [
    { name: "desktop", width: 1480, height: 900, scale: 1, outW: 1480, outH: 900 },
    { name: "mobile", width: 450, height: 970, scale: 2, outW: 900, outH: 1940 },
  ];

  for (const key of keys) {
    const route = ROUTE_OF[baseKey(key)];
    if (!route) {
      console.warn(`  no route for ${key}`);
      continue;
    }
    // scroll variants: capture mid-page offset
    const scrollFrac = /-s2$/.test(key) ? 0.35 : /-s3$/.test(key) ? 0.65 : 0;

    for (const device of devices) {
      const jpg = join(dir, `${key}__${device.name}.jpg`);
      if (existsSync(jpg) && process.env.FORCE !== "1") {
        try {
          const dims = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", jpg], {
            encoding: "utf8",
          });
          const w = Number(dims.match(/pixelWidth:\s*(\d+)/)?.[1] || 0);
          const h = Number(dims.match(/pixelHeight:\s*(\d+)/)?.[1] || 0);
          if (w === device.outW && h === device.outH) {
            console.log(`  skip ${key}__${device.name}`);
            continue;
          }
        } catch {}
      }

      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        deviceScaleFactor: device.scale,
      });
      const page = await context.newPage();
      try {
        await page.goto(`http://127.0.0.1:${meta.port}${route}`, {
          waitUntil: "domcontentloaded",
          timeout: 90000,
        });
        await prepare(page);
        if (scrollFrac > 0) {
          await page.evaluate((f) => {
            const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
            scrollTo(0, max * f);
            for (const img of document.querySelectorAll("img")) {
              img.loading = "eager";
              if (img.dataset.src && !img.src) img.src = img.dataset.src;
              // retrigger lazy observers
              img.setAttribute("src", img.getAttribute("src") || "");
            }
          }, scrollFrac);
          await page.waitForTimeout(700);
          await page.evaluate(() => {
            for (const el of document.querySelectorAll("main img, section img, article img")) {
              el.style.setProperty("opacity", "1", "important");
              el.style.setProperty("visibility", "visible", "important");
            }
          });
        }
        const png = join(dir, `${key}__${device.name}.png`);
        await page.screenshot({ path: png, fullPage: false, type: "png" });
        execFileSync("sips", ["-z", String(device.outH), String(device.outW), png], {
          stdio: "pipe",
        });
        execFileSync(
          "python3",
          [
            "-c",
            `from PIL import Image; import os
im=Image.open(${JSON.stringify(png)}).convert('RGB')
im.save(${JSON.stringify(jpg)},'JPEG',quality=82,optimize=True,progressive=True)
os.remove(${JSON.stringify(png)})`,
          ],
          { stdio: "pipe" },
        );
        console.log(`  OK ${key}__${device.name}`);
      } catch (e) {
        console.error(`  FAIL ${key} ${device.name}:`, e.message);
      } finally {
        await context.close();
      }
    }
  }
}

async function renderPdfs(browser) {
  const htmlDir = join(outRoot, "html");
  const pdfDir = join(outRoot, "pdf");
  ensureDir(htmlDir);
  ensureDir(pdfDir);
  for (const slug of Object.keys(META)) {
    const htmlPath = join(htmlDir, `${slug}.html`);
    writeFileSync(htmlPath, buildHtml(slug), "utf8");
    const page = await browser.newPage();
    await page.goto(fileUrl(htmlPath), { waitUntil: "networkidle", timeout: 120000 });
    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
    });
    await page.waitForTimeout(600);
    const pdfPath = join(pdfDir, `${META[slug].fileName}.pdf`);
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    await page.close();
    console.log(`PDF → ${pdfPath}`);
  }
}

function syncToDesktop() {
  ensureDir(desktopOut);
  for (const f of readdirSync(join(outRoot, "pdf"))) {
    if (!f.endsWith(".pdf")) continue;
    copyFileSync(join(outRoot, "pdf", f), join(desktopOut, f));
  }
  writeFileSync(
    join(desktopOut, "README.txt"),
    `Prezentări PDF · Paul Brădeanu\nScreenshot-uri: desktop 1480×900, mobil 900×1940.\nContact: ${CONTACT.email}\n`,
  );
  console.log(`Synced → ${desktopOut}`);
}

async function main() {
  ensureDir(outRoot);
  ensureDir(techDir);
  if (!existsSync(join(techDir, "nextjs.svg"))) {
    for (const f of readdirSync(join(root, "public/tech"))) {
      copyFileSync(join(root, "public/tech", f), join(techDir, f));
    }
  }

  const browser = await chromium.launch({ headless: true });
  try {
    if (process.env.SKIP_CAPTURE !== "1") {
      for (const slug of Object.keys(META)) {
        try {
          const res = await fetch(`http://127.0.0.1:${META[slug].port}/`);
          if (!res.ok) console.warn("port warn", META[slug].port, res.status);
        } catch {
          console.error("Portul", META[slug].port, "nu răspunde");
          process.exit(1);
        }
      }
      await Promise.all(Object.keys(META).map((slug) => captureProject(browser, slug)));
    }
    await renderPdfs(browser);
  } finally {
    await browser.close();
  }
  syncToDesktop();
  console.log("\nDONE");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
