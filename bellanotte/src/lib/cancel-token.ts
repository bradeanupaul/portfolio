import { timingSafeEqual } from "crypto";

export function tokensMatch(provided: string, stored: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(stored);
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}