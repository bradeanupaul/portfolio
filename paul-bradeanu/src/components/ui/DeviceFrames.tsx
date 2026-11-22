"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { isVideoSrc } from "@/data/projects";

type FrameMedia = {
  src: string;
  alt: string;
  /** Still shown until video is ready (or forever if video fails). */
  poster?: string;
  priority?: boolean;
};

/**
 * Video rect as % of 1024² device canvas.
 * Layers: device (bg removed) → video → frame overlay (bezel from original).
 * overscan expands the video under the bezel; keep it tiny on laptop —
 * too much and the video peeks outside the lid (frame is transparent there).
 */
type ScreenGeom = {
  left: string;
  top: string;
  width: string;
  height: string;
  radiusX: string;
  radiusY: string;
  /** Extra coverage under bezel, as % of the stage (not of the hole). */
  overscanX: number;
  overscanY: number;
  /**
   * When false, video stays square; a full-canvas mask (+ frame PNG)
   * defines the real corners. Laptop needs this — CSS ellipses miss the AA curve.
   */
  cssRadius: boolean;
  /** Full-stage alpha mask (white = show video), aligned to the 1024² canvas. */
  screenMaskSrc?: string;
};

const LAPTOP_SCREEN: ScreenGeom = {
  // Hole 136,254 – 896,710 on 1024²; corners from mask + laptop-frame.png
  left: "13.2812%",
  top: "24.8047%",
  width: "74.3164%",
  height: "44.6289%",
  radiusX: "0%",
  radiusY: "0%",
  overscanX: 0.18,
  overscanY: 0.18,
  cssRadius: false,
  screenMaskSrc: "/devices/laptop-screen-mask.png",
};

const PHONE_SCREEN: ScreenGeom = {
  left: "27.3438%",
  top: "1.9531%",
  width: "44.9219%",
  height: "96.0938%",
  radiusX: "11.7391%",
  radiusY: "5.4878%",
  overscanX: 0.55,
  overscanY: 0.45,
  cssRadius: true,
};

const ease = [0.22, 1, 0.36, 1] as const;

const MAX_PLAYING = 2;
const playing = new Set<HTMLVideoElement>();

function claimPlay(el: HTMLVideoElement) {
  if (playing.has(el)) {
    const p = el.play();
    if (p) p.catch(() => undefined);
    return;
  }
  while (playing.size >= MAX_PLAYING) {
    const [oldest] = playing;
    if (!oldest) break;
    oldest.pause();
    playing.delete(oldest);
  }
  playing.add(el);
  const p = el.play();
  if (p) p.catch(() => undefined);
}

function releasePlay(el: HTMLVideoElement) {
  el.pause();
  playing.delete(el);
}

function ScreenMedia({
  src,
  poster,
  alt,
  active,
  priority = false,
}: {
  src: string;
  poster?: string;
  alt: string;
  active: boolean;
  priority?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const video = isVideoSrc(src);
  const still = poster ?? (!video ? src : undefined);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setReady(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !video || failed) return;

    if (!active) {
      releasePlay(el);
      return;
    }

    if (el.dataset.src !== src) {
      el.src = src;
      el.dataset.src = src;
      el.load();
    }

    let cancelled = false;

    const markReady = () => {
      if (cancelled) return;
      setReady(true);
      claimPlay(el);
    };

    const markFailed = () => {
      if (cancelled) return;
      setFailed(true);
      setReady(false);
      releasePlay(el);
    };

    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      markReady();
    } else {
      el.addEventListener("loadeddata", markReady);
      el.addEventListener("canplay", markReady);
      el.addEventListener("error", markFailed);
    }

    return () => {
      cancelled = true;
      el.removeEventListener("loadeddata", markReady);
      el.removeEventListener("canplay", markReady);
      el.removeEventListener("error", markFailed);
      releasePlay(el);
    };
  }, [active, src, video, failed]);

  return (
    <>
      {still ? (
        // eslint-disable-next-line @next/next/no-img-element -- tiny screen fill; next/image layout fights absolute cover
        <img
          src={still}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
          draggable={false}
          decoding={priority ? "sync" : "async"}
          loading={priority ? "eager" : "lazy"}
          aria-hidden
        />
      ) : (
        <div className="absolute inset-0 bg-black" aria-hidden />
      )}

      {video && !failed ? (
        <video
          ref={ref}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top [transform:translateZ(0)] transition-opacity duration-300",
            ready ? "opacity-100" : "opacity-0",
          )}
          muted
          loop
          playsInline
          preload={active || priority ? "auto" : "none"}
          disableRemotePlayback
          aria-label={alt}
          poster={still}
        />
      ) : null}
    </>
  );
}

