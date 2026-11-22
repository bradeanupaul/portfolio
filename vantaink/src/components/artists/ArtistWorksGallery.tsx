"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Work, WorkScale } from "@/types/content";
import { styles as styleCatalog } from "@/data/styles";
import { filterWorks } from "@/lib/filters";
import { SmartImage } from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";

const styleLabels = new Map<string, string>(
  styleCatalog.map((s) => [s.slug, s.name]),
);

const layoutByArtist: Record<string, string[]> = {
  "alex-muresan": [
    "md:col-span-7 md:row-span-2 min-h-[280px] md:min-h-[360px]",
    "md:col-span-5 min-h-[220px]",
    "md:col-span-4 min-h-[200px]",
    "md:col-span-4 min-h-[200px]",
    "md:col-span-4 min-h-[200px]",
  ],
  "mara-ionescu": [
    "md:col-span-5 md:row-span-2 min-h-[280px] md:min-h-[340px]",
    "md:col-span-7 min-h-[200px]",
    "md:col-span-6 min-h-[200px]",
    "md:col-span-6 min-h-[200px]",
    "md:col-span-12 min-h-[180px]",
  ],
  "david-radu": [
    "md:col-span-8 min-h-[220px]",
    "md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-[340px]",
    "md:col-span-5 min-h-[200px]",
    "md:col-span-3 min-h-[200px]",
    "md:col-span-4 min-h-[200px]",
  ],
  "iris-pavel": [
    "md:col-span-6 min-h-[220px]",
    "md:col-span-6 min-h-[220px]",
    "md:col-span-4 min-h-[200px]",
    "md:col-span-8 min-h-[180px]",
    "md:col-span-12 min-h-[160px]",
  ],
};

const defaultPattern = [
  "md:col-span-6 min-h-[220px]",
  "md:col-span-6 min-h-[220px]",
];

type ArtistWorksGalleryProps = {
  artistSlug: string;
  works: Work[];
};

export function ArtistWorksGallery({ artistSlug, works }: ArtistWorksGalleryProps) {
  const styleOptions = useMemo(() => {
    const slugs = new Set<string>();
    for (const work of works) {
      for (const style of work.styles) {
        slugs.add(style);
      }
    }
    return [...slugs].sort((a, b) =>
      (styleLabels.get(a) ?? a).localeCompare(styleLabels.get(b) ?? b, "ro"),
    );
  }, [works]);

  const [activeStyle, setActiveStyle] = useState<string | null>(null);

  const visible = useMemo(
    () => (activeStyle ? filterWorks(works, { styles: [activeStyle] }) : works),
    [works, activeStyle],
  );

  const layout = layoutByArtist[artistSlug] ?? defaultPattern;

  if (works.length === 0) {
    return (
      <p className="text-text-muted">
        Lucrările pentru acest profil demo vor fi listate aici.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {styleOptions.length > 1 ? (
        <StyleFilterBar
          options={styleOptions}
          activeStyle={activeStyle}
          onSelect={setActiveStyle}
        />
      ) : null}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:auto-rows-min md:gap-4">
        {visible.map((work, index) => (
          <WorkTile
            key={work.id}
            work={work}
            layoutClass={
              layout[index] ??
              layout[layout.length - 1] ??
              "md:col-span-6 min-h-[220px]"
            }
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="font-mono-ui text-sm uppercase tracking-widest text-text-subtle">
          Niciun rezultat pentru filtrul ales.
        </p>
      ) : null}
    </div>
  );
}

type FilterBarProps = {
  options: string[];
  activeStyle: string | null;
  onSelect: (slug: string | null) => void;
};

function StyleFilterBar({ options, activeStyle, onSelect }: FilterBarProps) {
  return (
    <div
      role="group"
      aria-label="Filtrează lucrările după stil"
      className="flex flex-col gap-3 border border-line bg-surface-raised p-4 md:flex-row md:items-center md:gap-6"
    >
      <span className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
        Stil
      </span>
      <div className="flex flex-wrap gap-2">
        <FilterChip
          label="Toate"
          pressed={activeStyle === null}
          onClick={() => onSelect(null)}
        />
        {options.map((slug) => (
          <FilterChip
            key={slug}
            label={styleLabels.get(slug) ?? slug}
            pressed={activeStyle === slug}
            onClick={() => onSelect(slug)}
          />
        ))}
      </div>
    </div>
  );
}

type FilterChipProps = {
  label: string;
  pressed: boolean;
  onClick: () => void;
};

function FilterChip({ label, pressed, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={cn(
        "font-mono-ui min-h-10 border px-4 text-xs uppercase tracking-widest transition-colors",
        pressed
          ? "border-accent bg-accent text-bg"
          : "border-line bg-transparent text-text-muted hover:border-accent hover:text-text",
      )}
    >
      {label}
    </button>
  );
}

type WorkTileProps = {
  work: Work;
  layoutClass: string;
};

function WorkTile({ work, layoutClass }: WorkTileProps) {
  const styleLabel = work.styles
    .map((slug) => styleLabels.get(slug) ?? slug)
    .join(", ");

  return (
    <article className={cn("relative", layoutClass)}>
      <Link
        href={`/portofoliu/${work.slug}`}
        className="group relative block h-full min-h-[inherit] overflow-hidden border border-line bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <SmartImage
          src={work.images.main}
          alt={work.alt}
          fill
          sizes="(max-width: 768px) 100vw, 35vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-bg/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-bg/95 to-transparent p-5 md:p-6">
          <p className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-accent">
            {styleLabel}
          </p>
          <p className="font-display text-xl uppercase leading-none text-text md:text-2xl">
            {work.title}
          </p>
          <ScaleTag scale={work.scale} placement={work.placement} />
        </div>
      </Link>
    </article>
  );
}

function ScaleTag({ scale, placement }: { scale: WorkScale; placement: string }) {
  return (
    <p className="text-sm text-text-muted">
      {placement}, {scaleLabel(scale)}
    </p>
  );
}

function scaleLabel(scale: WorkScale): string {
  const map: Record<WorkScale, string> = {
    mic: "format mic",
    mediu: "format mediu",
    mare: "format mare",
  };
  return map[scale];
}