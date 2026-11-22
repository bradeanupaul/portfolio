export const viewingTimes = [
  "09:00",
  "10:30",
  "12:00",
  "14:00",
  "15:30",
  "17:00",
  "18:30",
] as const;

export type ViewingTime = (typeof viewingTimes)[number];

export function bucharestNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    date: `${read("year")}-${read("month")}-${read("day")}`,
    time: `${read("hour")}:${read("minute")}`,
  };
}

export function isViewingTime(value: string): value is ViewingTime {
  return (viewingTimes as readonly string[]).includes(value);
}

export function isPastDate(isoDate: string, now = bucharestNow()) {
  return isoDate < now.date;
}

export function isPastSlot(isoDate: string, time: string, now = bucharestNow()) {
  if (isoDate < now.date) return true;
  if (isoDate > now.date) return false;
  return time <= now.time;
}
