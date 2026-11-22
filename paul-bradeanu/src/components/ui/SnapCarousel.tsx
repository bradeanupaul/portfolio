"use client";

import {
  Children,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type SnapCarouselProps = {
  children: ReactNode;
  trackClassName?: string;
  slideClassName?: string;
  dotsHideFrom?: "md" | "lg" | "xl";
  className?: string;
  ariaLabel?: string;
};

export function SnapCarousel({
  children,
  trackClassName,
  slideClassName,
  dotsHideFrom = "lg",
  className,
  ariaLabel = "Carusel",
}: SnapCarouselProps) {
  const items = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const labelId = useId();

  const getSlides = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [] as HTMLElement[];
    return Array.from(track.querySelectorAll<HTMLElement>("[data-snap-slide]"));
  }, []);

  const syncActive = useCallback(() => {
    const track = trackRef.current;
    const slides = getSlides();
    if (!track || !slides.length) return;

    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    slides.forEach((slide, index) => {
      const center = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });
    setActive((prev) => (prev === best ? prev : best));
  }, [getSlides]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    syncActive();
    track.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      track.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [syncActive, items.length]);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    const slides = getSlides();
    const slide = slides[index];
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  const dotsHidden =
    dotsHideFrom === "md"
      ? "md:hidden"
      : dotsHideFrom === "xl"
        ? "xl:hidden"
        : "lg:hidden";

  return (
    <div className={cn("relative", className)} aria-labelledby={labelId}>
      <span id={labelId} className="sr-only">
        {ariaLabel}
      </span>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        className={cn(
          "mobile-snap-track flex gap-3 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory scroll-px-3 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden sm:gap-4 sm:scroll-px-4",
          trackClassName,
        )}
      >
        {items.map((child, index) => (
          <div
            key={index}
            data-snap-slide
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} din ${items.length}`}
            className={cn(
              "mobile-snap-slide w-[min(calc(100vw-2rem),340px)] shrink-0 snap-center [&>*]:h-full",
              slideClassName,
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {items.length > 1 ? (
        <div
          className={cn(
            "mt-4 flex items-center justify-center gap-1.5 md:mt-5",
            dotsHidden,
          )}
          role="tablist"
          aria-label="Navigare carusel"
        >
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`Slide ${index + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                active === index
                  ? "w-5 bg-[var(--accent)]"
                  : "w-1.5 bg-[var(--text-muted)]/40 hover:bg-[var(--text-muted)]/65",
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
