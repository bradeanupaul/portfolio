import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TransactionType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeText(value: string): string {
  return value
    .toLocaleLowerCase("ro")
    .replace(/[ăâ]/g, "a")
    .replace(/î/g, "i")
    .replace(/[șş]/g, "s")
    .replace(/[țţ]/g, "t")
    .trim();
}

export function formatPrice(
  amountEur: number,
  transactionType?: TransactionType,
): string {
  const formatted = new Intl.NumberFormat("ro-RO", {
    maximumFractionDigits: 0,
  }).format(amountEur);
  const value = `${formatted} EUR`;

  if (transactionType === "inchiriere") {
    return `${value} pe lună`;
  }

  return value;
}

export function formatArea(areaSqm: number): string {
  const hasFraction = Math.round(areaSqm * 10) % 10 !== 0;
  const formatted = new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: hasFraction ? 1 : 0,
    maximumFractionDigits: hasFraction ? 1 : 0,
  }).format(areaSqm);

  return `${formatted} m²`;
}
