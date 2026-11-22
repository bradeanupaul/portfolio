import { nightsBetween, parseIsoDate } from "@/lib/utils";

export type PriceRuleInput = {
  type: string;
  amountBan: number;
  percentBps: number | null;
  startMonth: number | null;
  endMonth: number | null;
  weekendOnly: boolean;
  active: boolean;
};

export type PriceBreakdown = {
  nights: number;
  basePerNightBan: number;
  subtotalBan: number;
  adjustmentsBan: number;
  feesBan: number;
  totalBan: number;
  nightlyRates: number[];
};

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 5 || day === 6 || day === 0;
}

function monthInRange(month: number, start: number | null, end: number | null): boolean {
  if (start == null || end == null) return true;
  if (start <= end) return month >= start && month <= end;
  return month >= start || month <= end;
}

export function calculateStayPrice(
  basePriceBan: number,
  checkIn: string,
  checkOut: string,
  rules: PriceRuleInput[] = [],
  demoFeeBan = 0,
): PriceBreakdown {
  const nights = nightsBetween(checkIn, checkOut);
  if (nights <= 0) {
    throw new Error("Intervalul de date este invalid.");
  }

  const start = parseIsoDate(checkIn);
  const nightlyRates: number[] = [];
  let subtotalBan = 0;
  let adjustmentsBan = 0;

  for (let i = 0; i < nights; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    const month = day.getMonth() + 1;
    let rate = basePriceBan;

    for (const rule of rules.filter((r) => r.active)) {
      if (!monthInRange(month, rule.startMonth, rule.endMonth)) continue;
      if (rule.weekendOnly && !isWeekend(day)) continue;

      if (rule.type === "seasonal_percent" && rule.percentBps != null) {
        const adj = Math.round((basePriceBan * rule.percentBps) / 10000);
        rate += adj;
        adjustmentsBan += adj;
      } else if (rule.type === "flat_night") {
        rate += rule.amountBan;
        adjustmentsBan += rule.amountBan;
      } else if (rule.type === "weekend_percent" && rule.percentBps != null && isWeekend(day)) {
        const adj = Math.round((basePriceBan * rule.percentBps) / 10000);
        rate += adj;
        adjustmentsBan += adj;
      }
    }

    nightlyRates.push(rate);
    subtotalBan += rate;
  }

  const feesBan = demoFeeBan;
  const totalBan = subtotalBan + feesBan;

  return {
    nights,
    basePerNightBan: basePriceBan,
    subtotalBan,
    adjustmentsBan,
    feesBan,
    totalBan,
    nightlyRates,
  };
}
