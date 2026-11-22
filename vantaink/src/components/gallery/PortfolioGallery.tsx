"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { artists } from "@/data/artists";
import { styles } from "@/data/styles";
import { works } from "@/data/works";
import { Button } from "@/components/ui/Button";
import { Lightbox } from "@/components/gallery/Lightbox";
import { PortfolioFilters } from "@/components/gallery/PortfolioFilters";
import { PortfolioGrid } from "@/components/gallery/PortfolioGrid";
import {
  filterWorks,
  parseFilterParams,
  serializeFilterParams,
  type FilterGroup,
} from "@/lib/filters";
import type { Work, WorkFilters } from "@/types/content";

const allWorks: Work[] = [...works];

const artistOptions = artists.map((a) => ({ slug: a.slug, name: a.name }));
const artistNames = Object.fromEntries(artists.map((a) => [a.slug, a.name]));
const styleNames = Object.fromEntries(styles.map((s) => [s.slug, s.name]));

const placements = Array.from(new Set(allWorks.map((w) => w.placement))).sort((a, b) =>
  a.localeCompare(b, "ro"),
);

function toggleInList(values: string[] | undefined, value: string): string[] | undefined {
  const current = values ?? [];
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
  return next.length ? next : undefined;
}

export function PortfolioGallery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseFilterParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const filteredWorks = useMemo(() => filterWorks(allWorks, filters), [filters]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxOpen = lightboxIndex !== null;
  const routeKey = `${pathname}?${searchParams.toString()}`;

  const pushFilters = useCallback(
    (next: WorkFilters) => {
      setLightboxIndex(null);
      const query = serializeFilterParams(next);
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const onToggle = useCallback(
    (group: FilterGroup, value: string) => {
      const next: WorkFilters = { ...filters };
      if (group === "styles") next.styles = toggleInList(filters.styles, value);
      if (group === "artists") next.artists = toggleInList(filters.artists, value);
      if (group === "placements") {
        next.placements = toggleInList(filters.placements, value);
      }
      if (group === "scales") {
        next.scales = toggleInList(filters.scales, value) as WorkFilters["scales"];
      }
      pushFilters(next);
    },
    [filters, pushFilters],
  );

  const onSetFilters = useCallback(
    (next: WorkFilters) => {
      pushFilters(next);
    },
    [pushFilters],
  );

  const onClear = useCallback(() => {
    pushFilters({});
  }, [pushFilters]);

  const openPreview = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closePreview = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <div className="space-y-8 md:space-y-10">
      <PortfolioFilters
        allWorks={allWorks}
        filters={filters}
        styles={styles}
        artists={artistOptions}
        placements={placements}
        onToggle={onToggle}
        onSetFilters={onSetFilters}
        onClear={onClear}
        resultCount={filteredWorks.length}
        totalCount={allWorks.length}
      />

      {filteredWorks.length === 0 ? (
        <EmptyFiltersState onClear={onClear} />
      ) : (
        <PortfolioGrid
          works={filteredWorks}
          artistNames={artistNames}
          styleNames={styleNames}
          onPreview={openPreview}
        />
      )}

      <Lightbox
        key={routeKey}
        works={filteredWorks}
        index={lightboxIndex ?? 0}
        open={lightboxOpen}
        onClose={closePreview}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}

function EmptyFiltersState({ onClear }: { onClear: () => void }) {
  return (
    <div
      role="status"
      className="border border-line bg-surface px-6 py-16 text-center"
    >
      <p className="font-display text-2xl uppercase text-text md:text-3xl">
        Nicio lucrare la aceste filtre
      </p>
      <p className="mx-auto mt-3 max-w-md text-text-muted">
        Modificați selecția sau reveniți la întreaga galerie pentru a vedea toate piesele din
        catalogul demonstrativ.
      </p>
      <Button type="button" variant="secondary" className="mt-8" onClick={onClear}>
        Resetează filtrele
      </Button>
    </div>
  );
}