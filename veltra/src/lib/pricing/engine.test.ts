import { describe, expect, it } from "vitest";
import { calculateStayPrice, type PriceRuleInput } from "@/lib/pricing/engine";

describe("calculateStayPrice", () => {
  it("calculează subtotalul pentru un sejur fără reguli", () => {
    const result = calculateStayPrice(10000, "2026-06-01", "2026-06-04");
    expect(result.nights).toBe(3);
    expect(result.subtotalBan).toBe(30000);
    expect(result.totalBan).toBe(30000);
    expect(result.nightlyRates).toEqual([10000, 10000, 10000]);
  });

  it("aplică o taxă fixă pe noapte", () => {
    const rules: PriceRuleInput[] = [
      {
        type: "flat_night",
        amountBan: 2000,
        percentBps: null,
        startMonth: null,
        endMonth: null,
        weekendOnly: false,
        active: true,
      },
    ];
    const result = calculateStayPrice(10000, "2026-06-01", "2026-06-03", rules);
    expect(result.subtotalBan).toBe(24000);
    expect(result.adjustmentsBan).toBe(4000);
  });

  it("aruncă pentru interval invalid", () => {
    expect(() => calculateStayPrice(10000, "2026-06-03", "2026-06-01")).toThrow();
  });
});