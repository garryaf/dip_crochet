/**
 * Client Instrumentation — runs before the app's frontend code starts.
 * Used for early analytics initialization and global error tracking.
 *
 * Next.js 16 supports this file convention for client-side setup.
 */

// Initialize dataLayer early for GTM
window.dataLayer = window.dataLayer || [];

// Capture UTM parameters on first page load
(function captureUTM() {
  const UTM_STORAGE_KEY = "cotcret_utm_params";
  const existing = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (existing) return;

  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const utmData: Record<string, string> = {};
  let hasUTM = false;

  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) {
      utmData[key] = value;
      hasUTM = true;
    }
  }

  utmData.referrer = document.referrer || "direct";
  utmData.landing_page = window.location.pathname;
  utmData.timestamp = new Date().toISOString();

  if (hasUTM || document.referrer) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));

    // Push UTM data to dataLayer for GTM
    window.dataLayer.push({
      event: "utm_captured",
      ...utmData,
    });
  }
})();

// Global error tracking (will be sent to Sentry in Sprint 6)
window.addEventListener("error", (event) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "js_error",
    error_message: event.message,
    error_source: event.filename,
    error_line: event.lineno,
  });
});

// Track unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "js_error",
    error_message: `Unhandled Promise: ${event.reason}`,
    error_source: "promise",
  });
});
