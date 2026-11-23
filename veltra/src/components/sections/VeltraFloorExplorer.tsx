"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FLOOR_EXPLORER_MANIFEST,
  FLOOR_NAV_STAGES,
  FLOOR_STAGES,
  frameSrc,
  stageIndexForFrame,
  type FloorSpace,
  type FloorStage,
} from "@/data/veltra-floor-explorer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Bounds = { x: number; y: number; w: number; h: number };

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function DetailIcon({ name }: { name: FloorSpace["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-[1.15rem] w-[1.15rem]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  const icons: Record<FloorSpace["icon"], ReactNode> = {
    bed: (
      <svg {...common}>
        <path d="M3 18V11.5A2.5 2.5 0 0 1 5.5 9h13A2.5 2.5 0 0 1 21 11.5V18" />
        <path d="M2 18h20M5 18v2M19 18v2" />
        <path d="M7 9V7.5A1.5 1.5 0 0 1 8.5 6H12" />
      </svg>
    ),
    bath: (
      <svg {...common}>
        <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
        <path d="M6 12V7a2 2 0 0 1 2-2h1" />
        <path d="M8 19v1M16 19v1" />
      </svg>
    ),
    sofa: (
      <svg {...common}>
        <path d="M4 14h16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Z" />
        <path d="M6 14V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
      </svg>
    ),
    dining: (
      <svg {...common}>
        <path d="M4 10h16v2H4z" />
        <path d="M7 12v7M17 12v7M5 19h14" />
      </svg>
    ),
    kitchen: (
      <svg {...common}>
        <path d="M5 4h14v6H5z" />
        <path d="M5 10v10h14V10" />
        <path d="M9 14h6" />
      </svg>
    ),
    balcony: (
      <svg {...common}>
        <path d="M4 14h16" />
        <path d="M6 14v5M10 14v5M14 14v5M18 14v5" />
        <path d="M5 19h14" />
        <path d="M8 8h8v6H8z" />
      </svg>
    ),
    stairs: (
      <svg {...common}>
        <path d="M4 20h4v-4h4v-4h4V8h4" />
      </svg>
    ),
    reception: (
      <svg {...common}>
        <path d="M4 18V9l8-5 8 5v9" />
        <path d="M9 18v-5h6v5" />
      </svg>
    ),
    fire: (
      <svg {...common}>
        <path d="M12 3c1.5 2.5 3 4 3 6.5a3 3 0 1 1-6 0C9 7 10.5 5.5 12 3Z" />
        <path d="M8 16c1.2-1.5 2.5-2 4-2s2.8.5 4 2" />
      </svg>
    ),
  };

  return icons[name];
}

/** Crop once from the intact lodge (frame 0). Per-frame bounds cause scrub jitter. */
function measureOpaqueBounds(img: HTMLImageElement): Bounds {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const full = { x: 0, y: 0, w, h };
  const probe = document.createElement("canvas");
  probe.width = w;
  probe.height = h;
  const ctx = probe.getContext("2d", { willReadFrequently: true });
  if (!ctx) return full;
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  const step = 2;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const a = data[(y * w + x) * 4 + 3] ?? 0;
      if (a > 24) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX <= minX || maxY <= minY) return full;
  const padX = Math.round(w * 0.02);
  const padTop = Math.round(h * 0.02);
  const padBottom = Math.round(h * 0.05);
  const x = Math.max(0, minX - padX);
  const y = Math.max(0, minY - padTop);
  return {
    x,
    y,
    w: Math.min(w - x, maxX - minX + padX * 2),
    h: Math.min(h - y, maxY - minY + padTop + padBottom),
  };
}

function drawFrame(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  stableBounds: Bounds,
  sizeRef: { w: number; h: number; dpr: number },
) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !img.naturalWidth) return;

  const parent = canvas.parentElement;
  const cssW = Math.max(280, Math.round(parent?.clientWidth || canvas.clientWidth || 720));
  const cssH = Math.max(280, Math.round(parent?.clientHeight || window.innerHeight * 0.62));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const pixelW = Math.round(cssW * dpr);
  const pixelH = Math.round(cssH * dpr);

  // Resizing the canvas clears it and resets transform; only do it when needed
  if (sizeRef.w !== pixelW || sizeRef.h !== pixelH || sizeRef.dpr !== dpr) {
    canvas.width = pixelW;
    canvas.height = pixelH;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    sizeRef.w = pixelW;
    sizeRef.h = pixelH;
    sizeRef.dpr = dpr;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  const b = stableBounds;
  // Leave a small bottom margin so the ground strip is never clipped
  const fit = Math.min(cssW / b.w, (cssH * 0.94) / b.h) * 0.88;
  const dw = b.w * fit;
  const dh = b.h * fit;
  const dx = (cssW - dw) / 2;
  const dy = Math.max(4, (cssH - dh) * 0.22);
  ctx.drawImage(img, b.x, b.y, b.w, b.h, dx, dy, dw, dh);
}

