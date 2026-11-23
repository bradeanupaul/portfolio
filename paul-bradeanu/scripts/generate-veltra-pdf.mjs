#!/usr/bin/env node
/**
 * VELTRA-only client PDF — editorial layouts, substantial copy, photo beside topic.
 * Desktop shots 1480×900 · Mobile 900×1940
 *
 * Usage:
 *   node scripts/generate-veltra-pdf.mjs
 *   SKIP_CAPTURE=1 node scripts/generate-veltra-pdf.mjs
 *   FORCE=1 node scripts/generate-veltra-pdf.mjs
 */
import { chromium } from "playwright";
import {
  copyFileSync,
  mkdirSync,
  writeFileSync,
  existsSync,
  readFileSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outRoot = join(root, "..", "client-presentations");
const screensDir = join(outRoot, "screens", "veltra");
const techDir = join(outRoot, "tech");
const desktopOut = join(homedir(), "Desktop", "prezentari-clienti");
const COPY = JSON.parse(readFileSync(join(outRoot, "veltra-copy.json"), "utf8"));

const PORT = 3002;
const CONTACT = {
  name: "Paul Brădeanu",
  role: "Full-Stack Developer · Frontend & AI",
  email: "paul.bradeanu@gmail.com",
  phone: "+40 787 340 457",
  linkedin: "linkedin.com/in/paulbradeanu",
  github: "github.com/bradeanupaul",
  city: "Cluj-Napoca",
};

const LOGO_LIGHT = join(root, "public/branding/logo-pb-mark-dark.png");
const LOGO_DARK = join(root, "public/branding/logo-pb-mark.png");

const TECH_FILE = {
  "Next.js": "nextjs",
  React: "react",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  "Framer Motion": "framermotion",
  GSAP: "workflow",
  Prisma: "prisma",
  SQLite: "sqlite",
  Vitest: "vitest",
};

const ROUTES = {
  home: "/",
  camere: "/camere",
  camera: "/camere/mountain-view-suite",
  spa: "/spa",
  restaurant: "/restaurant",
  rezervari: "/rezervari",
  admin: "/admin/login",
  galerie: "/galerie",
  experiente: "/experiente",
  facilitati: "/facilitati",
  contact: "/contact",
  despre: "/despre-noi",
};

const T = {
  paper: "#F3EBE1",
  paperAlt: "#FAF7F0",
  mist: "#EFE6DA",
  pine: "#243D36",
  forest: "#1B2A25",
  ink: "#252B28",
  muted: "#5A6A62",
  copper: "#9A6445",
  clay: "#B77758",
  stone: "#D9D0C1",
  line: "rgba(36,61,54,0.14)",
  display: '"Cormorant Garamond", Georgia, serif',
  sans: '"Manrope", system-ui, sans-serif',
};

const I = {
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 9.5H4V20h2.5V9.5zM5.25 4A1.5 1.5 0 105.26 7a1.5 1.5 0 00-.01-3zM20 20h-2.5v-5.6c0-1.9-.7-3.2-2.4-3.2-1.3 0-2 .9-2.3 1.7-.1.3-.1.8-.1 1.2V20H10.2s.05-9.3 0-10.5H12.7v1.7c.5-.8 1.5-2 3.6-2 2.6 0 4.5 1.7 4.5 5.4V20z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.2-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 015 0c2-.1 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.6 5.1.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0022 12.2C22 6.6 17.5 2 12 2z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M4 8l8 6 8-6"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 4h3l1 4-2 1a10 10 0 005 5l1-2 4 1v3a2 2 0 01-2 2A13 13 0 016 6a2 2 0 012-2z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.2"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 13l4 4L19 7"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9z"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v5h5"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="8" r="3"/><path d="M3 19c0-2.8 2.7-5 6-5s6 2.2 6 5"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="6"/><path d="M16.5 16.5L21 21"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 13a5 5 0 007.1 0l2-2a5 5 0 00-7.1-7.1l-1.2 1.1"/><path d="M14 11a5 5 0 00-7.1 0l-2 2a5 5 0 007.1 7.1l1.2-1.1"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 16a8 8 0 1114 0"/><path d="M12 16l4-5"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 3v6c0 5-3.5 8.2-8 9-4.5-.8-8-4-8-9V6l8-3z"/></svg>`,
  steps: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 17h4v3H4zM10 11h4v9h-4zM16 6h4v14h-4z"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.4"/><path d="M21 16l-5-4-4 3-3-2-4 3"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 3L5 14h6l-1 7 9-12h-6l1-6z"/></svg>`,
};

const PAGE_ICONS = {
  home: "home",
  floor: "layers",
  camere: "grid",
  camera: "file",
  spa: "users",
  restaurant: "image",
  rezervari: "calendar",
  admin: "shield",
};

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}
function fileUrl(abs) {
  const u = abs.replaceAll("\\", "/");
  return u.startsWith("/") ? `file://${u}` : `file:///${u}`;
}
function esc(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
function shot(key, device) {
  if (!key) return null;
  const jpg = join(screensDir, `${key}__${device}.jpg`);
  if (existsSync(jpg)) return fileUrl(jpg);
  const base = key.replace(/-s\d+$/, "");
  if (base !== key) return shot(base, device);
  return null;
}
function techUrl(name) {
  const f = TECH_FILE[name];
  if (!f) return null;
  const p = join(techDir, `${f}.svg`);
  return existsSync(p) ? fileUrl(p) : null;
}
function ico(k) {
  return I[k] || I.check;
}
function baseKey(key) {
  return String(key || "").replace(/-s\d+$/, "");
}

function brandBar(onDark = false) {
  const logo = fileUrl(onDark ? LOGO_DARK : LOGO_LIGHT);
  return `
  <div class="brandbar ${onDark ? "on-dark" : ""}">
    <div class="brand-left">
      <img class="logo" src="${logo}" alt="" />
      <div class="brand-text">
        <strong>${esc(CONTACT.name)}</strong>
        <span>${esc(CONTACT.role)}</span>
      </div>
    </div>
    <div class="brand-right">
      <span class="ico">${I.linkedin}</span><span>LinkedIn</span>
      <span class="dot"></span>
      <span class="ico">${I.github}</span><span>GitHub</span>
      <span class="dot"></span>
      <span class="ico">${I.mail}</span><span>${esc(CONTACT.email)}</span>
    </div>
  </div>`;
}

function fig(key, device, cap = "") {
  const src = shot(key, device);
  if (!src) return "";
  const cls = device === "mobile" ? "phone" : "desk";
  return `<figure class="fig ${cls}"><img src="${src}" alt="" />${cap ? `<figcaption>${esc(cap)}</figcaption>` : ""}</figure>`;
}

function sectionBlock(sec) {
  const paras = (sec.paras || []).map((p) => `<p>${esc(p)}</p>`).join("");
  const bullets = (sec.bullets || [])
    .map((b) => `<li><span class="ico">${I.check}</span><span>${esc(b)}</span></li>`)
    .join("");
  return `
  <article class="sec">
    <h4>${esc(sec.heading)}</h4>
    <div class="sec-body">${paras}</div>
    ${bullets ? `<ul class="bullets">${bullets}</ul>` : ""}
  </article>`;
}

function buildCss() {
  return `
  :root {
    --paper:${T.paper}; --paper-alt:${T.paperAlt}; --mist:${T.mist};
    --pine:${T.pine}; --forest:${T.forest}; --ink:${T.ink};
    --muted:${T.muted}; --copper:${T.copper}; --clay:${T.clay};
    --stone:${T.stone}; --line:${T.line};
    --display:${T.display}; --sans:${T.sans};
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:#111;color:var(--ink);font-family:var(--sans);font-size:9.6pt;line-height:1.42;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{size:A4;margin:0}
  .page{width:210mm;height:297mm;page-break-after:always;break-after:page;position:relative;overflow:hidden;background:var(--paper)}
  .page:last-child{page-break-after:auto}
  .page-inner{padding:9mm 12mm 14mm;height:100%;display:flex;flex-direction:column}
  .page-foot{position:absolute;left:12mm;right:12mm;bottom:5.5mm;display:flex;justify-content:space-between;font-size:6.8pt;color:var(--muted);border-top:1px solid var(--line);padding-top:2mm}

  .brandbar{display:flex;justify-content:space-between;align-items:center;gap:3mm;margin-bottom:4.5mm;padding-bottom:2.5mm;border-bottom:1px solid var(--line);flex-shrink:0}
  .brand-left{display:flex;align-items:center;gap:2.5mm}
  .logo{height:8.5mm;width:8.5mm;object-fit:contain}
  .brand-text{display:flex;flex-direction:column;gap:.2mm}
  .brand-text strong{font-family:var(--display);font-size:9.2pt;font-weight:600;color:var(--pine)}
  .brand-text span{font-size:6.4pt;color:var(--muted)}
  .brand-right{display:flex;align-items:center;gap:1.8mm;font-size:6.6pt;color:var(--muted)}
  .dot{width:2px;height:2px;border-radius:50%;background:var(--copper)}
  .ico{width:3.6mm;height:3.6mm;color:var(--copper);display:inline-flex;flex-shrink:0}
  .ico svg{width:100%;height:100%}
  .ico.lg{width:6mm;height:6mm}
  .brandbar.on-dark{border-color:rgba(243,235,225,.18)}
  .brandbar.on-dark .brand-text strong,.brandbar.on-dark .brand-right{color:#F3EBE1}
  .brandbar.on-dark .brand-text span{color:rgba(243,235,225,.65)}
  .brandbar.on-dark .ico{color:#E7BF92}

  .eyebrow{font-size:6.8pt;letter-spacing:.16em;text-transform:uppercase;font-weight:650;color:var(--copper);margin-bottom:1.6mm}
  h1,h2,h3,h4{font-family:var(--display);font-weight:650;letter-spacing:-.02em;color:var(--pine)}
  h1{font-size:26pt;line-height:1.05;max-width:178mm}
  h2{font-size:17pt;line-height:1.1;margin-bottom:2mm}
  h3{font-size:12pt;margin-bottom:1.5mm}
  h4{font-size:9pt;letter-spacing:.04em;text-transform:uppercase;color:var(--copper);margin:0 0 1.5mm;font-family:var(--sans);font-weight:700}
  .tagline{margin-top:2mm;font-size:10.5pt;color:var(--muted);max-width:175mm;line-height:1.4}
  .lede{font-size:9.5pt;color:var(--muted);line-height:1.45;margin:2mm 0 3mm;max-width:178mm}
  .lede.strong{color:var(--ink);font-size:9.8pt}
  p{font-size:8.6pt;color:var(--muted);line-height:1.42;margin-bottom:1.8mm}
  .why{margin-top:auto;padding-top:3mm;border-top:1px solid var(--line);display:grid;grid-template-columns:5mm 1fr;gap:2.5mm;align-items:start}
  .why p{margin:0;font-size:8.4pt;color:var(--ink)}

  .fig{margin:0}
  .fig img{display:block;width:100%;object-fit:cover;object-position:top center;background:transparent}
  .fig.desk img{aspect-ratio:1480/900}
  .fig.phone img{aspect-ratio:900/1940}
  .fig figcaption{font-size:6.2pt;color:var(--muted);margin-top:1.2mm;letter-spacing:.04em}

  /* —— Cover —— */
  .cover-grid{display:grid;grid-template-columns:1.15fr 0.85fr;gap:5mm;margin-top:3mm;flex:1;min-height:0}
  .cover-copy .body p{font-size:8.5pt}
  .points{display:grid;gap:0;margin-top:3.5mm}
  .point{display:grid;grid-template-columns:5mm 1fr;gap:2.2mm;padding:2.4mm 0;border-top:1px solid var(--line)}
  .point:first-child{border-top:2px solid var(--copper)}
  .point strong{display:block;font-size:8.6pt;color:var(--pine);margin-bottom:.5mm;font-family:var(--display)}
  .point span{font-size:7.4pt;color:var(--muted);line-height:1.3}
  .cover-visual{display:flex;flex-direction:column;gap:2.5mm;min-height:0}
  .cover-visual .desk img{max-height:92mm}
  .cover-phones{display:grid;grid-template-columns:1fr 1fr;gap:2.5mm;margin-top:auto}
  .cover-phones .phone img{max-height:78mm}
  .cover-strip{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2.5mm;margin-top:3.5mm}
  .cover-strip .desk img{max-height:42mm}

  /* —— Journey —— */
  .journey-grid{display:grid;grid-template-columns:1fr 1fr;gap:3.5mm 5mm;margin-top:2mm;flex:1}
  .j-step{padding:3mm;background:var(--paper-alt);border-left:2.5px solid var(--copper)}
  .j-step .num{font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:var(--copper);font-weight:700;margin-bottom:1mm}
  .j-step h3{font-size:11pt;margin-bottom:1.2mm}
  .j-step p{font-size:8pt;margin:0}
  .journey-shots{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2.5mm;margin-top:3.5mm}
  .journey-shots .desk img{max-height:48mm}

  /* —— Deep page: text + photos —— */
  .deep-head{display:grid;grid-template-columns:7mm 1fr;gap:3mm;align-items:start;margin-bottom:2.5mm;flex-shrink:0}
  .deep-layout{display:grid;grid-template-columns:0.95fr 1.05fr;gap:5mm;flex:1;min-height:0;align-items:stretch}
  .deep-layout.flip{grid-template-columns:1.05fr 0.95fr}
  .deep-layout.flip .deep-copy{order:2}
  .deep-layout.flip .deep-media{order:1}
  .deep-copy{display:flex;flex-direction:column;min-height:0;overflow:hidden}
  .sec{margin-bottom:3mm}
  .sec:last-of-type{margin-bottom:0}
  .sec-body p{font-size:8.1pt}
  .bullets{list-style:none;display:grid;gap:1.3mm;margin-top:1.8mm}
  .bullets li{display:grid;grid-template-columns:3.8mm 1fr;gap:1.8mm;align-items:start;font-size:7.6pt;color:var(--muted);line-height:1.3}
  .deep-media{display:flex;flex-direction:column;gap:2.5mm;min-height:0}
  .deep-media .desk{flex:0 0 auto}
  .deep-media .desk img{max-height:78mm}
  .deep-media .pair{display:grid;grid-template-columns:1fr 0.42fr;gap:2.2mm;align-items:end;margin-top:auto}
  .deep-media .pair .desk img{max-height:58mm}
  .deep-media .pair .phone img{max-height:58mm}

  /* full-width variant for floor / rezervari */
  .deep-wide .deep-layout{grid-template-columns:1fr;gap:3mm}
  .deep-wide .deep-media{display:grid;grid-template-columns:1.2fr 1.2fr 0.42fr;gap:2.5mm;align-items:end}
  .deep-wide .deep-media .desk img{max-height:72mm}
  .deep-wide .deep-media .phone img{max-height:72mm}
  .deep-wide .secs-row{display:grid;grid-template-columns:1fr 1fr;gap:4mm}

  /* Mobile page */
  .mobile-grid{display:grid;grid-template-columns:0.9fr 1.1fr;gap:5mm;flex:1;min-height:0}
  .m-points{display:grid;gap:2.5mm}
  .m-point{display:grid;grid-template-columns:5mm 1fr;gap:2mm;padding:2.5mm;background:var(--paper-alt)}
  .m-point strong{display:block;font-size:8.8pt;color:var(--pine);margin-bottom:.6mm;font-family:var(--display)}
  .m-point span{font-size:7.6pt;color:var(--muted);line-height:1.3}
  .m-phones{display:grid;grid-template-columns:1fr 1fr;gap:3mm;align-items:end}
  .m-phones .phone img{max-height:150mm}

  /* Stack */
  .tech-list{list-style:none;display:flex;flex-wrap:wrap;gap:2.2mm;margin:3mm 0 4mm}
  .tech{display:inline-flex;align-items:center;gap:2mm;padding:2mm 2.8mm;border:1px solid var(--line);border-radius:2mm;font-size:7.8pt;font-weight:600;color:var(--pine)}
  .tech img{width:4mm;height:4mm;object-fit:contain}
  .next-list{list-style:none;display:grid;gap:2mm;margin-top:2mm}
  .next-list li{display:grid;grid-template-columns:4mm 1fr;gap:2mm;font-size:8pt;color:var(--muted)}
  .stack-split{display:grid;grid-template-columns:1.15fr 0.85fr;gap:5mm;flex:1;align-items:start}
  .stack-shots{display:grid;grid-template-columns:1fr 1fr;gap:2.5mm;align-items:end}
  .stack-shots .phone img{max-height:100mm}

  /* SEO */
  .seo-grid{display:grid;grid-template-columns:1fr 1fr;gap:3mm;margin:3mm 0}
  .seo-card{padding:3mm;border-left:2.5px solid var(--copper);background:var(--paper-alt)}
  .seo-card strong{display:block;font-size:9.5pt;color:var(--pine);margin:1mm 0;font-family:var(--display)}
  .seo-card p{font-size:7.6pt;margin:0}
  .seo-shots{display:grid;grid-template-columns:1fr 1fr;gap:3mm;margin-top:auto}
  .seo-shots .desk img{max-height:62mm}

  /* Contact */
  .cta{background:var(--forest);color:#F3EBE1}
  .cta h2,.cta h3{color:#F3EBE1}
  .cta .lede,.cta p{color:rgba(243,235,225,.78)}
  .cta .page-foot{color:rgba(243,235,225,.5);border-color:rgba(243,235,225,.15)}
  .cta .ico{color:#E7BF92}
  .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:6mm;margin-top:5mm}
  .social{display:flex;align-items:center;gap:2.5mm;margin-top:2.8mm;font-size:9pt;color:#F3EBE1}
  .big{font-family:var(--display);font-size:14pt;margin-top:2mm;color:#fff}
  .cta-shots{margin-top:auto;display:grid;grid-template-columns:1.5fr .4fr;gap:4mm;align-items:end;padding-top:5mm}
  .cta-shots .desk img,.cta-shots .phone img{opacity:.95;max-height:70mm}
  `;
}

function buildHtml() {
  const c = COPY;
  const meta = c.meta;

  // Cover
  const coverPoints = (c.cover.points || [])
    .map(
      (p, i) => `
      <div class="point">
        <span class="ico lg">${ico(["grid", "calendar", "shield"][i] || "check")}</span>
        <div><strong>${esc(p.title)}</strong><span>${esc(p.text)}</span></div>
      </div>`,
    )
    .join("");
  const coverBody = (c.cover.body || []).map((p) => `<p>${esc(p)}</p>`).join("");

  const cover = `
  <section class="page">
    <div class="page-inner">
      ${brandBar()}
      <p class="eyebrow">${esc(meta.category)}</p>
      <h1>${esc(meta.name)}</h1>
      <p class="tagline">${esc(meta.tagline)}</p>
      <div class="cover-grid">
        <div class="cover-copy">
          <p class="lede strong">${esc(c.cover.lede)}</p>
          <div class="body">${coverBody}</div>
          <div class="points">${coverPoints}</div>
        </div>
        <div class="cover-visual">
          ${fig("home", "desktop")}
          <div class="cover-phones">
            ${fig("home", "mobile")}
            ${fig("camere", "mobile")}
          </div>
        </div>
      </div>
      <div class="cover-strip">
        ${fig("home-s2", "desktop")}
        ${fig("camera", "desktop")}
        ${fig("rezervari", "desktop")}
      </div>
    </div>
    <footer class="page-foot"><span>${esc(meta.name)}</span><span>Prezentare · ${esc(CONTACT.name)}</span></footer>
  </section>`;

  // Journey
  const steps = (c.journey.steps || [])
    .map(
      (s, i) => `
      <div class="j-step">
        <div class="num">Pas ${i + 1}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
      </div>`,
    )
    .join("");
  const journey = `
  <section class="page">
    <div class="page-inner">
      ${brandBar()}
      <p class="eyebrow">Parcursul pe site</p>
      <h2>${esc(c.journey.title)}</h2>
      <p class="lede">${esc(c.journey.intro)}</p>
      <div class="journey-grid">${steps}</div>
      <div class="journey-shots">
        ${fig("home", "desktop")}
        ${fig("camere", "desktop")}
        ${fig("rezervari", "desktop")}
      </div>
    </div>
    <footer class="page-foot"><span>${esc(meta.name)}</span><span>Parcurs</span></footer>
  </section>`;

  // Deep pages
  const deepPages = (c.pages || [])
    .map((pg, idx) => {
      const icon = ico(PAGE_ICONS[pg.id] || "layers");
      const wide = pg.id === "floor" || pg.id === "rezervari" || pg.id === "home";
      const flip = !wide && idx % 2 === 1;
      const secs = (pg.sections || []).map(sectionBlock).join("");
      const primary = pg.shots?.primary;
      const secondary = pg.shots?.secondary;
      const phone = pg.shots?.phone || primary;

      if (wide) {
        const half = Math.ceil((pg.sections || []).length / 2);
        const left = (pg.sections || []).slice(0, half).map(sectionBlock).join("");
        const right = (pg.sections || []).slice(half).map(sectionBlock).join("");
        return `
        <section class="page deep-wide">
          <div class="page-inner">
            ${brandBar()}
            <div class="deep-head">
              <span class="ico lg">${icon}</span>
              <div>
                <p class="eyebrow">${esc(pg.eyebrow)}</p>
                <h2>${esc(pg.title)}</h2>
                <p class="lede">${esc(pg.lede)}</p>
              </div>
            </div>
            <div class="secs-row"><div>${left}</div><div>${right}</div></div>
            <div class="deep-media" style="margin-top:3mm">
              ${fig(primary, "desktop")}
              ${fig(secondary, "desktop")}
              ${fig(phone, "mobile")}
            </div>
            ${pg.why ? `<div class="why"><span class="ico">${I.bolt}</span><p>${esc(pg.why)}</p></div>` : ""}
          </div>
          <footer class="page-foot"><span>${esc(meta.name)}</span><span>${esc(pg.title)}</span></footer>
        </section>`;
      }

      return `
      <section class="page">
        <div class="page-inner">
          ${brandBar()}
          <div class="deep-head">
            <span class="ico lg">${icon}</span>
            <div>
              <p class="eyebrow">${esc(pg.eyebrow)}</p>
              <h2>${esc(pg.title)}</h2>
            </div>
          </div>
          <div class="deep-layout ${flip ? "flip" : ""}">
            <div class="deep-copy">
              <p class="lede">${esc(pg.lede)}</p>
              ${secs}
              ${pg.why ? `<div class="why"><span class="ico">${I.bolt}</span><p>${esc(pg.why)}</p></div>` : ""}
            </div>
            <div class="deep-media">
              ${fig(primary, "desktop")}
              <div class="pair">
                ${fig(secondary, "desktop")}
                ${fig(phone, "mobile")}
              </div>
            </div>
          </div>
        </div>
        <footer class="page-foot"><span>${esc(meta.name)}</span><span>${esc(pg.title)}</span></footer>
      </section>`;
    })
    .join("\n");

  // Mobile
  const mPoints = (c.mobile.points || [])
    .map(
      (p, i) => `
      <div class="m-point">
        <span class="ico lg">${ico(["home", "grid", "calendar", "file"][i] || "check")}</span>
        <div><strong>${esc(p.title)}</strong><span>${esc(p.text)}</span></div>
      </div>`,
    )
    .join("");
  const mPhones = (c.mobile.shots || [])
    .slice(0, 4)
    .map((k) => fig(k, "mobile"))
    .join("");
  const mobile = `
  <section class="page">
    <div class="page-inner">
      ${brandBar()}
      <p class="eyebrow">Telefon</p>
      <h2>${esc(c.mobile.title)}</h2>
      <p class="lede">${esc(c.mobile.lede)}</p>
      <div class="mobile-grid">
        <div class="m-points">${mPoints}</div>
        <div class="m-phones">${mPhones}</div>
      </div>
    </div>
    <footer class="page-foot"><span>${esc(meta.name)}</span><span>Mobil</span></footer>
  </section>`;

  // Stack
  const tech = (c.stack.items || [])
    .map((name) => {
      const src = techUrl(name);
      return `<li class="tech">${src ? `<img src="${src}" alt="" />` : `<span class="ico">${I.layers}</span>`}<span>${esc(name)}</span></li>`;
    })
    .join("");
  const next = (c.stack.nextSteps || [])
    .map((s, i) => `<li><span class="ico">${ico(["link", "bolt", "calendar", "shield", "users"][i] || "check")}</span><span>${esc(s)}</span></li>`)
    .join("");
  const stack = `
  <section class="page">
    <div class="page-inner">
      ${brandBar()}
      <p class="eyebrow">Tehnologie</p>
      <h2>Cu ce e construit VELTRA</h2>
      <div class="stack-split">
        <div>
          <p class="lede">${esc(c.stack.note)}</p>
          <ul class="tech-list">${tech}</ul>
          <h4>Ce se poate lega după demo</h4>
          <ul class="next-list">${next}</ul>
        </div>
        <div class="stack-shots">
          ${fig("home", "mobile")}
          ${fig("rezervari", "mobile")}
        </div>
      </div>
    </div>
    <footer class="page-foot"><span>${esc(meta.name)}</span><span>Stack</span></footer>
  </section>`;

  // SEO
  const seoCards = (c.seo.items || [])
    .map(
      (s, i) => `
      <article class="seo-card">
        <span class="ico">${ico(["search", "link", "gauge", "shield", "file"][i] || "search")}</span>
        <strong>${esc(s.title)}</strong>
        <p>${esc(s.text)}</p>
      </article>`,
    )
    .join("");
  const seo = `
  <section class="page">
    <div class="page-inner">
      ${brandBar()}
      <p class="eyebrow">Vizibilitate</p>
      <h2>Cum te găsesc oamenii pe Google</h2>
      <p class="lede">${esc(c.seo.intro)}</p>
      <div class="seo-grid">${seoCards}</div>
      <div class="seo-shots">
        ${fig("camere", "desktop")}
        ${fig("restaurant", "desktop")}
      </div>
    </div>
    <footer class="page-foot"><span>${esc(meta.name)}</span><span>SEO</span></footer>
  </section>`;

  // Contact
  const contact = `
  <section class="page cta">
    <div class="page-inner">
      ${brandBar(true)}
      <p class="eyebrow" style="color:#E7BF92">Contact</p>
      <h2 style="font-size:20pt;max-width:170mm">${esc(meta.name)} pe datele și brandul tău</h2>
      <p class="lede" style="margin-top:3mm">${esc(c.contact.lead)}</p>
      <div class="contact-grid">
        <div>
          <h3>${esc(CONTACT.name)}</h3>
          <p>${esc(CONTACT.role)}</p>
          <p class="big">${esc(CONTACT.email)}</p>
          <div class="social"><span class="ico">${I.phone}</span>${esc(CONTACT.phone)}</div>
          <div class="social"><span class="ico">${I.pin}</span>${esc(CONTACT.city)}</div>
        </div>
        <div>
          <h3>Online</h3>
          <div class="social"><span class="ico">${I.linkedin}</span>${esc(CONTACT.linkedin)}</div>
          <div class="social"><span class="ico">${I.github}</span>${esc(CONTACT.github)}</div>
          <div class="social"><span class="ico">${I.mail}</span>Subiect: VELTRA</div>
        </div>
      </div>
      <div class="cta-shots">
        ${fig("home", "desktop")}
        ${fig("home", "mobile")}
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
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>${buildCss()}</style>
</head>
<body>
${cover}
${journey}
${deepPages}
${mobile}
${stack}
${seo}
${contact}
</body>
</html>`;
}

async function prepare(page) {
  await page.waitForLoadState("domcontentloaded").catch(() => {});
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    try {
      sessionStorage.setItem("veltra-loader-seen", "1");
    } catch {}
    for (const el of [...document.querySelectorAll("body *")]) {
      const s = getComputedStyle(el);
      if (s.position !== "fixed" && s.position !== "absolute") continue;
      const z = parseInt(s.zIndex || "0", 10);
      if (z < 40) continue;
      const r = el.getBoundingClientRect();
      if (r.width >= innerWidth * 0.8 && r.height >= innerHeight * 0.8) el.style.display = "none";
    }
    for (const el of document.querySelectorAll("main *, body section *, body header *")) {
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("filter", "none", "important");
      el.style.setProperty("visibility", "visible", "important");
    }
  });
  await page.waitForTimeout(400);
}

