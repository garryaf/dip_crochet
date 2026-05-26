/**
 * Analytics Service — Unified Event Tracking Layer
 *
 * This service provides a single API to track events across all platforms:
 * - Google Analytics 4 (via GTM dataLayer)
 * - Meta Pixel (fbq)
 * - TikTok Pixel (ttq)
 *
 * Usage:
 *   import { analytics } from "@/services/analytics";
 *   analytics.trackEvent({ event: "view_item", items: [...] });
 *   analytics.trackWhatsAppClick("Momo Bunny", 95000);
 */

import type { AnalyticsEvent, AnalyticsEventData, AnalyticsItem } from "@/config/analytics";

// Type declarations for global tracking objects
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq: (...args: unknown[]) => void;
    ttq: {
      track: (event: string, data?: Record<string, unknown>) => void;
      page: () => void;
    };
    gtag: (...args: unknown[]) => void;
  }
}

class AnalyticsService {
  private isClient = typeof window !== "undefined";

  /**
   * Push event to GTM dataLayer (GA4 picks this up automatically)
   */
  private pushToDataLayer(data: Record<string, unknown>): void {
    if (!this.isClient) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }

  /**
   * Send event to Meta Pixel
   */
  private trackMetaPixel(event: string, data?: Record<string, unknown>): void {
    if (!this.isClient || typeof window.fbq !== "function") return;
    if (data) {
      window.fbq("track", event, data);
    } else {
      window.fbq("track", event);
    }
  }

  /**
   * Send event to TikTok Pixel
   */
  private trackTikTokPixel(event: string, data?: Record<string, unknown>): void {
    if (!this.isClient || !window.ttq) return;
    window.ttq.track(event, data);
  }

  /**
   * Universal event tracker — sends to all platforms
   */
  trackEvent(eventData: AnalyticsEventData): void {
    const { event, category, label, value, currency, items, custom } = eventData;

    // GTM / GA4
    this.pushToDataLayer({
      event,
      event_category: category,
      event_label: label,
      value,
      currency: currency || "IDR",
      items,
      ...custom,
    });

    // Meta Pixel mapping
    const metaEventMap: Partial<Record<AnalyticsEvent, string>> = {
      view_item: "ViewContent",
      add_to_cart: "AddToCart",
      begin_checkout: "InitiateCheckout",
      purchase: "Purchase",
      lead: "Lead",
      contact: "Contact",
      customizer_complete: "CustomizeProduct",
      search: "Search",
    };

    const metaEvent = metaEventMap[event];
    if (metaEvent) {
      this.trackMetaPixel(metaEvent, {
        content_type: "product",
        content_ids: items?.map((i) => i.item_id),
        value,
        currency: currency || "IDR",
      });
    }

    // TikTok Pixel mapping
    const tiktokEventMap: Partial<Record<AnalyticsEvent, string>> = {
      view_item: "ViewContent",
      add_to_cart: "AddToCart",
      begin_checkout: "InitiateCheckout",
      purchase: "CompletePayment",
      whatsapp_click: "Contact",
      customizer_complete: "SubmitForm",
    };

    const tiktokEvent = tiktokEventMap[event];
    if (tiktokEvent) {
      this.trackTikTokPixel(tiktokEvent, {
        content_type: "product",
        content_id: items?.[0]?.item_id,
        value,
        currency: currency || "IDR",
      });
    }
  }

  /**
   * Track product view
   */
  trackViewItem(item: AnalyticsItem): void {
    this.trackEvent({
      event: "view_item",
      value: item.price,
      currency: "IDR",
      items: [item],
    });
  }

  /**
   * Track product list view
   */
  trackViewItemList(items: AnalyticsItem[], listName: string): void {
    this.trackEvent({
      event: "view_item_list",
      category: listName,
      items,
    });
  }

  /**
   * Track WhatsApp click (critical conversion event)
   */
  trackWhatsAppClick(productName: string, value: number): void {
    this.trackEvent({
      event: "whatsapp_click",
      category: "conversion",
      label: productName,
      value,
      currency: "IDR",
      items: [
        {
          item_id: productName.toLowerCase().replace(/\s+/g, "-"),
          item_name: productName,
          price: value,
          currency: "IDR",
        },
      ],
    });

    // Also track as Lead for Meta
    this.trackMetaPixel("Lead", {
      content_name: productName,
      value,
      currency: "IDR",
    });

    // Also track as Contact for TikTok
    this.trackTikTokPixel("Contact", {
      content_name: productName,
    });
  }

  /**
   * Track customizer interaction
   */
  trackCustomizerInteraction(action: string, detail: string): void {
    this.trackEvent({
      event: "customizer_interaction",
      category: "engagement",
      label: `${action}: ${detail}`,
    });
  }

  /**
   * Track customizer completion (order via WhatsApp)
   */
  trackCustomizerComplete(config: Record<string, string>, value: number): void {
    this.trackEvent({
      event: "customizer_complete",
      category: "conversion",
      label: JSON.stringify(config),
      value,
      currency: "IDR",
    });
  }

  /**
   * Track CTA click
   */
  trackCTAClick(ctaName: string, destination: string): void {
    this.trackEvent({
      event: "cta_click",
      category: "engagement",
      label: `${ctaName} → ${destination}`,
    });
  }

  /**
   * Track social link click
   */
  trackSocialClick(platform: string): void {
    this.trackEvent({
      event: "social_click",
      category: "engagement",
      label: platform,
    });
  }

  /**
   * Track newsletter signup
   */
  trackNewsletterSignup(source: string): void {
    this.trackEvent({
      event: "newsletter_signup",
      category: "conversion",
      label: source,
    });

    this.trackMetaPixel("Lead", { content_name: "newsletter" });
    this.trackTikTokPixel("SubmitForm", { content_name: "newsletter" });
  }

  /**
   * Track page view (called automatically by GTM, but useful for SPA navigation)
   */
  trackPageView(url: string, title: string): void {
    this.pushToDataLayer({
      event: "page_view",
      page_location: url,
      page_title: title,
    });

    // TikTok page view
    if (this.isClient && window.ttq) {
      window.ttq.page();
    }
  }
}

// Singleton instance
export const analytics = new AnalyticsService();
