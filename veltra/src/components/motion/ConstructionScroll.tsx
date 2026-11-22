"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

const STAGES = [
  {
    title: "Un weekend doar pentru tine.",
    copy: "Lasă orașul în urmă și descoperă liniștea muntelui.",
    tag: "Refugiu în natură",
    href: "/despre-noi",
    cta: "Descoperă VELTRA",
  },
  {
    title: "Dimineți cu priveliști care îți taie respirația.",
    copy: "Camere calde, cafea pe terasă și munții chiar în fața ta.",
    tag: "Camere și suite",
    href: "/camere",
    cta: "Vezi camerele",
  },
  {
    title: "Relaxare la temperatura perfectă.",
    copy: "Piscină încălzită, ciubăr sub cerul liber și seri fără grabă.",
    tag: "Piscină și ciubăr",
    href: "/facilitati",
    cta: "Descoperă facilitățile",
  },
  {
    title: "Amintiri care rămân.",
    copy: "Grătar cu cei dragi, drumeții și seri lângă foc.",
    tag: "Experiențe și gastronomie",
    href: "/experiente",
    cta: "Vezi experiențele",
  },
] as const;

type Manifest = { frameCount: number; format: string };

function frameSrc(index: number, format: string) {
  return `/animation/frames/frame_${String(index).padStart(4, "0")}.${format}`;
}

export function ConstructionScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/animation/manifest.json")
      .then((r) => r.json())
      .then((data: Manifest) => {
        if (!cancelled) setManifest(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!manifest || reduced) return;
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    const total = manifest.frameCount;
    const mark = () => {
      loaded += 1;
      if (loaded >= Math.min(12, total) && !cancelled) setReady(true);
      if (loaded >= total && canvasRef.current) {
        const last = images[images.length - 1];
        if (last) drawFrame(canvasRef.current, last);
      }
    };
    for (let i = 0; i < total; i++) {
      const img = new window.Image();
      img.src = frameSrc(i, manifest.format);
      img.onload = mark;
      img.onerror = mark;
      images.push(img);
    }
    imagesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, [manifest, reduced]);

  useEffect(() => {
    if (!manifest || !ready || reduced || failed) return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = { frame: 0 };
    const max = manifest.frameCount - 1;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => (window.innerWidth < 768 ? "+=130%" : "+=180%"),
      pin: true,
      scrub: 0.28,
      anticipatePin: 1,
      onUpdate: (self) => {
        const frame = Math.round(self.progress * max);
        ctx.frame = frame;
        const img = imagesRef.current[frame];
        if (img?.complete) drawFrame(canvas, img);
        setStage(Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length)));
      },
    });

    const onResize = () => {
      const img = imagesRef.current[ctx.frame];
      if (img) drawFrame(canvas, img);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    return () => {
      trigger.kill(true);
      window.removeEventListener("resize", onResize);
    };
  }, [manifest, ready, reduced, failed]);

  const current = STAGES[stage]!;

  if (reduced || failed) {
    return (
      <section className="section-pad bg-ivory">
        <div className="container-editorial grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-clay uppercase">La VELTRA</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] text-pine">{STAGES[3]!.title}</h2>
            <p className="mt-4 text-ink/75">{STAGES[3]!.copy}</p>
            <Link href="/camere" className="btn btn-pine mt-8 inline-flex">
              Vezi camerele
            </Link>
          </div>
          <Image src="/animation/poster.webp" alt="Lodja VELTRA" width={1280} height={720} className="h-auto w-full" />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-ivory" aria-label="Momente de la VELTRA">
      <div className="container-editorial flex min-h-[100svh] flex-col justify-center gap-8 py-16 lg:grid lg:grid-cols-[0.95fr_1.15fr] lg:items-center lg:gap-12">
        <div className="order-2 max-w-xl lg:order-1">
          <p className="text-xs font-semibold tracking-[0.2em] text-clay uppercase">{current.tag}</p>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3.3rem)] text-pine text-balance">{current.title}</h2>
          <p className="mt-4 text-ink/75">{current.copy}</p>
          <Link href={current.href} className="btn btn-pine mt-7 inline-flex">
            {current.cta}
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-stone">
              <div
                className="h-px bg-clay transition-all duration-300"
                style={{ width: `${((stage + 1) / STAGES.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-ink/55">
              {String(stage + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="order-1 relative w-full lg:order-2">
          <canvas ref={canvasRef} className="mx-auto block h-auto w-full" width={1280} height={720} aria-hidden={!ready} />
          {!ready ? (
            <div className="absolute inset-0">
              <Image src="/animation/blueprint.webp" alt="" width={1280} height={720} className="h-auto w-full opacity-90" aria-hidden />
            </div>
          ) : null}
          <p className="sr-only">
            Secvență vizuală sincronizată cu derularea, alături de motive pentru un sejur la VELTRA.
          </p>
        </div>
      </div>
    </section>
  );
}

function drawFrame(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !img.naturalWidth) return;
  const ratio = img.naturalWidth / img.naturalHeight;
  const width = Math.round(canvas.clientWidth || 1280);
  const height = Math.round(width / ratio);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
}
