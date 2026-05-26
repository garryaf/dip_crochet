"use client";

import { useCallback } from "react";
import { analytics } from "@/services/analytics";
import type { AnalyticsItem } from "@/config/analytics";

/**
 * Hook for tracking analytics events in components.
 * Provides memoized tracking functions to avoid unnecessary re-renders.
 *
 * Usage:
 *   const { trackViewItem, trackWhatsAppClick } = useAnalytics();
 *   trackViewItem({ item_id: "momo-bunny", item_name: "Momo", price: 95000 });
 */
export function useAnalytics() {
  const trackViewItem = useCallback((item: AnalyticsItem) => {
    analytics.trackViewItem(item);
  }, []);

  const trackViewItemList = useCallback((items: AnalyticsItem[], listName: string) => {
    analytics.trackViewItemList(items, listName);
  }, []);

  const trackWhatsAppClick = useCallback((productName: string, value: number) => {
    analytics.trackWhatsAppClick(productName, value);
  }, []);

  const trackCustomizerInteraction = useCallback((action: string, detail: string) => {
    analytics.trackCustomizerInteraction(action, detail);
  }, []);

  const trackCustomizerComplete = useCallback(
    (config: Record<string, string>, value: number) => {
      analytics.trackCustomizerComplete(config, value);
    },
    []
  );

  const trackCTAClick = useCallback((ctaName: string, destination: string) => {
    analytics.trackCTAClick(ctaName, destination);
  }, []);

  const trackSocialClick = useCallback((platform: string) => {
    analytics.trackSocialClick(platform);
  }, []);

  const trackNewsletterSignup = useCallback((source: string) => {
    analytics.trackNewsletterSignup(source);
  }, []);

  return {
    trackViewItem,
    trackViewItemList,
    trackWhatsAppClick,
    trackCustomizerInteraction,
    trackCustomizerComplete,
    trackCTAClick,
    trackSocialClick,
    trackNewsletterSignup,
  };
}
