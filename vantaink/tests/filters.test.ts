import { describe, expect, it } from "vitest";

import { works } from "@/data/works";
import {
  filterWorks,
  parseFilterParams,
  serializeFilterParams,
} from "@/lib/filters";

describe("filterWorks", () => {
  it("returns all works when no filters are set", () => {
    expect(filterWorks(works, {})).toHaveLength(works.length);
  });

  it("filters by artist slug", () => {
    const filtered = filterWorks(works, { artists: ["alex-muresan"] });
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((w) => w.artistSlug === "alex-muresan")).toBe(true);
  });

  it("filters by style", () => {
    const filtered = filterWorks(works, { styles: ["blackwork"] });
    expect(filtered.every((w) => w.styles.includes("blackwork"))).toBe(true);
  });
});

describe("parseFilterParams / serializeFilterParams", () => {
  it("round-trips filter selections", () => {
    const filters = {
      styles: ["geometric", "blackwork"],
      artists: ["mara-ionescu"],
      scales: ["mic" as const],
    };
    const query = serializeFilterParams(filters);
    const parsed = parseFilterParams(new URLSearchParams(query));
    expect(parsed.styles).toEqual(filters.styles);
    expect(parsed.artists).toEqual(filters.artists);
    expect(parsed.scales).toEqual(filters.scales);
  });
});