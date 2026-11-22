import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  Building2,
  Calendar,
  Car,
  Check,
  Ruler,
  Zap,
} from "lucide-react";
import { properties } from "@/data/properties";
import { getDistrictBySlug } from "@/data/districts";
import { PropertyMap } from "@/components/maps/PropertyMap";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { FavoriteButton } from "@/components/property/FavoriteButton";
import { ListingChip, PropertyCard } from "@/components/property/PropertyCard";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { ViewingRequestForm } from "@/components/property/ViewingRequestForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  getPropertyAgent,
  getPropertyBySlug,
  getPropertyCollections,
  getSimilarProperties,
} from "@/lib/properties";
import { formatArea, formatPrice } from "@/lib/utils";
import { listingStatusLabels, propertyCategoryLabels, transactionTypeLabels } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  return {
    title: property?.title ?? "Proprietate",
    description: property?.shortDescription,
  };
}


export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const agent = getPropertyAgent(property);
  const district = getDistrictBySlug(property.location);
  const collections = getPropertyCollections(property);
  const related = getSimilarProperties(property, 3);
  const paragraphs = property.description.split("\n\n").filter(Boolean);
  const nearby = properties.filter((item) => item.location === property.location);
  const viewingHref = `/programeaza-vizionare?proprietate=${property.slug}`;

  const facts = [
    { icon: Ruler, label: "Suprafață", value: formatArea(property.areaSqm) },
    property.usableAreaSqm
      ? { icon: Ruler, label: "Suprafață utilă", value: formatArea(property.usableAreaSqm) }
      : null,
    { icon: Building2, label: "Camere", value: String(property.rooms) },
    { icon: BedDouble, label: "Dormitoare", value: String(property.bedrooms) },
    { icon: Bath, label: "Băi", value: String(property.bathrooms) },
    property.floor != null
      ? {
          icon: Building2,
          label: "Etaj",
          value: property.totalFloors
            ? `${property.floor} din ${property.totalFloors}`
            : String(property.floor),
        }
      : property.totalFloors
        ? { icon: Building2, label: "Niveluri", value: String(property.totalFloors) }
        : null,
    { icon: Car, label: "Parcare", value: String(property.parking) },
    { icon: Calendar, label: "An", value: String(property.yearBuilt) },
    property.energyRating
      ? { icon: Zap, label: "Energie", value: property.energyRating }
      : null,
  ].filter((item): item is { icon: typeof Ruler; label: string; value: string } => Boolean(item));

  return (
    <article className="bg-white pb-24 lg:pb-0">
      <header className="bg-ice pt-[var(--header-height)]">
        <Container className="py-7 md:py-9">
          <div className="flex items-start justify-between gap-4">
            <Reveal>
              <div className="flex flex-wrap gap-2">
                <ListingChip
                  label={listingStatusLabels[property.status]}
                  tone={
                    property.status === "vandut"
                      ? "coral"
                      : property.status === "rezervat"
                        ? "teal"
                        : "quiet"
                  }
                />
                {property.badges[0] ? (
                  <ListingChip
                    label={property.badges[0]}
                    tone={property.status === "disponibil" ? "teal" : "quiet"}
                  />
                ) : null}
              </div>
            </Reveal>
            <FavoriteButton id={property.id} className="shrink-0" />
          </div>
          <Reveal delay={0.06}>
            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">
              {property.location}, {property.city} · {propertyCategoryLabels[property.category]}
            </p>
          </Reveal>
          <div className="mt-3 grid items-end gap-4 lg:grid-cols-12">
            <RevealHeading
              as="h1"
              priority
              className="font-display text-[clamp(2rem,3.4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink lg:col-span-8"
            >
              {property.title}
            </RevealHeading>
            <Reveal delay={0.1} className="lg:col-span-4 lg:text-right">
              <p className="font-display text-3xl font-bold text-ink">
                {formatPrice(property.priceEur, property.transactionType)}
              </p>
              <p className="mt-2 text-sm text-slate">
                {transactionTypeLabels[property.transactionType]} · {formatArea(property.areaSqm)}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">{property.shortDescription}</p>
          </Reveal>
        </Container>
      </header>

      <Container className="py-6 md:py-8">
        <PropertyGallery images={property.images} title={property.title} />
      </Container>

      <Container className="pb-12 md:pb-16">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Prezentare</p>
              <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-slate">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
          <aside className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-height)+1.25rem)] rounded-[20px] bg-white p-7 shadow-[0_18px_48px_rgba(12,23,40,0.08)]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">
                {listingStatusLabels[property.status]} · {transactionTypeLabels[property.transactionType]}
              </p>
              <p className="mt-3 font-display text-4xl font-bold text-ink">
                {formatPrice(property.priceEur, property.transactionType)}
              </p>
              <p className="mt-3 text-slate">
                {property.location}, {property.city}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate">{property.shortDescription}</p>
              <p className="mt-4 text-sm text-slate">
                {formatArea(property.areaSqm)} · {property.bedrooms}{" "}
                {property.bedrooms === 1 ? "dormitor" : "dormitoare"} · {property.bathrooms}{" "}
                {property.bathrooms === 1 ? "baie" : "băi"}
              </p>
              {collections.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {collections.map((collection) => (
                    <li key={collection.id}>
                      <Link
                        href={`/colectii/${collection.slug}`}
                        className="rounded-full bg-ice px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-soft-blue"
                      >
                        {collection.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-7 flex flex-col gap-3">
                {property.status === "vandut" ? (
                  <Button href="/proprietati" variant="secondary">
                    Înapoi la proprietăți
                  </Button>
                ) : (
                  <Button href={viewingHref} variant="cobalt">
                    Programează o vizionare
                  </Button>
                )}
                {agent ? (
                  <Button href={`tel:${agent.phone.replace(/\s/g, "")}`} variant="secondary">
                    {agent.phone}
                  </Button>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </Container>

      <section className="bg-ice">
        <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">Fapte</h2>
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.label} className="rounded-[14px] bg-white p-4 shadow-[0_8px_22px_rgba(17,31,53,0.05)]">
                    <Icon className="h-4 w-4 text-cobalt" aria-hidden />
                    <dt className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-lg text-ink">{fact.value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
              Ce se observă la vizionare
            </h2>
            <ul className="mt-6 grid gap-2">
              {property.features.map((feature) => (
                <li key={feature} className="rounded-[12px] bg-white px-4 py-3 text-sm text-ink shadow-[0_8px_22px_rgba(17,31,53,0.04)]">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 md:py-16">
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">Amenajări</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {property.amenities.map((amenity) => (
              <li key={amenity} className="flex items-start gap-3 rounded-[14px] bg-ice px-4 py-3 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" aria-hidden />
                {amenity}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-midnight text-white">
        <Container className="grid items-start gap-8 py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-sky">Cartier</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl">
              {property.location}
            </h2>
            <p className="mt-4 leading-relaxed text-white/75">
              {district
                ? district.shortDescription
                : `${property.location} face parte din zonele în care lucrăm. Poziția de pe hartă este aproximativă.`}
            </p>
            {district ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {district.highlights.map((highlight) => (
                  <li key={highlight} className="rounded-full bg-white/10 px-3 py-2 text-sm text-white">
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="overflow-hidden rounded-[16px] bg-white p-2 text-ink shadow-[0_16px_40px_rgba(0,0,0,0.18)] lg:col-span-8">
            <PropertyMap
              activeId={property.id}
              properties={nearby.map((item) => ({
                id: item.id,
                slug: item.slug,
                title: item.title,
                location: item.location,
                lat: item.lat,
                lng: item.lng,
                priceLabel: formatPrice(item.priceEur, item.transactionType),
              }))}
            />
          </div>
        </Container>
      </section>

      {agent ? (
        <section className="bg-white">
          <Container className="py-12 md:py-16">
            <div className="grid items-center gap-8 overflow-hidden rounded-[20px] bg-ice shadow-[0_16px_40px_rgba(12,23,40,0.06)] lg:grid-cols-12">
              <div className="relative min-h-[280px] lg:col-span-4 lg:min-h-[360px]">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="px-6 py-8 sm:px-8 lg:col-span-8 lg:py-10">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Consultant</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
                  <Link href={`/echipa/${agent.slug}`} className="transition-colors hover:text-cobalt">
                    {agent.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-slate">{agent.role}</p>
                <blockquote className="mt-5 max-w-xl font-display text-2xl font-semibold leading-snug text-ink">
                  {agent.quote}
                </blockquote>
                <p className="mt-5">
                  <a href={`tel:${agent.phone.replace(/\s/g, "")}`} className="font-semibold text-ink">
                    {agent.phone}
                  </a>
                </p>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-soft-blue">
        <Container className="grid items-start gap-8 py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Vizionare</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
              Programează o vizionare
            </h2>
            <p className="mt-4 leading-relaxed text-slate">
              Vizionarea se face cu programare, la o oră în care lumina ajută casa. Formularul salvează
              cererea în demonstrație.
            </p>
          </div>
          <div className="lg:col-span-8">
            {property.status === "vandut" ? (
              <p className="rounded-[16px] bg-white px-6 py-8 text-slate shadow-[0_12px_32px_rgba(17,31,53,0.06)]">
                Proprietatea este marcată vândută și nu mai poate fi vizionată. Rămâne în arhivă ca
                referință.
              </p>
            ) : (
              <div className="rounded-[20px] bg-white p-5 shadow-[0_18px_48px_rgba(12,23,40,0.08)] sm:p-7">
                <ViewingRequestForm
                  propertyId={property.id}
                  propertySlug={property.slug}
                  reserved={property.status === "rezervat"}
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="bg-white">
          <Container className="py-12 md:py-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">În apropiere</p>
            <RevealHeading as="h2" className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
              Proprietăți apropiate
            </RevealHeading>
            <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-40 bg-white px-5 py-3 shadow-[0_-10px_30px_rgba(12,23,40,0.08)] lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-ink">
            {formatPrice(property.priceEur, property.transactionType)}
          </p>
          {property.status === "vandut" ? (
            <Button href="/proprietati" variant="secondary">
              Portofoliu
            </Button>
          ) : (
            <Button href={viewingHref} variant="cobalt">
              Programează
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
