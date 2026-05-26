/**
 * Server Instrumentation — runs once when the server starts.
 *
 * Used for:
 * - Environment variable validation
 * - Security checks
 * - Database connection verification
 * - Monitoring initialization
 */

export async function register() {
  // Validate critical environment variables
  if (process.env.NODE_ENV === "production") {
    const required = ["AUTH_SECRET"];
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
      console.error(
        `❌ CRITICAL: Missing required environment variables: ${missing.join(", ")}`
      );
      console.error("   The application may not function correctly.");
    }

    // Warn about optional but recommended variables
    const recommended = ["DATABASE_URL", "NEXT_PUBLIC_GTM_ID"];
    const missingRecommended = recommended.filter((key) => !process.env[key]);

    if (missingRecommended.length > 0) {
      console.warn(
        `⚠️  Missing recommended environment variables: ${missingRecommended.join(", ")}`
      );
    }
  }

  console.log("✓ Server instrumentation complete");
}
