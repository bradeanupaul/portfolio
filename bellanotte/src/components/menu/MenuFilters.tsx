"use client";

import { Leaf, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  vegetarianOnly: boolean;
  onVegetarianOnlyChange: (value: boolean) => void;
  resultCount: number;
  className?: string;
}

export function MenuFilters({
  query,
  onQueryChange,
  vegetarianOnly,
  onVegetarianOnlyChange,
  resultCount,
  className,
}: MenuFiltersProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-bn-border bg-bn-bg-surface/90 p-4 sm:p-5",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block flex-1">
          <span className="sr-only">Caută în meniu</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-bn-text-dim"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Caută după numele preparatului..."
            className="h-11 w-full rounded-sm border border-bn-border bg-bn-bg-elevated pl-10 pr-10 text-sm text-bn-text placeholder:text-bn-text-dim focus-visible:border-bn-gold/60"
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="absolute right-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-sm text-bn-text-muted transition-colors hover:text-bn-gold"
            >
              <span className="sr-only">Șterge căutarea</span>
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </label>

        <button
          type="button"
          role="switch"
          aria-checked={vegetarianOnly}
          onClick={() => onVegetarianOnlyChange(!vegetarianOnly)}
          className={cn(
            "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-sm border px-4 text-xs font-medium uppercase tracking-wide transition-colors",
            vegetarianOnly
              ? "border-bn-green bg-bn-green/25 text-bn-gold-light"
              : "border-bn-border bg-bn-bg-elevated text-bn-text-muted hover:border-bn-gold/50 hover:text-bn-text",
          )}
        >
          <Leaf className="size-4" aria-hidden />
          Doar vegetariene
        </button>
      </div>
      <p className="mt-3 text-xs text-bn-text-dim" aria-live="polite">
        {resultCount === 0
          ? "Niciun preparat nu corespunde filtrelor."
          : `${resultCount} preparat${resultCount === 1 ? "" : "e"} afișat${resultCount === 1 ? "" : "e"}`}
      </p>
    </div>
  );
}