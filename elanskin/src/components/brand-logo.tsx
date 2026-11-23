"use client";

import { cn } from "@/lib/utils";

/** Icon mark + ÉLAN SKIN wordmark. Light variant uses a lilac-white mark for dark surfaces. */
export function BrandLogo({
  variant = "default",
  className,
  alt = "ÉLAN SKIN",
  size = "nav",
}: {
  variant?: "default" | "light";
  className?: string;
  alt?: string;
  size?: "nav" | "footer";
}) {
  const light = variant === "light";
  const ink = light ? "#FAF9FC" : "#352344";
  const accent = light ? "#E8D5F0" : "#8463A1";
  const markW = size === "footer" ? 56 : 34;
  const titleClass = size === "footer" ? "text-[2.35rem]" : "text-[1.45rem]";
  const subClass =
    size === "footer" ? "text-[0.72rem] tracking-[0.46em]" : "text-[0.58rem] tracking-[0.4em]";
  const src = light
    ? "/assets/brand/logo-mark-light-v2.webp"
    : "/assets/brand/logo-mark.webp";

  return (
    <span
      className={cn("inline-flex items-center gap-3", className)}
      role="img"
      aria-label={alt}
    >
      {/* Plain img: small local mark; avoids next/image aspect-ratio warnings when CSS scales one axis. */}
      <img
        src={src}
        alt=""
        width={markW}
        height={Math.round(markW * 1.25)}
        className="shrink-0"
        style={{ width: markW, height: "auto" }}
        decoding="async"
        fetchPriority="low"
      />
      <span className="leading-none">
        <span className={cn("block font-display tracking-[0.04em]", titleClass)} style={{ color: ink }}>
          ÉLAN
        </span>
        <span className={cn("mt-0.5 block font-semibold", subClass)} style={{ color: accent }}>
          SKIN
        </span>
      </span>
    </span>
  );
}
