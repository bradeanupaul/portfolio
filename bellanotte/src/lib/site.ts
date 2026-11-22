import type { SiteConfig } from "@/types";

const FALLBACK_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  return FALLBACK_SITE_URL;
}

/** Static year for prerender-safe footer copy (update at new calendar year). */
export const copyrightYear = 2026;

export const siteConfig: SiteConfig = {
  name: "Bella Notte",
  description:
    "Ristorante Italiano în inima Clujului. Paste proaspete, risotto cremos și o atmosferă caldă, cu lumânări și vinuri alese.",
  url: getSiteUrl(),
  defaultOgImage: "/images/hero/pasta-truffle.jpg",
  locale: "ro-RO",
  themeColor: "#0A0908",
};

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export function formatCurrencyRon(amount: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("40")) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }
  return phone;
}

export function formatPhoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("40") ? `+${digits}` : phone;
}