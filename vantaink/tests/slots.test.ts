import { describe, expect, it } from "vitest";

import {
  evaluateSlotConflict,
  generateFutureDemoSlots,
  startOfLocalDay,
} from "@/lib/booking/slots";

describe("generateFutureDemoSlots", () => {
  it("creates slots for every artist on working weekdays", () => {
    const from = startOfLocalDay(new Date("2026-11-17T12:00:00"));
    const slots = generateFutureDemoSlots(from, 7);
    const artists = new Set(slots.map((s) => s.artistSlug));
    expect(artists.size).toBe(4);
    expect(slots.length).toBeGreaterThan(0);
    expect(slots.every((s) => s.label.includes("fictiv"))).toBe(true);
  });
});

describe("evaluateSlotConflict", () => {
  const baseSlot = {
    artistSlug: "alex-muresan",
    isBooked: false,
    startsAt: new Date(Date.now() + 60_000),
  };

  it("accepts a valid slot", () => {
    expect(
      evaluateSlotConflict(baseSlot, "alex-muresan", new Date()),
    ).toEqual({ ok: true });
  });

  it("detects artist mismatch", () => {
    expect(
      evaluateSlotConflict(baseSlot, "mara-ionescu", new Date()),
    ).toEqual({ ok: false, code: "ARTIST_MISMATCH" });
  });

  it("detects booked slots", () => {
    expect(
      evaluateSlotConflict(
        { ...baseSlot, isBooked: true },
        "alex-muresan",
        new Date(),
      ),
    ).toEqual({ ok: false, code: "ALREADY_BOOKED" });
  });

  it("detects past slots", () => {
    expect(
      evaluateSlotConflict(
        {
          ...baseSlot,
          startsAt: new Date(Date.now() - 60_000),
        },
        "alex-muresan",
        new Date(),
      ),
    ).toEqual({ ok: false, code: "PAST" });
  });
});