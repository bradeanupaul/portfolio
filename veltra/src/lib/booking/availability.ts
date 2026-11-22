import { prisma } from "@/lib/db/client";

/**
 * Half-open interval overlap:
 * conflict when existing.checkIn < requestedCheckOut
 * AND existing.checkOut > requestedCheckIn
 */
export function datesOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return aStart < bEnd && aEnd > bStart;
}

export async function getAvailableUnitsForType(
  roomTypeId: string,
  checkIn: string,
  checkOut: string,
) {
  const units = await prisma.roomUnit.findMany({
    where: { roomTypeId, active: true },
    include: {
      reservations: {
        where: {
          status: { in: ["PENDING", "CONFIRMED_DEMO"] },
        },
      },
      blocks: true,
    },
  });

  return units.filter((unit) => {
    const reservationConflict = unit.reservations.some((r) =>
      datesOverlap(r.checkIn, r.checkOut, checkIn, checkOut),
    );
    const blockConflict = unit.blocks.some((b) =>
      datesOverlap(b.startDate, b.endDate, checkIn, checkOut),
    );
    return !reservationConflict && !blockConflict;
  });
}

export async function isRoomTypeAvailable(
  roomTypeId: string,
  checkIn: string,
  checkOut: string,
): Promise<boolean> {
  const available = await getAvailableUnitsForType(roomTypeId, checkIn, checkOut);
  return available.length > 0;
}

export async function allocateUnit(
  roomTypeId: string,
  checkIn: string,
  checkOut: string,
) {
  const available = await getAvailableUnitsForType(roomTypeId, checkIn, checkOut);
  return available[0] ?? null;
}
