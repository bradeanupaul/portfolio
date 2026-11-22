"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getFavoriteIds, subscribeFavorites } from "@/lib/favorites";
import { getPropertyById } from "@/lib/properties";
import type { Property } from "@/types";

export function FavoritesList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const apply = (ids: string[]) => {
      setProperties(
        ids
          .map((id) => getPropertyById(id))
          .filter((property): property is Property => Boolean(property)),
      );
      setReady(true);
    };

    apply(getFavoriteIds());
    return subscribeFavorites(apply);
  }, []);

  if (!ready) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="aspect-[3/2] animate-pulse rounded-[16px] bg-ice motion-reduce:animate-none" />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="rounded-[18px] bg-cloud px-6 py-16 md:px-12 md:py-20">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-azure">Salvate</p>
          <p className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">
            Încă nu ați păstrat o adresă.
          </p>
          <p className="mt-4 max-w-lg leading-relaxed text-slate">
            Inima de pe o proprietate o salvează în acest browser. Lista rămâne doar la dumneavoastră.
          </p>
          <Link href="/proprietati" className="mt-8 inline-block rounded-[12px] bg-azure px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-azure-hover">
            Explorează proprietățile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
