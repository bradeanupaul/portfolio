"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  countFilterOption,
  hasActiveFilters,
  type FilterGroup,
} from "@/lib/filters";
import { SCALE_LABELS } from "@/components/gallery/work-display";
import { cn } from "@/lib/utils";
import type { TattooStyle, Work, WorkFilters, WorkScale } from "@/types/content";

type PortfolioFiltersProps = {
  allWorks: readonly Work[];
  filters: WorkFilters;
  styles: readonly TattooStyle[];
  artists: { slug: string; name: string }[];
  placements: string[];
  onToggle: (group: FilterGroup, value: string) => void;
  onSetFilters: (next: WorkFilters) => void;
  onClear: () => void;
  resultCount: number;
  totalCount: number;
};

const GROUP_LABELS: Record<FilterGroup, string> = {
  styles: "Stil",
  artists: "Artist",
  placements: "Amplasare",
  scales: "Scară",
};

/*
  Defect: sticky aside rendered every filter chip inline (15+ placements), so the bar grew to most of the viewport.
  Fix: compact sticky toolbar + popover menus; selected values only as removable chips.
*/

export function PortfolioFilters({
  allWorks,
  filters,
  styles,
  artists,
  placements,
  onToggle,
  onSetFilters,
  onClear,
  resultCount,
  totalCount,
}: PortfolioFiltersProps) {
  const instructionsId = useId();
  const active = hasActiveFilters(filters);
  const [openGroup, setOpenGroup] = useState<FilterGroup | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDraft, setMobileDraft] = useState<WorkFilters>(filters);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const openMobileFilters = () => {
    setMobileDraft(filters);
    setMobileOpen(true);
  };

  useEffect(() => {
    if (openGroup === null) return;
    const onPointerDown = (event: MouseEvent) => {
      const root = toolbarRef.current;
      if (root && !root.contains(event.target as Node)) setOpenGroup(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const selectedEntries = collectSelected(filters, styles, artists);

  const toggleDraft = useCallback((group: FilterGroup, value: string) => {
    setMobileDraft((prev) => {
      const next = { ...prev };
      if (group === "styles") next.styles = toggleList(prev.styles, value);
      if (group === "artists") next.artists = toggleList(prev.artists, value);
      if (group === "placements") next.placements = toggleList(prev.placements, value);
      if (group === "scales") {
        next.scales = toggleList(prev.scales, value) as WorkFilters["scales"];
      }
      return next;
    });
  }, []);

  return (
    <div className="space-y-3">
      <div
        ref={toolbarRef}
        className={cn(
          "sticky z-20 -mx-[var(--page-gutter)] border-y border-line bg-bg/92 px-[var(--page-gutter)] py-3 backdrop-blur-md",
          "supports-[backdrop-filter]:bg-bg/80",
        )}
        style={{ top: "var(--header-height)" }}
      >
        <p id={instructionsId} className="sr-only">
          Combinați categoriile între ele. În aceeași categorie se aplică una sau alta. {resultCount}{" "}
          {resultCount === 1 ? "lucrare" : "lucrări"}.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
            <span className="text-text">{resultCount}</span>
            {" / "}
            {totalCount} lucrări
          </p>

          <h2 className="sr-only">Filtre portofoliu</h2>

          <div className="hidden flex-wrap items-center gap-2 md:flex">
            {(Object.keys(GROUP_LABELS) as FilterGroup[]).map((group) => (
              <FilterMenu
                key={group}
                group={group}
                label={GROUP_LABELS[group]}
                open={openGroup === group}
                onOpenChange={(next) => setOpenGroup(next ? group : null)}
                describedBy={instructionsId}
              >
                <FilterOptionsList
                  group={group}
                  allWorks={allWorks}
                  filters={filters}
                  styles={styles}
                  artists={artists}
                  placements={placements}
                  onToggle={onToggle}
                />
              </FilterMenu>
            ))}
            <button
              type="button"
              className={cn(
                "font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-muted underline decoration-accent underline-offset-4",
                "disabled:cursor-not-allowed disabled:opacity-40",
              )}
              disabled={!active}
              onClick={onClear}
            >
              Șterge tot
            </button>
          </div>

          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-2 border border-line bg-surface px-3 font-mono-ui text-xs uppercase tracking-widest text-text md:hidden"
            aria-expanded={mobileOpen}
            onClick={openMobileFilters}
          >
            Filtre
            {active ? (
              <span className="rounded-full bg-accent px-1.5 py-0.5 text-[0.6rem] text-bg">
                {selectedEntries.length}
              </span>
            ) : null}
          </button>
        </div>

        {selectedEntries.length > 0 ? (
          <ul
            className="mt-3 flex max-h-16 flex-wrap gap-2 overflow-y-auto"
            aria-label="Filtre active"
          >
            {selectedEntries.map((entry) => (
              <li key={`${entry.group}-${entry.value}`}>
                <button
                  type="button"
                  className="inline-flex min-h-8 max-w-[14rem] items-center gap-2 truncate border border-line bg-surface-raised px-2.5 text-left text-xs text-text"
                  onClick={() => onToggle(entry.group, entry.value)}
                >
                  <span className="font-mono-ui text-[0.6rem] uppercase tracking-widest text-text-subtle">
                    {GROUP_LABELS[entry.group]}
                  </span>
                  <span className="truncate">{entry.label}</span>
                  <span className="text-text-subtle" aria-hidden>
                    ×
                  </span>
                  <span className="sr-only">Elimină filtrul {entry.label}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {mobileOpen ? (
        <MobileFilterSheet
          allWorks={allWorks}
          draft={mobileDraft}
          styles={styles}
          artists={artists}
          placements={placements}
          onToggle={toggleDraft}
          onClose={() => setMobileOpen(false)}
          onApply={() => {
            onSetFilters(mobileDraft);
            setMobileOpen(false);
          }}
          onReset={() => setMobileDraft({})}
        />
      ) : null}
    </div>
  );
}

type FilterMenuProps = {
  group: FilterGroup;
  label: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  describedBy: string;
  children: React.ReactNode;
};

function FilterMenu({
  label,
  open,
  onOpenChange,
  describedBy,
  children,
}: FilterMenuProps) {
  const menuId = useId();
  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "inline-flex min-h-9 items-center gap-2 border px-3 font-mono-ui text-[0.65rem] uppercase tracking-widest",
          open
            ? "border-accent bg-surface-raised text-text"
            : "border-line bg-surface text-text-muted hover:border-text-subtle hover:text-text",
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={menuId}
        aria-describedby={describedBy}
        onClick={() => onOpenChange(!open)}
      >
        {label}
        <span aria-hidden className="text-text-subtle">
          ▾
        </span>
      </button>
      {open ? (
        <div
          id={menuId}
          role="listbox"
          aria-multiselectable="true"
          className="absolute right-0 top-[calc(100%+0.35rem)] z-30 max-h-64 w-[min(20rem,calc(100vw-2rem))] overflow-y-auto border border-line bg-surface-raised p-2 shadow-xl"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

type FilterOptionsListProps = {
  group: FilterGroup;
  allWorks: readonly Work[];
  filters: WorkFilters;
  styles: readonly TattooStyle[];
  artists: { slug: string; name: string }[];
  placements: string[];
  onToggle: (group: FilterGroup, value: string) => void;
};

function FilterOptionsList({
  group,
  allWorks,
  filters,
  styles,
  artists,
  placements,
  onToggle,
}: FilterOptionsListProps) {
  if (group === "styles") {
    return (
      <>
        {styles.map((style) => (
          <FilterOptionRow
            key={style.slug}
            label={style.name}
            pressed={Boolean(filters.styles?.includes(style.slug))}
            count={countFilterOption(allWorks, filters, "styles", style.slug)}
            onPress={() => onToggle("styles", style.slug)}
          />
        ))}
      </>
    );
  }

  if (group === "artists") {
    return (
      <>
        {artists.map((artist) => (
          <FilterOptionRow
            key={artist.slug}
            label={artist.name}
            pressed={Boolean(filters.artists?.includes(artist.slug))}
            count={countFilterOption(allWorks, filters, "artists", artist.slug)}
            onPress={() => onToggle("artists", artist.slug)}
          />
        ))}
      </>
    );
  }

  if (group === "placements") {
    return (
      <>
        {placements.map((placement) => (
          <FilterOptionRow
            key={placement}
            label={placement}
            pressed={Boolean(filters.placements?.includes(placement))}
            count={countFilterOption(allWorks, filters, "placements", placement)}
            onPress={() => onToggle("placements", placement)}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {(Object.keys(SCALE_LABELS) as WorkScale[]).map((scale) => (
        <FilterOptionRow
          key={scale}
          label={SCALE_LABELS[scale]}
          pressed={Boolean(filters.scales?.includes(scale))}
          count={countFilterOption(allWorks, filters, "scales", scale)}
          onPress={() => onToggle("scales", scale)}
        />
      ))}
    </>
  );
}

type FilterOptionRowProps = {
  label: string;
  count: number;
  pressed: boolean;
  onPress: () => void;
};

function FilterOptionRow({ label, count, pressed, onPress }: FilterOptionRowProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={pressed}
      className={cn(
        "flex w-full min-h-9 items-center justify-between gap-3 px-2 text-left text-sm transition-colors",
        pressed ? "bg-accent text-bg" : "text-text hover:bg-surface-muted",
        count === 0 && !pressed && "opacity-45",
      )}
      disabled={count === 0 && !pressed}
      onClick={onPress}
    >
      <span className="truncate">{label}</span>
      <span
        className={cn(
          "shrink-0 font-mono-ui text-[0.65rem] tabular-nums",
          pressed ? "text-bg/80" : "text-text-subtle",
        )}
        aria-hidden
      >
        {count}
      </span>
      <span className="sr-only">{count} lucrări</span>
    </button>
  );
}

type MobileFilterSheetProps = {
  allWorks: readonly Work[];
  draft: WorkFilters;
  styles: readonly TattooStyle[];
  artists: { slug: string; name: string }[];
  placements: string[];
  onToggle: (group: FilterGroup, value: string) => void;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
};

function MobileFilterSheet({
  allWorks,
  draft,
  styles,
  artists,
  placements,
  onToggle,
  onClose,
  onApply,
  onReset,
}: MobileFilterSheetProps) {
  const titleId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);

  const onSheetKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key !== "Tab" || !sheetRef.current) return;
    const focusable = Array.from(
      sheetRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (focusable.length === 0) return;
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-bg/80"
        aria-label="Închide panoul de filtre"
        onClick={onClose}
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-x-0 bottom-0 flex max-h-[min(85vh,640px)] flex-col border-t border-line bg-surface-raised shadow-2xl"
        onKeyDown={onSheetKeyDown}
      >
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <h3 id={titleId} className="font-display text-lg uppercase text-text">
            Filtre
          </h3>
          <button
            type="button"
            className="min-h-9 px-3 text-sm text-text-muted"
            onClick={onClose}
          >
            Închide
          </button>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          <MobileFilterSection title={GROUP_LABELS.styles}>
            <FilterOptionsList
              group="styles"
              allWorks={allWorks}
              filters={draft}
              styles={styles}
              artists={artists}
              placements={placements}
              onToggle={onToggle}
            />
          </MobileFilterSection>
          <MobileFilterSection title={GROUP_LABELS.artists}>
            <FilterOptionsList
              group="artists"
              allWorks={allWorks}
              filters={draft}
              styles={styles}
              artists={artists}
              placements={placements}
              onToggle={onToggle}
            />
          </MobileFilterSection>
          <MobileFilterSection title={GROUP_LABELS.placements}>
            <FilterOptionsList
              group="placements"
              allWorks={allWorks}
              filters={draft}
              styles={styles}
              artists={artists}
              placements={placements}
              onToggle={onToggle}
            />
          </MobileFilterSection>
          <MobileFilterSection title={GROUP_LABELS.scales}>
            <FilterOptionsList
              group="scales"
              allWorks={allWorks}
              filters={draft}
              styles={styles}
              artists={artists}
              placements={placements}
              onToggle={onToggle}
            />
          </MobileFilterSection>
        </div>

        <footer className="flex gap-2 border-t border-line p-4">
          <button
            type="button"
            className="min-h-10 flex-1 border border-line bg-surface px-4 font-mono-ui text-xs uppercase tracking-widest text-text"
            onClick={onReset}
          >
            Resetează
          </button>
          <button
            type="button"
            className="min-h-10 flex-1 bg-accent px-4 font-mono-ui text-xs uppercase tracking-widest text-bg"
            onClick={onApply}
          >
            Aplică
          </button>
        </footer>
      </div>
    </div>
  );
}

function MobileFilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h4 className="mb-2 font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
        {title}
      </h4>
      <div className="divide-y divide-line rounded border border-line">{children}</div>
    </section>
  );
}

function toggleList(values: string[] | undefined, value: string): string[] | undefined {
  const current = values ?? [];
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
  return next.length ? next : undefined;
}

function collectSelected(
  filters: WorkFilters,
  styles: readonly TattooStyle[],
  artists: { slug: string; name: string }[],
): { group: FilterGroup; value: string; label: string }[] {
  const out: { group: FilterGroup; value: string; label: string }[] = [];

  filters.styles?.forEach((slug) => {
    const style = styles.find((s) => s.slug === slug);
    out.push({ group: "styles", value: slug, label: style?.name ?? slug });
  });
  filters.artists?.forEach((slug) => {
    const artist = artists.find((a) => a.slug === slug);
    out.push({ group: "artists", value: slug, label: artist?.name ?? slug });
  });
  filters.placements?.forEach((placement) => {
    out.push({ group: "placements", value: placement, label: placement });
  });
  filters.scales?.forEach((scale) => {
    out.push({ group: "scales", value: scale, label: SCALE_LABELS[scale] });
  });

  return out;
}