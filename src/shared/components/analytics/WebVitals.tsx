"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Web Vitals Reporter — sends Core Web Vitals metrics to GA4 via dataLayer.
 * This enables monitoring LCP, CLS, INP, FCP, TTFB in Google Analytics.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to GA4 via dataLayer
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "web_vitals",
        web_vital_name: metric.name,
        web_vital_value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        web_vital_id: metric.id,
        web_vital_rating: metric.rating,
      });
    }
  });

  return null;
}
