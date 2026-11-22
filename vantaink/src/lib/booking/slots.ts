import type { DemoSlot } from "@prisma/client";

import { artists } from "@/data/artists";
import { prisma } from "@/lib/db/prisma";

const DEMO_SLOT_LABEL =
  "Consultație demonstrativă (fictiv), fără programare reală în atelier.";

/** Tuesday=2 … Saturday=6 (local calendar). */
const WORK_WEEKDAYS = new Set([2, 3, 4, 5, 6]);

const DAILY_TIME_SLOTS: ReadonlyArray<{ hour: number; minute: number }> = [
  { hour: 10, minute: 0 },
  { hour: 12, minute: 30 },
  { hour: 15, minute: 0 },
  { hour: 17, minute: 30 },
];

const SLOT_DURATION_MS = 90 * 60 * 1000;
const DEFAULT_HORIZON_DAYS = 21;

export type DemoSlotCreateInput = {
  artistSlug: string;
  startsAt: Date;
  endsAt: Date;
  label: string;
  isBooked: boolean;
};

export type SlotConflictCode =
  | "NOT_FOUND"
  | "ARTIST_MISMATCH"
  | "ALREADY_BOOKED"
  | "PAST";

export type SlotConflictEvaluation =
  | { ok: true }
  | { ok: false; code: SlotConflictCode };

export function startOfLocalDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function generateFutureDemoSlots(
  fromDate: Date = startOfLocalDay(new Date()),
  horizonDays: number = DEFAULT_HORIZON_DAYS,
): DemoSlotCreateInput[] {
  const slots: DemoSlotCreateInput[] = [];

  for (const artist of artists) {
    for (let dayOffset = 0; dayOffset < horizonDays; dayOffset += 1) {
      const day = new Date(fromDate);
      day.setDate(fromDate.getDate() + dayOffset);

      if (!WORK_WEEKDAYS.has(day.getDay())) {
        continue;
      }

      for (const { hour, minute } of DAILY_TIME_SLOTS) {
        const startsAt = new Date(day);
        startsAt.setHours(hour, minute, 0, 0);

        if (startsAt.getTime() <= Date.now()) {
          continue;
        }

        const endsAt = new Date(startsAt.getTime() + SLOT_DURATION_MS);

        slots.push({
          artistSlug: artist.slug,
          startsAt,
          endsAt,
          label: DEMO_SLOT_LABEL,
          isBooked: false,
        });
      }
    }
  }

  return slots;
}

export function evaluateSlotConflict(
  slot: Pick<DemoSlot, "artistSlug" | "isBooked" | "startsAt"> | null,
  artistSlug: string,
  now: Date = new Date(),
): SlotConflictEvaluation {
  if (!slot) {
    return { ok: false, code: "NOT_FOUND" };
  }
  if (slot.artistSlug !== artistSlug) {
    return { ok: false, code: "ARTIST_MISMATCH" };
  }
  if (slot.isBooked) {
    return { ok: false, code: "ALREADY_BOOKED" };
  }
  if (slot.startsAt.getTime() <= now.getTime()) {
    return { ok: false, code: "PAST" };
  }
  return { ok: true };
}

export async function checkSlotConflict(
  artistSlug: string,
  slotId: string,
): Promise<SlotConflictEvaluation> {
  const slot = await prisma.demoSlot.findUnique({
    where: { id: slotId },
    select: { artistSlug: true, isBooked: true, startsAt: true },
  });

  return evaluateSlotConflict(slot, artistSlug);
}