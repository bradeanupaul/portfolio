import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/property/FavoriteButton";
import { cn, formatArea, formatPrice } from "@/lib/utils";
import { listingStatusLabels, type ListingStatus, type Property } from "@/types";

function bedroomLabel(count: number) {
  return count === 1 ? "1 dormitor" : `${count} dormitoare`;
}

const chipTones = {
  quiet: "bg-white/92 text-ink shadow-[0_8px_20px_rgba(12,23,40,0.1)] backdrop-blur-md",
  teal: "bg-cobalt text-white",
  coral: "bg-ink text-white",
} as const;

export function ListingChip({
  label,
  tone = "quiet",
  className,
}: {
  label: string;
  tone?: keyof typeof chipTones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[8px] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]",
        chipTones[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}

function toneForStatus(status: ListingStatus): keyof typeof chipTones {
  if (status === "vandut") return "coral";
  if (status === "rezervat") return "teal";
  return "quiet";
}

const imageMotion =
  "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

const frame = "relative aspect-[3/2] overflow-hidden rounded-[16px] bg-ice shadow-soft";

export function PropertyCard({
  property,
  variant = "portrait",
  index,
}: {
  property: Property;
  variant?: "feature" | "portrait" | "compact" | "list";
  index?: string;
}) {
  const image = property.images[0];
  const chip =
    property.status === "disponibil"
      ? property.badges[0]
      : listingStatusLabels[property.status];
  const chipTone = toneForStatus(property.status);
  const meta = `${formatPrice(property.priceEur, property.transactionType)} · ${formatArea(property.areaSqm)} · ${bedroomLabel(property.bedrooms)}`;
  const href = `/proprietati/${property.slug}`;

  if (variant === "feature") {
    return (
      <article className="group relative">
        <Link href={href} className="block">
          <div className={frame}>
            {image ? (
              <Image
                src={image}
                alt={property.title}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className={imageMotion}
              />
            ) : null}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-midnight/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
              {index ? (
                <p className="font-display text-3xl font-bold text-white/40">{index}</p>
              ) : null}
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                {property.location}
              </p>
              <h3 className="mt-2 max-w-xl font-display text-3xl font-bold leading-[1.05] text-white">
                {property.title}
              </h3>
              <p className="mt-3 text-sm text-white/85">{meta}</p>
            </div>
            {chip ? (
              <ListingChip label={chip} tone={chipTone} className="absolute left-4 top-4" />
            ) : null}
          </div>
        </Link>
        <FavoriteButton id={property.id} className="absolute right-4 top-4 z-10" />
      </article>
    );
  }

  if (variant === "list") {
    return (
      <article className="group relative grid gap-5 rounded-[18px] bg-white p-3 shadow-soft sm:grid-cols-12 sm:items-center sm:gap-6 sm:p-4">
        <div className="relative sm:col-span-5">
          <Link href={href} className="block">
            <div className={frame}>
              {image ? (
                <Image
                  src={image}
                  alt={property.title}
                  fill
                  sizes="(min-width: 640px) 40vw, 100vw"
                  className={imageMotion}
                />
              ) : null}
              {chip ? (
                <ListingChip label={chip} tone={chipTone} className="absolute left-3 top-3" />
              ) : null}
            </div>
          </Link>
          <FavoriteButton id={property.id} className="absolute right-3 top-3 z-10" />
        </div>
        <div className="px-2 pb-2 sm:col-span-7 sm:px-2 sm:py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cobalt">
            {property.location}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
            <Link href={href} className="transition-colors hover:text-cobalt">
              {property.title}
            </Link>
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate">{property.shortDescription}</p>
          <p className="mt-4 text-sm font-medium text-ink">{meta}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative">
      <Link href={href} className="block">
        <div className={frame}>
          {image ? (
            <Image
              src={image}
              alt={property.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className={imageMotion}
            />
          ) : null}
          {chip ? (
            <ListingChip label={chip} tone={chipTone} className="absolute left-3 top-3" />
          ) : null}
        </div>
        <div className="pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cobalt">
              {property.location}
            </p>
            {index ? <p className="font-display text-xl font-bold text-slate">{index}</p> : null}
          </div>
          <h3 className="mt-2 font-display text-[1.35rem] font-bold leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-cobalt">
            {property.title}
          </h3>
          <p className="mt-2 text-sm text-slate">{meta}</p>
        </div>
      </Link>
      <FavoriteButton id={property.id} className="absolute right-3 top-3 z-10" />
    </article>
  );
}
