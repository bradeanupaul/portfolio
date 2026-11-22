type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  windowMs?: number;
  max?: number;
};

const buckets = new Map<string, RateLimitBucket>();

export function rateLimit(
  key: string,
  { windowMs = 60_000, max = 10 }: RateLimitOptions = {},
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: max - 1, resetAt };
  }

  if (current.count >= max) {
    return { success: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  buckets.set(key, current);

  return {
    success: true,
    remaining: Math.max(0, max - current.count),
    resetAt: current.resetAt,
  };
}