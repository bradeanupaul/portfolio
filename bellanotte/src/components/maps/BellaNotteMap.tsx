"use client";

import { useEffect, useRef, useState } from "react";
import { restaurant } from "@/data/restaurant";
import { DEMO_MAP_CENTER } from "@/lib/maps-style";
import { cn } from "@/lib/utils";

type BellaNotteMapProps = {
  className?: string;
  heightClassName?: string;
  zoom?: number;
};

/**
 * Google Maps embed facade — iframe src is set only when near the viewport,
 * so PageSpeed doesn't download Maps JS on first paint.
 */
export function BellaNotteMap({
  className,
  heightClassName = "aspect-[16/10] min-h-[260px] sm:min-h-[340px] lg:min-h-[400px]",
  zoom = 14,
}: BellaNotteMapProps) {
  const query = encodeURIComponent(`${DEMO_MAP_CENTER.lat},${DEMO_MAP_CENTER.lng}`);
  const src = `https://maps.google.com/maps?q=${query}&z=${zoom}&hl=ro&output=embed`;
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || active) return;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  return (
    <figure
      className={cn(
        "overflow-hidden border border-bn-border bg-bn-bg-surface",
        heightClassName,
        className,
      )}
    >
      <div ref={hostRef} className="relative h-full min-h-[inherit] w-full">
        {active ? (
          <iframe
            title={`Hartă ilustrativă Bella Notte în ${restaurant.address.city}`}
            src={src}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,rgba(216,175,91,0.12),transparent_55%),linear-gradient(160deg,#1a1612,#0e0c0a)]"
            aria-hidden
          />
        )}
        <figcaption className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[min(22rem,90%)] space-y-1 bg-bn-bg/85 px-3 py-2 backdrop-blur-sm">
          <p className="font-display text-base text-bn-heading">{restaurant.name}</p>
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[#F8F5EE]">
            Ristorante Italiano
          </p>
          <p className="text-xs text-bn-text-muted">
            Locație ilustrativă în Cluj Napoca. Restaurant fictiv pentru portofoliu.
          </p>
        </figcaption>
      </div>
    </figure>
  );
}
