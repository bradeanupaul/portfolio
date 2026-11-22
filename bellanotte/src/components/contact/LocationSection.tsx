import { MapPinned, Navigation } from "lucide-react";
import { BellaNotteMap } from "@/components/maps/BellaNotteMap";
import { restaurant } from "@/data/restaurant";

export function LocationSection() {
  return (
    <section
      aria-labelledby="locatie-heading"
      className="space-y-5 border border-bn-border bg-bn-bg-elevated p-5 sm:p-7"
    >
      <h2
        id="locatie-heading"
        className="flex items-center gap-2 font-display text-2xl text-bn-heading sm:text-3xl"
      >
        <MapPinned className="size-5 text-bn-gold" aria-hidden />
        Unde ne găsiți
      </h2>
      <p className="flex items-start gap-2 text-base text-bn-text-muted">
        <Navigation className="mt-0.5 size-4 shrink-0 text-bn-gold" aria-hidden />
        <span>
          {restaurant.address.street}, {restaurant.address.postalCode} {restaurant.address.city},{" "}
          {restaurant.address.country}
        </span>
      </p>
      <p className="text-sm text-bn-text-dim">
        Adresă fictivă pentru portofoliu. Harta interactivă de mai jos marchează o locație
        ilustrativă în Cluj Napoca, fără cheie Google Maps.
      </p>
      <BellaNotteMap
        heightClassName="aspect-[16/10] min-h-[240px] max-h-[420px] sm:min-h-[300px]"
        zoom={15}
      />
    </section>
  );
}