import {
  addMinutes,
  format,
  getDay,
  isBefore,
  isValid,
  parse,
  setHours,
  setMinutes,
  startOfDay,
} from "date-fns";
import { ro } from "date-fns/locale";
import { restaurant } from "@/data/restaurant";
import type { BusinessHoursSlot, DayOfWeek, ReservationSlot } from "@/types";

export { ro as dateFnsRoLocale };

const DAY_INDEX_TO_KEY: DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const RESERVATION_SLOT_INTERVAL_MINUTES = 30;
export const LAST_SEATING_BUFFER_MINUTES = 90;
export const MAX_PARTY_SIZE = 12;
export const ONLINE_RESERVATION_MAX_PARTY = 10;
export const MIN_PARTY_SIZE = 1;

export function getDayOfWeekKey(date: Date): DayOfWeek {
  return DAY_INDEX_TO_KEY[getDay(date)];
}

export function getBusinessHoursForDate(date: Date): BusinessHoursSlot | null {
  const key = getDayOfWeekKey(date);
  return restaurant.hours[key];
}

export function parseTimeOnDate(date: Date, time: string): Date | null {
  const parsed = parse(time, "HH:mm", startOfDay(date));
  return isValid(parsed) ? parsed : null;
}

export function isRestaurantOpenOnDate(date: Date): boolean {
  return getBusinessHoursForDate(date) !== null;
}

export function isWithinBusinessHours(date: Date, time: string): boolean {
  const hours = getBusinessHoursForDate(date);
  if (!hours) {
    return false;
  }

  const slot = parseTimeOnDate(date, time);
  const open = parseTimeOnDate(date, hours.open);
  const close = parseTimeOnDate(date, hours.close);

  if (!slot || !open || !close) {
    return false;
  }

  return (
    (slot.getTime() === open.getTime() || slot > open) &&
    slot.getTime() <= close.getTime()
  );
}

function formatSlotLabel(time: string): string {
  const reference = parse(time, "HH:mm", new Date());
  if (!isValid(reference)) {
    return time;
  }
  return format(reference, "HH:mm", { locale: ro });
}

export function generateReservationSlots(
  date: Date,
  options?: { now?: Date },
): ReservationSlot[] {
  const hours = getBusinessHoursForDate(date);
  if (!hours) {
    return [];
  }

  const open = parseTimeOnDate(date, hours.open);
  const close = parseTimeOnDate(date, hours.close);
  if (!open || !close) {
    return [];
  }

  const lastSeating = addMinutes(close, -LAST_SEATING_BUFFER_MINUTES);
  if (isBefore(lastSeating, open)) {
    return [];
  }

  const now = options?.now ?? new Date();
  const slots: ReservationSlot[] = [];
  let cursor = open;

  while (cursor <= lastSeating) {
    const time = format(cursor, "HH:mm");
    const isPast =
      startOfDay(date).getTime() === startOfDay(now).getTime() &&
      isBefore(cursor, setMinutes(setHours(now, now.getHours()), now.getMinutes()));

    slots.push({
      time,
      label: formatSlotLabel(time),
      available: !isPast && isWithinBusinessHours(date, time),
    });

    cursor = addMinutes(cursor, RESERVATION_SLOT_INTERVAL_MINUTES);
  }

  return slots;
}

export function getAvailableReservationSlots(date: Date, now?: Date): string[] {
  return generateReservationSlots(date, { now })
    .filter((slot) => slot.available)
    .map((slot) => slot.time);
}

export function formatReservationDate(date: Date, pattern = "EEEE, d MMMM yyyy"): string {
  return format(date, pattern, { locale: ro });
}

export function formatReservationDateTime(
  date: Date,
  time: string,
  pattern = "EEEE, d MMMM yyyy, HH:mm",
): string {
  const combined = parseTimeOnDate(date, time);
  if (!combined) {
    return formatReservationDate(date);
  }
  return format(combined, pattern, { locale: ro });
}

export function summarizeWeeklyHours(): string {
  return "Lun până Joi 12:00 până la 22:30, Vin 12:00 până la 23:30, Sâm 13:00 până la 23:30, Dum 13:00 până la 22:00";
}