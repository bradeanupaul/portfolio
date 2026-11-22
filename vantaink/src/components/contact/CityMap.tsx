const EMBED_SRC =
  "https://www.google.com/maps?q=Cluj-Napoca%2C%20Romania&z=13&output=embed";
const EXTERNAL_HREF =
  "https://www.google.com/maps/search/?api=1&query=Cluj-Napoca%2C%20Romania";

/**
 * Keyless Google Maps embed (Share → Embed form / q=…&output=embed).
 * Shown immediately — no click gate. City-level Cluj-Napoca only.
 */
export function CityMap() {
  return (
    <figure className="space-y-3">
      <div className="relative h-[260px] w-full overflow-hidden border border-line bg-surface-muted md:h-[360px] lg:h-[400px]">
        <iframe
          title="Hartă Google Maps: Cluj-Napoca"
          src={EMBED_SRC}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <figcaption className="space-y-2 text-sm text-text-muted">
        <p>
          Locație demonstrativă la nivel de oraș: Cluj-Napoca. Studioul VANTA INK
          este fictiv; nu există un pin de adresă comercială.
        </p>
        <a
          href={EXTERNAL_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono-ui text-xs uppercase tracking-[0.16em] text-accent no-underline hover:text-accent-hover"
        >
          Deschide în Google Maps
        </a>
      </figcaption>
    </figure>
  );
}
