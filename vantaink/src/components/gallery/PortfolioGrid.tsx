"use client";

import { WorkCard } from "@/components/gallery/WorkCard";
import type { Work } from "@/types/content";

type PortfolioGridProps = {
  works: Work[];
  artistNames: Record<string, string>;
  styleNames: Record<string, string>;
  onPreview: (index: number) => void;
};

export function PortfolioGrid({
  works,
  artistNames,
  styleNames,
  onPreview,
}: PortfolioGridProps) {
  return (
    <div
      className="grid auto-rows-auto grid-cols-1 items-start gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {works.map((work, index) => {
        const artistName = artistNames[work.artistSlug] ?? work.artistSlug;
        const styleLabel = work.styles
          .map((slug) => styleNames[slug] ?? slug)
          .join(", ");
        const indexLabel = String(index + 1).padStart(2, "0");

        return (
          <WorkCard
            key={work.id}
            work={work}
            artistName={artistName}
            styleLabel={styleLabel}
            indexLabel={indexLabel}
            onPreview={() => onPreview(index)}
          />
        );
      })}
    </div>
  );
}