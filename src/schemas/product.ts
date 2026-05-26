import { z } from "zod";

/**
 * Product validation schemas.
 * Used for API validation, form validation, and type inference.
 */

export const productCategorySchema = z.enum([
  "CHARACTER",
  "GRADUATION",
  "BUNDLE",
  "CUSTOM",
  "ACCESSORY",
]);

export const productStatusSchema = z.enum([
  "ACTIVE",
  "DRAFT",
  "OUT_OF_STOCK",
  "ARCHIVED",
]);

export const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  story: z.string().optional(),
  personality: z.string().optional(),
  price: z.number().int().min(1000, "Price must be at least IDR 1.000"),
  comparePrice: z.number().int().optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color"),
  image: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  category: productCategorySchema.default("CHARACTER"),
  status: productStatusSchema.default("ACTIVE"),
  stock: z.number().int().min(0).default(0),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const productFilterSchema = z.object({
  category: productCategorySchema.optional(),
  status: productStatusSchema.optional(),
  featured: z.boolean().optional(),
  minPrice: z.number().int().optional(),
  maxPrice: z.number().int().optional(),
  search: z.string().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(12),
  sortBy: z.enum(["price", "name", "createdAt", "sortOrder"]).default("sortOrder"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductFilter = z.infer<typeof productFilterSchema>;
