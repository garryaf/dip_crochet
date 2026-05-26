/**
 * Enhanced E-commerce DataLayer Events
 *
 * Implements GA4 Enhanced E-commerce event format.
 * These events are pushed to the dataLayer and picked up by GTM.
 *
 * Reference: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

interface EcommerceItem {
  item_id: string;
  item_name: string;
  price: number;
  currency: string;
  quantity: number;
  item_category?: string;
  item_variant?: string;
  item_brand?: string;
  index?: number;
}

function pushEcommerceEvent(eventName: string, data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  // Clear previous ecommerce data to prevent contamination
  window.dataLayer.push({ ecommerce: null });

  window.dataLayer.push({
    event: eventName,
    ecommerce: data,
  });
}

/**
 * Track when a user views a product listing page
 */
export function trackViewItemList(
  items: EcommerceItem[],
  listId: string,
  listName: string
): void {
  pushEcommerceEvent("view_item_list", {
    item_list_id: listId,
    item_list_name: listName,
    items: items.map((item, index) => ({
      ...item,
      index,
      item_brand: "dip.crochet",
    })),
  });
}

/**
 * Track when a user views a product detail page
 */
export function trackViewItem(item: EcommerceItem): void {
  pushEcommerceEvent("view_item", {
    currency: "IDR",
    value: item.price,
    items: [
      {
        ...item,
        item_brand: "dip.crochet",
      },
    ],
  });
}

/**
 * Track when a user clicks on a product in a list
 */
export function trackSelectItem(item: EcommerceItem, listName: string): void {
  pushEcommerceEvent("select_item", {
    item_list_name: listName,
    items: [
      {
        ...item,
        item_brand: "dip.crochet",
      },
    ],
  });
}

/**
 * Track when a user adds a product to cart
 */
export function trackAddToCart(item: EcommerceItem): void {
  pushEcommerceEvent("add_to_cart", {
    currency: "IDR",
    value: item.price * item.quantity,
    items: [
      {
        ...item,
        item_brand: "dip.crochet",
      },
    ],
  });
}

/**
 * Track when a user begins checkout (WhatsApp order initiation)
 */
export function trackBeginCheckout(items: EcommerceItem[], value: number): void {
  pushEcommerceEvent("begin_checkout", {
    currency: "IDR",
    value,
    items: items.map((item) => ({
      ...item,
      item_brand: "dip.crochet",
    })),
  });
}

/**
 * Track when a user generates a lead (WhatsApp message sent)
 */
export function trackGenerateLead(value: number, source: string): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    currency: "IDR",
    value,
    lead_source: source,
  });
}
