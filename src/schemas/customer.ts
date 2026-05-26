import { z } from "zod";

/**
 * Customer validation schemas.
 */

export const customerRoleSchema = z.enum(["CUSTOMER", "ADMIN", "ARTISAN"]);

export const createCustomerSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .min(10)
    .max(15)
    .regex(/^[0-9+]+$/, "Invalid phone number")
    .optional(),
  role: customerRoleSchema.default("CUSTOMER"),
});

export const updateCustomerSchema = createCustomerSchema.partial().omit({ email: true });

export const addressSchema = z.object({
  label: z.string().min(1).max(50),
  street: z.string().min(5, "Street address is required").max(200),
  city: z.string().min(2).max(100),
  province: z.string().min(2).max(100),
  postalCode: z.string().min(5).max(10),
  phone: z.string().optional(),
  isDefault: z.boolean().default(false),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().max(100).optional(),
  source: z.string().max(50).optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
