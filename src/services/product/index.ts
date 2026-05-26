/**
 * Product Service — Data Access Layer
 *
 * Provides typed, validated access to product data.
 * Currently uses static data from constants (Sprint 3 Phase 1).
 * Will be migrated to Prisma queries when database is connected.
 *
 * This abstraction allows the UI to remain unchanged when
 * switching from static data to database queries.
 */

import { CHARACTERS, BUNDLES, COLORS, EYE_STYLES, ACCESSORIES } from "@/lib/constants";

export interface ProductDTO {
  id: string;
  slug: string;
  name: string;
  price: number;
  color: string;
  personality: string;
  story: string;
  image: string | null;
  category: "CHARACTER" | "GRADUATION" | "BUNDLE" | "CUSTOM";
  status: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK";
  featured: boolean;
}

export interface ColorOptionDTO {
  name: string;
  value: string;
}

export interface EyeStyleDTO {
  id: string;
  name: string;
}

export interface AccessoryDTO {
  id: string;
  name: string;
  price: number;
}

/**
 * Get all active products.
 * TODO: Replace with Prisma query when DB is connected.
 */
export async function getProducts(): Promise<ProductDTO[]> {
  // Simulate async data fetch (will be real DB query later)
  return CHARACTERS.map((char) => ({
    id: char.id,
    slug: char.id,
    name: char.name,
    price: char.price,
    color: char.color,
    personality: char.personality,
    story: char.story,
    image: char.image,
    category: "CHARACTER" as const,
    status: "ACTIVE" as const,
    featured: true,
  }));
}

/**
 * Get a single product by slug/id.
 */
export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

/**
 * Get featured products (for homepage).
 */
export async function getFeaturedProducts(): Promise<ProductDTO[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}

/**
 * Get all bundles.
 */
export async function getBundles() {
  return BUNDLES;
}

/**
 * Get available color options.
 */
export async function getColorOptions(): Promise<ColorOptionDTO[]> {
  return COLORS;
}

/**
 * Get available eye styles.
 */
export async function getEyeStyles(): Promise<EyeStyleDTO[]> {
  return EYE_STYLES;
}

/**
 * Get available accessories.
 */
export async function getAccessories(): Promise<AccessoryDTO[]> {
  return ACCESSORIES.map((acc) => ({
    ...acc,
    price: 0,
  }));
}

/**
 * Get product count (for sitemap, pagination).
 */
export async function getProductCount(): Promise<number> {
  const products = await getProducts();
  return products.length;
}

/**
 * Search products by name or personality.
 */
export async function searchProducts(query: string): Promise<ProductDTO[]> {
  const products = await getProducts();
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.personality.toLowerCase().includes(lowerQuery) ||
      p.story.toLowerCase().includes(lowerQuery)
  );
}
