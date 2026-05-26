/**
 * DataLayer Initialization & Helpers
 *
 * Provides typed access to the GTM dataLayer with
 * proper initialization and safety checks.
 */

/**
 * Initialize the dataLayer with site-wide context.
 * Called once on app mount.
 */
export function initializeDataLayer(): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  // Push initial site context
  window.dataLayer.push({
    event: "datalayer_ready",
    site_name: "dip.crochet",
    site_currency: "IDR",
    site_language: "id",
    site_region: "ID",
    site_category: "e-commerce",
    site_vertical: "handmade_crafts",
  });
}

/**
 * Push a custom event to the dataLayer.
 */
export function pushEvent(
  eventName: string,
  data?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...data,
  });
}

/**
 * Push user properties to the dataLayer (for GA4 user-scoped dimensions).
 */
export function setUserProperties(properties: Record<string, string | number | boolean>): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "set_user_properties",
    user_properties: properties,
  });
}