async function captureKey(browser, key) {
  const route = ROUTES[baseKey(key)];
  if (!route) {
    console.warn("  no route", key);
    return;
  }
  const scrollFrac = /-s2$/.test(key) ? 0.32 : /-s3$/.test(key) ? 0.55 : 0;
  const devices = [
    { name: "desktop", width: 1480, height: 900, scale: 1, outW: 1480, outH: 900 },
    { name: "mobile", width: 450, height: 970, scale: 2, outW: 900, outH: 1940 },
  ];
  ensureDir(screensDir);
  for (const device of devices) {
    const jpg = join(screensDir, `${key}__${device.name}.jpg`);
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
      await page.goto(`http://127.0.0.1:${PORT}${route}`, {
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
          }
        }, scrollFrac);
        await page.waitForTimeout(800);
      }
      const png = join(screensDir, `${key}__${device.name}.png`);
      await page.screenshot({ path: png, fullPage: false, type: "png" });
      execFileSync("sips", ["-z", String(device.outH), String(device.outW), png], { stdio: "pipe" });
      execFileSync(
        "python3",
        [
          "-c",
          `from PIL import Image; import os
im=Image.open(${JSON.stringify(png)}).convert('RGB')
im.save(${JSON.stringify(jpg)},'JPEG',quality=84,optimize=True,progressive=True)
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

async function main() {
  ensureDir(screensDir);
  ensureDir(techDir);
  ensureDir(join(outRoot, "html"));
  ensureDir(join(outRoot, "pdf"));
  ensureDir(desktopOut);

  const keys = new Set(["home", "home-s2", "home-s3", "camere", "camere-s2", "camera", "camera-s2", "spa", "spa-s2", "restaurant", "restaurant-s2", "rezervari", "rezervari-s2", "admin", "galerie", "experiente"]);
  for (const pg of COPY.pages || []) {
    for (const k of Object.values(pg.shots || {})) keys.add(k);
  }
  for (const k of COPY.mobile?.shots || []) keys.add(k);

  const browser = await chromium.launch({ headless: true });
  try {
    if (process.env.SKIP_CAPTURE !== "1") {
      try {
        const res = await fetch(`http://127.0.0.1:${PORT}/`);
        if (!res.ok) throw new Error("bad status");
      } catch {
        console.error(`VELTRA nu rulează pe :${PORT}. Pornește: cd veltra && npx next dev -H 127.0.0.1 -p 3002`);
        process.exit(1);
      }
      console.log("▶ capture veltra");
      for (const key of keys) await captureKey(browser, key);
    }

    const html = buildHtml();
    const htmlPath = join(outRoot, "html", "veltra.html");
    writeFileSync(htmlPath, html, "utf8");
    const page = await browser.newPage();
    await page.goto(fileUrl(htmlPath), { waitUntil: "networkidle", timeout: 120000 });
    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
    });
    await page.waitForTimeout(800);
    const pdfPath = join(outRoot, "pdf", "VELTRA_Prezentare.pdf");
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    await page.close();
    copyFileSync(pdfPath, join(desktopOut, "VELTRA_Prezentare.pdf"));
    console.log(`PDF → ${pdfPath}`);
    console.log(`Synced → ${desktopOut}/VELTRA_Prezentare.pdf`);
  } finally {
    await browser.close();
  }
  console.log("\nDONE VELTRA");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
