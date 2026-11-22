import { isBefore, parse, startOfDay } from "date-fns";
import { restaurant } from "@/data/restaurant";
import { prisma } from "@/lib/prisma";
import {
  generateReservationSlots,
  isRestaurantOpenOnDate,
  isWithinBusinessHours,
} from "@/lib/reservations";
import { reservationFormSchema } from "@/lib/validations";

export const reservationApiSchema = reservationFormSchema.superRefine((data, ctx) => {
  const parsedDate = parse(data.date, "yyyy-MM-dd", new Date());
  const today = startOfDay(new Date());

  if (isBefore(startOfDay(parsedDate), today)) {
    ctx.addIssue({
      code: "custom",
      message: "Nu puteți rezerva în trecut.",
      path: ["date"],
    });
    return;
  }

  if (!isRestaurantOpenOnDate(parsedDate)) {
    ctx.addIssue({
      code: "custom",
      message: "Restaurantul este închis în ziua aleasă.",
      path: ["date"],
    });
    return;
  }

  if (!isWithinBusinessHours(parsedDate, data.time)) {
    ctx.addIssue({
      code: "custom",
      message: "Ora aleasă este în afara programului de funcționare.",
      path: ["time"],
    });
    return;
  }

  const slots = generateReservationSlots(parsedDate);
  const match = slots.find((slot) => slot.time === data.time);
  if (!match?.available) {
    ctx.addIssue({
      code: "custom",
      message: "Intervalul orar nu mai este disponibil.",
      path: ["time"],
    });
  }
});

export async function getSlotPartyTotal(date: string, time: string): Promise<number> {
  const rows = await prisma.reservation.findMany({
    where: {
      date,
      time,
      status: { in: ["pending", "confirmed"] },
    },
    select: { partySize: true },
  });

  return rows.reduce((sum, row) => sum + row.partySize, 0);
}

export async function assertSlotCapacity(
  date: string,
  time: string,
  partySize: number,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const occupied = await getSlotPartyTotal(date, time);
  if (occupied + partySize > restaurant.capacity) {
    return {
      ok: false,
      message:
        "Ne pare rău. Capacitatea pentru acest interval este epuizată. Alegeți o altă oră sau contactați-ne.",
    };
  }
  return { ok: true };
}