export function VeltraFloorExplorer() {
  const reduced = usePrefersReducedMotion();
  const lenis = useLenis();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const stableBoundsRef = useRef<Bounds | null>(null);
  const canvasSizeRef = useRef({ w: 0, h: 0, dpr: 0 });
  const frameRef = useRef(0);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [manualStage, setManualStage] = useState<number | null>(null);

  const activeIndex = manualStage ?? stageIndex;
  const active = FLOOR_STAGES[activeIndex] ?? FLOOR_STAGES[0]!;
  const maxFrame = FLOOR_EXPLORER_MANIFEST.frameCount - 1;

  const showFrame = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frame];
    const bounds = stableBoundsRef.current;
    if (!canvas || !img?.complete || !img.naturalWidth || !bounds) return;
    frameRef.current = frame;
    drawFrame(canvas, img, bounds, canvasSizeRef.current);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const host = sectionRef.current;
    if (!host) return;

    let cancelled = false;
    let started = false;
    const images: (HTMLImageElement | null)[] = new Array(
      FLOOR_EXPLORER_MANIFEST.frameCount,
    ).fill(null);
    imagesRef.current = images;
    let loaded = 0;
    let firstReady = false;

    const onLoad = (i: number, img: HTMLImageElement) => {
      if (cancelled) return;
      images[i] = img;
      loaded += 1;
      if (!firstReady && i === 0 && img.naturalWidth) {
        firstReady = true;
        stableBoundsRef.current = measureOpaqueBounds(img);
        setReady(true);
        showFrame(0);
      }
      if (loaded >= FLOOR_EXPLORER_MANIFEST.frameCount) showFrame(frameRef.current);
    };

    const priority = new Set<number>([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      ...FLOOR_STAGES.flatMap((s) => [s.frameStart, s.frameEnd]),
    ]);

    const loadOne = (i: number) => {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => onLoad(i, img);
      img.onerror = () => {
        loaded += 1;
        if (i === 0) setFailed(true);
      };
      img.src = frameSrc(i);
    };

    const startLoading = () => {
      if (started || cancelled) return;
      started = true;
      // First paint: only priority frames. Rest after idle so LCP/TBT stay clear.
      [...priority].forEach(loadOne);
      const loadRest = () => {
        if (cancelled) return;
        for (let i = 0; i < FLOOR_EXPLORER_MANIFEST.frameCount; i++) {
          if (!priority.has(i)) loadOne(i);
        }
      };
      const ric = (
        window as Window & {
          requestIdleCallback?: (
            cb: () => void,
            opts?: { timeout: number },
          ) => number;
        }
      ).requestIdleCallback;
      if (typeof ric === "function") {
        ric(loadRest, { timeout: 2500 });
      } else {
        globalThis.setTimeout(loadRest, 1200);
      }
    };

    // Don't pull ~7MB of frames until the section is near the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          startLoading();
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px", threshold: 0.01 },
    );
    io.observe(host);

    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [reduced, showFrame]);

  useEffect(() => {
    if (!ready || reduced || failed) return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    // Snap to completed stage starts (and final end) so scroll never rests mid-cutaway
    const snapPoints = [
      ...FLOOR_STAGES.map((stage) => Math.max(0, stage.frameStart) / maxFrame),
      1,
    ];

    // Mobile uses a shorter pin runway; layout is flow-based (no absolute overlap).
    const mobile = window.innerWidth < 768;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top+=40",
      end: () => (mobile ? "+=220%" : "+=380%"),
      pin: true,
      // Softer scrub so leaving the pin feels less abrupt
      scrub: mobile ? 0.7 : 0.85,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: (value) => {
          let nearest = snapPoints[0] ?? 0;
          let best = Math.abs(value - nearest);
          for (const point of snapPoints) {
            const d = Math.abs(value - point);
            if (d < best) {
              best = d;
              nearest = point;
            }
          }
          return nearest;
        },
        duration: { min: 0.35, max: 0.7 },
        delay: 0.08,
        ease: "power2.inOut",
      },
      onUpdate: (self) => {
        const frame = Math.round(self.progress * maxFrame);
        if (frame !== frameRef.current) showFrame(frame);
        const next = stageIndexForFrame(frame);
        if (manualStage !== null) {
          if (next === manualStage) setManualStage(null);
          return;
        }
        setStageIndex((prev) => (prev === next ? prev : next));
      },
    });
    triggerRef.current = trigger;

    const onResize = () => {
      showFrame(frameRef.current);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      // revert:true unwraps pin-spacer so React unmount does not throw
      trigger.kill(true);
      triggerRef.current = null;
      window.removeEventListener("resize", onResize);
    };
  }, [ready, reduced, failed, maxFrame, showFrame, manualStage]);

  const seekToStage = (stage: FloorStage) => {
    const index = FLOOR_STAGES.findIndex((s) => s.id === stage.id);
    if (index < 0) return;
    const targetFrame = Math.min(stage.frameEnd - 1, maxFrame);
    showFrame(targetFrame);
    setStageIndex(index);
    setManualStage(index);

    const trigger = triggerRef.current;
    if (!trigger) {
      setManualStage(null);
      return;
    }
    const progress = targetFrame / maxFrame;
    const top = trigger.start + (trigger.end - trigger.start) * progress;
    if (lenis && !reduced) {
      // Never lock Lenis: a stuck lock breaks soft navigation and page scroll
      lenis.scrollTo(top, { duration: 0.85, lock: false });
    } else {
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    }
    window.setTimeout(() => {
      setManualStage((current) => (current === index ? null : current));
    }, 1100);
  };

  if (reduced || failed) {
    return (
      <section
        aria-labelledby="floor-explorer-heading"
        className="floor-explorer-section relative overflow-hidden py-20 md:py-28"
        style={{ backgroundColor: FLOOR_EXPLORER_MANIFEST.background }}
      >
        <div className="hero-shell grid gap-12 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <p className="floor-explorer-kicker text-[0.75rem] font-semibold tracking-[0.2em] uppercase">
              Planul lodjei
            </p>
            <h2 id="floor-explorer-heading" className="floor-explorer-title mt-3 font-serif text-[clamp(2.2rem,4vw,3.4rem)]">
              Patru niveluri, o singură lodje
            </h2>
            <div className="mt-10 space-y-8">
              {FLOOR_NAV_STAGES.map((stage) => (
                <div key={stage.id}>
                  <p className="floor-explorer-kicker text-sm font-semibold">{stage.label}</p>
                  <p className="floor-explorer-body mt-2">{stage.description}</p>
                </div>
              ))}
            </div>
            <Link href="/camere" className="btn btn-sand fac-cta mt-10 inline-flex rounded-none">
              Vezi camerele
            </Link>
          </div>
          <Image
            src="/media/veltra-floor-explorer/posters/intro.webp"
            alt="Lodja VELTRA pe patru niveluri"
            width={1280}
            height={720}
            className="h-auto w-full"
          />
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} className="floor-explorer-pin-host" data-no-reveal>
    <section
      aria-labelledby="floor-explorer-heading"
      className="floor-explorer-section relative overflow-hidden md:min-h-[100svh]"
      style={{ backgroundColor: FLOOR_EXPLORER_MANIFEST.background }}
    >
      <div className="floor-explorer-edges pointer-events-none absolute inset-0" aria-hidden>
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
          <path
            d="M0 28 C360 78, 720 12, 1080 64 C1260 88, 1380 52, 1440 72"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="butt"
          />
          <path
            d="M0 860 C360 810, 720 882, 1080 828 C1260 804, 1380 848, 1440 820"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="butt"
          />
        </svg>
      </div>

      <div className="hero-shell relative grid grid-cols-1 items-start gap-8 py-12 pt-[calc(var(--header-h)+1rem)] pb-16 md:min-h-[100svh] md:content-center md:items-center md:gap-6 md:py-10 lg:grid-cols-[minmax(16rem,0.38fr)_minmax(0,0.62fr)] lg:gap-8 xl:gap-10">
        {/* Left: rail + stage copy — on mobile AFTER visual (order-2) */}
        <div className="order-2 flex min-h-0 flex-col justify-center lg:order-1">
          <p className="floor-explorer-kicker text-[0.8rem] font-semibold tracking-[0.22em] uppercase">
            Planul lodjei
          </p>
          <h2
            id="floor-explorer-heading"
            className="floor-explorer-title mt-2.5 font-serif text-[clamp(2rem,3.2vw,2.85rem)] leading-[1.05] text-balance"
          >
            Patru niveluri, de la mansardă la parter
          </h2>

          <ol className="mt-5 flex flex-wrap gap-2 md:hidden" aria-label="Niveluri lodje">
            {FLOOR_NAV_STAGES.map((stage) => {
              const current = active.id === stage.id;
              return (
                <li key={stage.id}>
                  <button
                    type="button"
                    aria-current={current ? "step" : undefined}
                    onClick={() => seekToStage(stage)}
                    className={cn(
                      "min-h-11 border px-3.5 text-[0.95rem]",
                      current
                        ? "border-[#C79D78] text-[#F4F1E9]"
                        : "border-[#F4F1E9]/2 text-[#F4F1E9]/5",
                    )}
                  >
                    {stage.label}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 flex min-h-0 gap-4 md:mt-8 lg:mt-9">
            <nav className="hidden shrink-0 flex-col justify-start gap-1 md:flex" aria-label="Niveluri lodje">
              {FLOOR_NAV_STAGES.map((stage) => {
                const current = active.id === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    aria-current={current ? "step" : undefined}
                    aria-label={`Mergi la ${stage.label}`}
                    onClick={() => seekToStage(stage)}
                    className={cn(
                      "group flex min-h-12 items-center gap-3 py-1.5 pl-1 pr-2 text-left transition",
                      current ? "text-[#F4F1E9]" : "text-[#F4F1E9]/42 hover:text-[#F4F1E9]/8",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center text-[0.72rem] font-serif tracking-wide transition",
                        current
                          ? "bg-[#C79D78]/18 text-[#C79D78]"
                          : "bg-[#F4F1E9]/6 group-hover:bg-[#F4F1E9]/10",
                      )}
                    >
                      {stage.mark}
                    </span>
                    <span className="text-[1.02rem] font-medium">{stage.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Flow layout (not absolute) so mobile never stacks overlapping text */}
            <div className="min-w-0 flex-1 border-l border-[#F4F1E9]/12 md:min-h-[19rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="relative px-5 py-1 sm:px-6"
                >
                  <p className="floor-explorer-kicker text-[0.76rem] font-semibold tracking-[0.18em] uppercase">
                    {active.label}
                  </p>
                  <h3 className="floor-explorer-title mt-2 font-serif text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.1] text-balance md:min-h-[2.6em]">
                    {active.headline}
                  </h3>
                  <p className="floor-explorer-body mt-3.5 max-w-[38ch] text-[1.08rem] leading-[1.65] md:min-h-[4.8em]">
                    {active.description}
                  </p>

                  <div className="mt-7">
                    <Button
                      href={active.ctaHref}
                      variant="sand"
                      arrow
                      className="fac-cta min-h-12 rounded-none px-6 text-[1rem]"
                    >
                      {active.ctaLabel}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right: lodge + rich floor brief */}
        <div className="order-1 flex w-full flex-col justify-center lg:order-2 lg:max-w-[44rem] lg:justify-self-end xl:max-w-[48rem]">
          <div className="relative aspect-[5/4] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-auto lg:h-[min(48svh,28rem)]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" width={1280} height={720} aria-hidden />
            {!ready ? (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#1a2e28]">
                <Image
                  src="/media/veltra-floor-explorer/posters/intro.webp"
                  alt=""
                  width={1280}
                  height={720}
                  className="h-full w-full object-contain opacity-90"
                  aria-hidden
                  priority
                />
              </div>
            ) : null}
            <p className="sr-only">
              Explorare interactivă: parter, etajul 1, etajul 2 și mansardă. Folosește derularea sau butoanele de nivel.
            </p>
          </div>

          <div className="relative mt-3 border-t border-[#F4F1E9]/14 pt-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`meta-${active.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative"
              >
                <p className="font-serif text-[1.3rem] leading-snug text-[#F4F1E9]/92 md:text-[1.4rem]">
                  <span className="mr-3 font-sans text-[0.78rem] tracking-[0.18em] text-[#C79D78] uppercase">
                    {active.mark}
                  </span>
                  {active.highlight}
                </p>

                <ul className="mt-5 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                  {active.spaces.map((space) => (
                    <li key={space.name} className="flex gap-3">
                      <span className="mt-0.5 text-[#C79D78]" aria-hidden>
                        <DetailIcon name={space.icon} />
                      </span>
                      <span>
                        <span className="block text-[1.05rem] font-medium text-[#F4F1E9]">{space.name}</span>
                        <span className="floor-explorer-detail mt-0.5 block text-[0.95rem] leading-snug">
                          {space.note}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="floor-explorer-detail mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[0.92rem] tracking-wide">
                  {active.facts.map((fact, i) => (
                    <span key={fact} className="inline-flex items-center gap-2.5">
                      {i > 0 ? <span className="text-[#C79D78]/55" aria-hidden>·</span> : null}
                      {fact}
                    </span>
                  ))}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
