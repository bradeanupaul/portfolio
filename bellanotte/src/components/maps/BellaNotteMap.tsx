import { restaurant } from "@/data/restaurant";
import { DEMO_MAP_CENTER } from "@/lib/maps-style";
import { cn } from "@/lib/utils";

type BellaNotteMapProps = {
  className?: string;
  heightClassName?: string;
  zoom?: number;
};

/**
 * Interactive Google Maps embed without an API key.
 * Standard iframe embed. Custom JS map styles are not available on this path.
 */
export function BellaNotteMap({
  className,
  heightClassName = "aspect-[16/10] min-h-[260px] sm:min-h-[340px] lg:min-h-[400px]",
  zoom = 14,
}: BellaNotteMapProps) {
  const query = encodeURIComponent(
    `${DEMO_MAP_CENTER.lat},${DEMO_MAP_CENTER.lng}`,
  );
  const src = `https://maps.google.com/maps?q=${query}&z=${zoom}&hl=ro&output=embed`;

  return (
    <figure
      className={cn(
        "overflow-hidden border border-bn-border bg-bn-bg-surface",
        heightClassName,
        className,
      )}
    >
      <div className="relative h-full min-h-[inherit] w-full">
        <iframe
          title={`Hartă ilustrativă Bella Notte în ${restaurant.address.city}`}
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
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
