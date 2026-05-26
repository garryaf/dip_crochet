/**
 * Error Monitoring & Logging Service
 *
 * Abstraction layer for error reporting.
 * Currently logs to console. Replace with Sentry SDK when configured.
 *
 * Usage:
 *   import { captureError, captureMessage } from "@/lib/monitoring";
 *   captureError(error, { context: "checkout" });
 *   captureMessage("Order completed", { orderId: "DPC-001" });
 */

type ErrorContext = Record<string, string | number | boolean>;

/**
 * Capture and report an error.
 * In production with Sentry: Sentry.captureException(error, { extra: context })
 */
export function captureError(error: unknown, context?: ErrorContext): void {
  const errorObj = error instanceof Error ? error : new Error(String(error));

  // Always log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error("[ERROR]", errorObj.message, context);
    return;
  }

  // Production: send to Sentry
  // TODO: Replace with Sentry.captureException when SENTRY_DSN is configured
  // import * as Sentry from "@sentry/nextjs";
  // Sentry.captureException(errorObj, { extra: context });

  console.error("[PROD ERROR]", errorObj.message, context);
}

/**
 * Capture an informational message.
 */
export function captureMessage(message: string, context?: ErrorContext): void {
  if (process.env.NODE_ENV === "development") {
    console.info("[INFO]", message, context);
    return;
  }

  // TODO: Sentry.captureMessage(message, { extra: context });
  console.info("[PROD INFO]", message, context);
}

/**
 * Set user context for error reports.
 */
export function setUser(user: { id: string; email?: string; role?: string } | null): void {
  if (!user) {
    // TODO: Sentry.setUser(null);
    return;
  }

  // TODO: Sentry.setUser({ id: user.id, email: user.email, role: user.role });
}

/**
 * Create a performance transaction span.
 */
export function startSpan(name: string, op: string) {
  const start = performance.now();

  return {
    finish: () => {
      const duration = performance.now() - start;
      if (process.env.NODE_ENV === "development" && duration > 1000) {
        console.warn(`[PERF] ${op}/${name} took ${duration.toFixed(0)}ms`);
      }
    },
  };
}
