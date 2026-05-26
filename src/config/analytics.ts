/**
 * Analytics & Marketing Configuration
 * Central configuration for all tracking IDs and pixel settings.
 *
 * IMPORTANT: In production, these values should come from environment variables.
 * For now, we use placeholder IDs that can be replaced when accounts are set up.
 */

export const analyticsConfig = {
  // Google Tag Manager
  gtm: {
    containerId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX",
    enabled: !!process.env.NEXT_PUBLIC_GTM_ID,
  },

  // Google Analytics 4
  ga4: {
    measurementId: process.env.NEXT_PUBLIC_GA4_ID || "G-XXXXXXXXXX",
    enabled: !!process.env.NEXT_PUBLIC_GA4_ID,
  },

  // Meta (Facebook) Pixel
  metaPixel: {
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
    enabled: !!process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },

  // TikTok Pixel
  tiktokPixel: {
    pixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "",
    enabled: !!process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
  },

  // Microsoft Clarity
  clarity: {
    projectId: process.env.NEXT_PUBLIC_CLARITY_ID || "",
    enabled: !!process.env.NEXT_PUBLIC_CLARITY_ID,
  },
} as const;

/**
 * E-commerce event types for consistent tracking across all platforms.
 */
export type AnalyticsEvent =
  | "page_view"
  | "view_item"
  | "view_item_list"
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "purchase"
  | "whatsapp_click"
  | "customizer_interaction"
  | "customizer_complete"
  | "newsletter_signup"
  | "cta_click"
  | "social_click"
  | "share"
  | "search"
  | "lead"
  | "contact";

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  category?: string;
  label?: string;
  value?: number;
  currency?: string;
  items?: AnalyticsItem[];
  custom?: Record<string, string | number | boolean>;
}

export interface AnalyticsItem {
  item_id: string;
  item_name: string;
  price: number;
  currency?: string;
  quantity?: number;
  item_category?: string;
  item_variant?: string;
}
