import type { Work, WorkFilters, WorkScale } from "@/types/content";

const FILTER_KEYS = {
  styles: "styles",
  artists: "artists",
  placements: "placements",
  scales: "scales",
} as const;

const VALID_SCALES: readonly WorkScale[] = ["mic", "mediu", "mare"];

function splitParam(value: string | null): string[] | undefined {
  if (!value) return undefined;
  const parts = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : undefined;
}

function matchesGroup<T extends string>(
  value: T,
  selected: string[] | undefined,
): boolean {
  if (!selected?.length) return true;
  return selected.includes(value);
}

export function filterWorks(works: readonly Work[], filters: WorkFilters): Work[] {
  return works.filter((work) => {
    const styleOk =
      !filters.styles?.length ||
      filters.styles.some((style) => work.styles.includes(style));
    const artistOk = matchesGroup(work.artistSlug, filters.artists);
    const placementOk = matchesGroup(work.placement, filters.placements);
    const scaleOk = matchesGroup(work.scale, filters.scales);

    return styleOk && artistOk && placementOk && scaleOk;
  });
}

export function parseFilterParams(params: URLSearchParams): WorkFilters {
  const scalesRaw = splitParam(params.get(FILTER_KEYS.scales));
  const scales = scalesRaw?.filter((s): s is WorkScale =>
    (VALID_SCALES as readonly string[]).includes(s),
  );

  return {
    styles: splitParam(params.get(FILTER_KEYS.styles)),
    artists: splitParam(params.get(FILTER_KEYS.artists)),
    placements: splitParam(params.get(FILTER_KEYS.placements)),
    scales: scales?.length ? scales : undefined,
  };
}

export function serializeFilterParams(filters: WorkFilters): string {
  const params = new URLSearchParams();

  if (filters.styles?.length) {
    params.set(FILTER_KEYS.styles, filters.styles.join(","));
  }
  if (filters.artists?.length) {
    params.set(FILTER_KEYS.artists, filters.artists.join(","));
  }
  if (filters.placements?.length) {
    params.set(FILTER_KEYS.placements, filters.placements.join(","));
  }
  if (filters.scales?.length) {
    params.set(FILTER_KEYS.scales, filters.scales.join(","));
  }

  return params.toString();
}

export type FilterGroup = keyof typeof FILTER_KEYS;

function withGroupSelection(
  filters: WorkFilters,
  group: FilterGroup,
  option: string,
): WorkFilters {
  const next: WorkFilters = { ...filters };

  if (group === "styles") {
    const current = filters.styles ?? [];
    next.styles =
      current.length === 0
        ? [option]
        : current.includes(option)
          ? current
          : [...current, option];
    return next;
  }

  if (group === "artists") {
    const current = filters.artists ?? [];
    next.artists =
      current.length === 0
        ? [option]
        : current.includes(option)
          ? current
          : [...current, option];
    return next;
  }

  if (group === "placements") {
    const current = filters.placements ?? [];
    next.placements =
      current.length === 0
        ? [option]
        : current.includes(option)
          ? current
          : [...current, option];
    return next;
  }

  const current = filters.scales ?? [];
  const scaleOption = option as WorkScale;
  next.scales =
    current.length === 0
      ? [scaleOption]
      : current.includes(scaleOption)
        ? current
        : [...current, scaleOption];
  return next;
}

/** Facet count: works matching other groups and this option within its OR group. */
export function countFilterOption(
  works: readonly Work[],
  filters: WorkFilters,
  group: FilterGroup,
  option: string,
): number {
  return filterWorks(works, withGroupSelection(filters, group, option)).length;
}

export function hasActiveFilters(filters: WorkFilters): boolean {
  return Boolean(
    filters.styles?.length ||
      filters.artists?.length ||
      filters.placements?.length ||
      filters.scales?.length,
  );
}