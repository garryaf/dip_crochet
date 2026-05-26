import { z } from "zod";

/**
 * Review validation schemas.
 */

export const reviewStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"]);

export const createReviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(100).optional(),
  content: z.string().min(10, "Review must be at least 10 characters").max(1000),
  authorName: z.string().min(2).max(50),
  location: z.string().max(50).optional(),
  images: z.array(z.string().url()).max(5).optional(),
});

export const moderateReviewSchema = z.object({
  status: reviewStatusSchema,
  featured: z.boolean().optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type ModerateReviewInput = z.infer<typeof moderateReviewSchema>;
