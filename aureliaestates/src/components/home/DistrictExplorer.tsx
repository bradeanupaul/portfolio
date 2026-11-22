"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { districts } from "@/data/districts";
import { properties } from "@/data/properties";
import { PropertyMap } from "@/components/maps/PropertyMap";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function DistrictExplorer() {
  const [activeSlug, setActiveSlug] = useState(districts[0]?.slug ?? "herastrau");
  const active = districts.find((district) => district.slug === activeSlug) ?? districts[0];

  const matches = useMemo(() => {
    if (!active) return [];
    return properties
      .filter(
        (property) =>
          property.location.toLowerCase().includes(active.name.toLowerCase()) ||
          property.location === active.name,
      )
      .slice(0, 4);
  }, [active]);

  const mapProperties = useMemo(
    () =>
      (matches.length ? matches : properties.slice(0, 8)).map((property) => ({
        id: property.id,
        slug: property.slug,
        title: property.title,
        location: property.location,
        lat: property.lat,
        lng: property.lng,
        priceLabel: formatPrice(property.priceEur, property.transactionType),
      })),
    [matches],
  );

  if (!active) return null;

  return (
    <div className="mt-10 grid max-w-full gap-6 overflow-x-clip lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-4">
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {districts.map((district) => (
            <button
              key={district.slug}
              type="button"
              onClick={() => setActiveSlug(district.slug)}
              className={cn(
                "min-h-11 shrink-0 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                activeSlug === district.slug
                  ? "bg-azure text-white"
                  : "bg-white text-ink shadow-[0_1px_0_rgba(17,30,48,0.08)] hover:bg-ice",
              )}
            >
              {district.name}
            </button>
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-slate">{active.shortDescription}</p>
        <ul className="mt-6 space-y-3">
          {matches.map((property) => (
            <li key={property.id}>
              <Link
                href={`/proprietati/${property.slug}`}
                className="group grid grid-cols-[88px_1fr] gap-3 rounded-2xl bg-white p-2 shadow-[0_1px_0_rgba(17,30,48,0.08)] transition-shadow hover:shadow-[0_12px_30px_rgba(17,30,48,0.08)]"
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-cloud">
                  <Image
                    src={property.images[0]}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="py-1 pr-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                    {property.location}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug text-ink">{property.title}</p>
                  <p className="mt-1 text-sm text-azure">
                    {formatPrice(property.priceEur, property.transactionType)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          {matches.length === 0 ? (
            <li className="rounded-2xl bg-white px-4 py-6 text-sm text-slate">
              Nu există încă listări în această zonă în catalogul demo.
            </li>
          ) : null}
        </ul>
      </div>
      <div className="min-w-0 overflow-hidden rounded-[22px] bg-white p-2 shadow-[0_16px_40px_rgba(17,30,48,0.08)] lg:col-span-8">
        <PropertyMap properties={mapProperties} className="min-h-[360px] overflow-hidden rounded-[18px]" />
      </div>
    </div>
  );
}
