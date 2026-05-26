import { z } from "zod";

/**
 * Order validation schemas.
 */

export const orderStatusSchema = z.enum([
  "PENDING",
  "CONFIRMED",
  "CRAFTING",
  "QUALITY_CHECK",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
]);

export const orderItemSchema = z.object({
  productId: z.string().optional(),
  productName: z.string().min(1),
  price: z.number().int().min(0),
  quantity: z.number().int().min(1).default(1),
  color: z.string().optional(),
  eyeStyle: z.string().optional(),
  accessory: z.string().optional(),
  customName: z.string().max(30).optional(),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(2, "Name is required").max(100),
  customerPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15)
    .regex(/^[0-9+]+$/, "Invalid phone number"),
  customerEmail: z.string().email().optional(),
  items: z.array(orderItemSchema).min(1, "Order must have at least 1 item"),
  shippingMethod: z.string().optional(),
  shippingAddress: z.string().optional(),
  isGift: z.boolean().default(false),
  giftMessage: z.string().max(500).optional(),
  customNotes: z.string().max(1000).optional(),
  // Attribution
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: orderStatusSchema,
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