function DeviceStage({
  deviceSrc,
  frameSrc,
  screen,
  media,
  className,
  sizes,
  active,
  appearDelay = 0,
  appearFrom = "left",
}: {
  deviceSrc: string;
  frameSrc: string;
  screen: ScreenGeom;
  media: FrameMedia;
  className?: string;
  sizes: string;
  active: boolean;
  appearDelay?: number;
  appearFrom?: "left" | "right" | "up";
}) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const appeared = useInView(stageRef, {
    once: true,
    amount: 0.05,
    margin: "80px 0px",
  });

  const offset =
    appearFrom === "left"
      ? { x: -40, y: 20 }
      : appearFrom === "right"
        ? { x: 40, y: 20 }
        : { x: 0, y: 32 };

  const show = reduce || appeared;
  const ox = screen.overscanX;
  const oy = screen.overscanY;

  return (
    <motion.div
      ref={stageRef}
      className={cn("relative aspect-square w-full", className)}
      initial={reduce ? false : { opacity: 0, scale: 0.9, ...offset }}
      animate={
        show
          ? { opacity: 1, scale: 1, x: 0, y: 0 }
          : { opacity: 0, scale: 0.9, ...offset }
      }
      transition={{ duration: 0.75, delay: appearDelay, ease }}
    >
      {/* 1. Full mockup (bg removed; laptop screen punched black) */}
      <Image
        src={deviceSrc}
        alt=""
        fill
        sizes={sizes}
        unoptimized
        className="pointer-events-none absolute inset-0 z-0 select-none object-fill"
        priority={media.priority}
        aria-hidden
      />

      {/* 2. Still + video — optional full-canvas mask for pixel-perfect corners */}
      <div
        className="absolute inset-0 z-[1]"
        style={
          screen.screenMaskSrc
            ? {
                WebkitMaskImage: `url(${screen.screenMaskSrc})`,
                maskImage: `url(${screen.screenMaskSrc})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }
            : undefined
        }
      >
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            left: `calc(${screen.left} - ${ox}%)`,
            top: `calc(${screen.top} - ${oy}%)`,
            width: `calc(${screen.width} + ${ox * 2}%)`,
            height: `calc(${screen.height} + ${oy * 2}%)`,
            ...(screen.cssRadius
              ? { borderRadius: `${screen.radiusX} / ${screen.radiusY}` }
              : { borderRadius: 0 }),
          }}
        >
          <ScreenMedia
            src={media.src}
            poster={media.poster}
            alt={media.alt}
            active={active}
            priority={media.priority}
          />
        </div>
      </div>

      {/* 3. Real bezel overlay — covers overscan + metal AA */}
      <Image
        src={frameSrc}
        alt=""
        fill
        sizes={sizes}
        unoptimized
        className="pointer-events-none absolute inset-0 z-[2] select-none object-fill"
        priority={media.priority}
        aria-hidden
      />
    </motion.div>
  );
}

/** @deprecated no decorative stage */
export function ProjectAurora(_props: { accent: string }) {
  return null;
}

export function LaptopFrame({
  image,
  className,
  sizes = "(max-width: 1024px) 100vw, 58vw",
  active = true,
  appearDelay = 0,
  appearFrom = "left",
}: {
  image: FrameMedia;
  className?: string;
  sizes?: string;
  active?: boolean;
  appearDelay?: number;
  appearFrom?: "left" | "right" | "up";
}) {
  return (
    <DeviceStage
      deviceSrc="/devices/laptop-device.png?v=7"
      frameSrc="/devices/laptop-frame.png?v=7"
      screen={LAPTOP_SCREEN}
      media={image}
      className={className}
      sizes={sizes}
      active={active}
      appearDelay={appearDelay}
      appearFrom={appearFrom}
    />
  );
}

export function PhoneFrame({
  image,
  className,
  sizes = "280px",
  active = true,
  appearDelay = 0.14,
  appearFrom = "right",
}: {
  image: FrameMedia;
  className?: string;
  sizes?: string;
  active?: boolean;
  appearDelay?: number;
  appearFrom?: "left" | "right" | "up";
}) {
  return (
    <DeviceStage
      deviceSrc="/devices/phone-device.png"
      frameSrc="/devices/phone-frame.png"
      screen={PHONE_SCREEN}
      media={image}
      className={className}
      sizes={sizes}
      active={active}
      appearDelay={appearDelay}
      appearFrom={appearFrom}
    />
  );
}

export function useDeviceActive(amount = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, margin: "0px 0px -10% 0px" });
  return { ref, active: inView };
}
