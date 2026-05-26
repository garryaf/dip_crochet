/**
 * UTM Parameter Tracking Utility
 *
 * Captures UTM parameters from URL on first visit and persists them
 * in sessionStorage for attribution throughout the session.
 *
 * Usage:
 *   import { captureUTMParams, getUTMParams } from "@/services/analytics/utm";
 *   captureUTMParams(); // Call on app mount
 *   const utmData = getUTMParams(); // Get stored UTM data
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  timestamp?: string;
}

const UTM_STORAGE_KEY = "cotcret_utm_params";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

/**
 * Capture UTM parameters from the current URL and store in sessionStorage.
 * Only captures on first visit (doesn't overwrite existing data).
 */
export function captureUTMParams(): void {
  if (typeof window === "undefined") return;

  // Don't overwrite existing UTM data in this session
  const existing = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (existing) return;

  const params = new URLSearchParams(window.location.search);
  const utmData: UTMParams = {};
  let hasUTM = false;

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      utmData[key] = value;
      hasUTM = true;
    }
  }

  // Always capture referrer and landing page
  utmData.referrer = document.referrer || "direct";
  utmData.landing_page = window.location.pathname;
  utmData.timestamp = new Date().toISOString();

  if (hasUTM || document.referrer) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
  }
}

/**
 * Retrieve stored UTM parameters.
 */
export function getUTMParams(): UTMParams | null {
  if (typeof window === "undefined") return null;

  const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as UTMParams;
  } catch {
    return null;
  }
}

/**
 * Append UTM data to a WhatsApp message for offline attribution.
 * This helps track which marketing channel drove the WhatsApp conversion.
 */
export function appendUTMToMessage(message: string): string {
  const utm = getUTMParams();
  if (!utm || !utm.utm_source) return message;

  const attribution = `\n\n[Ref: ${utm.utm_source}/${utm.utm_medium || "organic"}${utm.utm_campaign ? `/${utm.utm_campaign}` : ""}]`;
  return message + attribution;
}
