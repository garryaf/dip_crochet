/**
 * In-Memory Rate Limiter
 *
 * Simple token-bucket rate limiter for API routes and Server Actions.
 * Uses in-memory Map (works for single-instance deployments).
 *
 * For multi-instance production, replace with Redis-based rate limiting.
 *
 * Usage:
 *   const limiter = createRateLimiter({ interval: 60_000, limit: 10 });
 *   const { success } = limiter.check(ip);
 *   if (!success) return Response.json({ error: "Too many requests" }, { status: 429 });
 */

interface RateLimitConfig {
  /** Time window in milliseconds */
  interval: number;
  /** Maximum requests per interval */
  limit: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function createRateLimiter(config: RateLimitConfig) {
  const { interval, limit } = config;
  const store = new Map<string, RateLimitEntry>();

  // Cleanup expired entries every 5 minutes
  if (typeof setInterval !== "undefined") {
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of store.entries()) {
        if (entry.resetAt < now) {
          store.delete(key);
        }
      }
    }, 5 * 60 * 1000);
  }

  return {
    check(identifier: string): RateLimitResult {
      const now = Date.now();
      const entry = store.get(identifier);

      // No existing entry or expired — create new window
      if (!entry || entry.resetAt < now) {
        store.set(identifier, { count: 1, resetAt: now + interval });
        return { success: true, remaining: limit - 1, resetAt: now + interval };
      }

      // Within window — check limit
      if (entry.count >= limit) {
        return { success: false, remaining: 0, resetAt: entry.resetAt };
      }

      // Increment
      entry.count++;
      return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt };
    },

    reset(identifier: string): void {
      store.delete(identifier);
    },
  };
}

// Pre-configured limiters for common use cases
export const apiLimiter = createRateLimiter({
  interval: 60_000, // 1 minute
  limit: 30, // 30 requests per minute
});

export const authLimiter = createRateLimiter({
  interval: 15 * 60_000, // 15 minutes
  limit: 5, // 5 attempts per 15 minutes
});

export const newsletterLimiter = createRateLimiter({
  interval: 60 * 60_000, // 1 hour
  limit: 3, // 3 signups per hour per IP
});

/**
 * Extract client IP from request headers.
 * Works with Vercel, Cloudflare, and standard proxies.
 */
export function getClientIP(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
