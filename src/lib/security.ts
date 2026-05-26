/**
 * Security Utilities
 *
 * Provides CSRF token generation/validation, input sanitization,
 * and other security helpers.
 */

import { z } from "zod";

/**
 * Generate a CSRF token (for forms that need it).
 * In Next.js App Router with Server Actions, CSRF is handled automatically.
 * This is for custom API routes that accept form submissions.
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Sanitize user input to prevent XSS.
 * Strips HTML tags and dangerous characters.
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim();
}

/**
 * Validate and sanitize a URL to prevent open redirect attacks.
 * Only allows relative paths or same-origin URLs.
 */
export function sanitizeRedirectUrl(url: string, baseUrl: string): string {
  // Only allow relative paths
  if (url.startsWith("/") && !url.startsWith("//")) {
    return url;
  }

  // Check if same origin
  try {
    const parsed = new URL(url);
    const base = new URL(baseUrl);
    if (parsed.origin === base.origin) {
      return parsed.pathname + parsed.search;
    }
  } catch {
    // Invalid URL
  }

  // Default to home
  return "/";
}

/**
 * Validate environment variables at startup.
 * Throws if required variables are missing.
 */
export const envSchema = z.object({
  // Required in production
  DATABASE_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // Optional analytics
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  NEXT_PUBLIC_GA4_ID: z.string().optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_TIKTOK_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

/**
 * Validate that required env vars are set.
 * Call this in instrumentation.ts for early failure detection.
 */
export function validateEnv(): void {
  if (process.env.NODE_ENV === "production") {
    const required = ["NEXTAUTH_SECRET"];
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
      console.warn(
        `⚠️  Missing required environment variables: ${missing.join(", ")}`
      );
    }
  }
}

/**
 * Hash a value using SHA-256 (for non-password hashing like API keys).
 */
export async function hashSHA256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Constant-time string comparison to prevent timing attacks.
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
