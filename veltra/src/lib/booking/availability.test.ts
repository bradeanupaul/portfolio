import { describe, expect, it } from "vitest";
import { datesOverlap } from "@/lib/booking/availability";

describe("datesOverlap", () => {
  it("detectează suprapunere parțială", () => {
    expect(datesOverlap("2026-06-01", "2026-06-05", "2026-06-03", "2026-06-08")).toBe(true);
  });

  it("nu detectează suprapunere când intervalele sunt adiacente (half-open)", () => {
    expect(datesOverlap("2026-06-01", "2026-06-05", "2026-06-05", "2026-06-08")).toBe(false);
    expect(datesOverlap("2026-06-05", "2026-06-08", "2026-06-01", "2026-06-05")).toBe(false);
  });

  it("detectează incluziune completă", () => {
    expect(datesOverlap("2026-06-02", "2026-06-04", "2026-06-01", "2026-06-10")).toBe(true);
  });
});