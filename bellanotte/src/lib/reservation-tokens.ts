import { randomBytes } from "crypto";

export function generateReservationReference(date: string): string {
  const suffix = randomBytes(2).toString("hex").toUpperCase();
  const compact = date.replace(/-/g, "");
  return `BN-${compact}-${suffix}`;
}

export function generateCancelToken(): string {
  return randomBytes(24).toString("base64url");
}