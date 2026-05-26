/**
 * Order Service — Business Logic Layer
 *
 * Handles order creation, status updates, and order number generation.
 * Currently generates WhatsApp messages (Sprint 3 Phase 1).
 * Will be migrated to Prisma + WhatsApp API when DB is connected.
 */

import { type CreateOrderInput } from "@/schemas/order";
import { getWhatsAppLink } from "@/lib/constants";

/**
 * Generate a human-readable order number.
 * Format: DPC-YYYYMMDD-XXX
 */
export function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, "0");
  return `DPC-${date}-${random}`;
}

/**
 * Format order data into a WhatsApp message.
 */
export function formatOrderMessage(order: CreateOrderInput): string {
  const orderNumber = generateOrderNumber();

  let message = `🧸 *PESANAN BARU — ${orderNumber}*\n\n`;
  message += `👤 *Nama:* ${order.customerName}\n`;
  message += `📱 *HP:* ${order.customerPhone}\n`;

  if (order.customerEmail) {
    message += `📧 *Email:* ${order.customerEmail}\n`;
  }

  message += `\n📦 *Detail Pesanan:*\n`;
  message += `${"─".repeat(30)}\n`;

  let subtotal = 0;
  for (const item of order.items) {
    message += `• ${item.productName}`;
    if (item.color) message += ` (${item.color})`;
    if (item.eyeStyle) message += ` — Mata: ${item.eyeStyle}`;
    if (item.accessory && item.accessory !== "none") message += ` + ${item.accessory}`;
    if (item.customName) message += ` — Nama: "${item.customName}"`;
    message += `\n  Qty: ${item.quantity} × IDR ${item.price.toLocaleString("id-ID")}\n`;
    subtotal += item.price * item.quantity;
  }

  message += `${"─".repeat(30)}\n`;
  message += `💰 *Total: IDR ${subtotal.toLocaleString("id-ID")}*\n`;

  if (order.isGift) {
    message += `\n🎁 *UNTUK HADIAH*\n`;
    if (order.giftMessage) {
      message += `Pesan: "${order.giftMessage}"\n`;
    }
  }

  if (order.shippingMethod) {
    message += `\n🚚 *Pengiriman:* ${order.shippingMethod}\n`;
  }

  if (order.shippingAddress) {
    message += `📍 *Alamat:* ${order.shippingAddress}\n`;
  }

  if (order.customNotes) {
    message += `\n📝 *Catatan:* ${order.customNotes}\n`;
  }

  // Attribution
  if (order.utmSource) {
    message += `\n[Ref: ${order.utmSource}/${order.utmMedium || "direct"}${order.utmCampaign ? `/${order.utmCampaign}` : ""}]`;
  }

  return message;
}

/**
 * Create an order and generate WhatsApp link.
 * In the future, this will also persist to database.
 */
export function createOrderWhatsAppLink(order: CreateOrderInput): string {
  const message = formatOrderMessage(order);
  return getWhatsAppLink(message);
}

/**
 * Calculate order totals.
 */
export function calculateOrderTotals(items: CreateOrderInput["items"]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 0; // Free for now
  const discount = 0;
  const total = subtotal + shippingCost - discount;

  return { subtotal, shippingCost, discount, total };
}
