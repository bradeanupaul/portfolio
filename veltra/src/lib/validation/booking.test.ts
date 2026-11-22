import { describe, expect, it } from "vitest";
import { dateSelectionSchema, guestInfoSchema } from "./booking";
import { toIsoDate } from "@/lib/utils";

describe("dateSelectionSchema", () => {
  it("accepts a valid future stay", () => {
    const start = new Date();
    start.setDate(start.getDate() + 5);
    const end = new Date();
    end.setDate(end.getDate() + 8);
    const result = dateSelectionSchema.safeParse({
      checkIn: toIsoDate(start),
      checkOut: toIsoDate(end),
      guestCount: 2,
    });
    expect(result.success).toBe(true);
  });

  it("rejects checkout before checkin", () => {
    const result = dateSelectionSchema.safeParse({
      checkIn: "2030-01-10",
      checkOut: "2030-01-09",
      guestCount: 2,
    });
    expect(result.success).toBe(false);
  });
});

describe("guestInfoSchema", () => {
  it("requires a valid email", () => {
    const result = guestInfoSchema.safeParse({
      firstName: "Ana",
      lastName: "Pop",
      email: "invalid",
      phone: "+40722111222",
    });
    expect(result.success).toBe(false);
  });
});
