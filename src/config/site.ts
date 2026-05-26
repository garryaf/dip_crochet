/**
 * Central site configuration.
 * Single source of truth for URLs, brand info, and SEO defaults.
 */

export const siteConfig = {
  name: "dip.crochet",
  tagline: "Premium Handmade Crochet Characters",
  description:
    "Discover premium handmade amigurumi crochet keychains and custom dolls. Each character has a unique personality and story. Build your own custom companion today.",
  url: "https://dipcrochet-nine.vercel.app",
  locale: "id_ID",
  language: "id",
  creator: "dip.crochet",
  keywords: [
    "crochet",
    "amigurumi",
    "handmade",
    "kawaii",
    "boneka rajut",
    "keychain",
    "custom gift",
    "dip.crochet",
    "bekasi",
    "graduation gift",
    "hadiah wisuda",
  ],
  social: {
    instagram: "https://www.instagram.com/dip_crochet/",
    tiktok: "https://www.tiktok.com/@dip.crochet_",
    whatsapp: "6281382861049",
    googleMaps: "https://maps.app.goo.gl/whTVfq1q1CXneE3A7",
  },
  address: {
    street: "RT.001/RW.010",
    locality: "Jatisampurna",
    city: "Bekasi",
    region: "West Java",
    postalCode: "17433",
    country: "ID",
  },
  openGraph: {
    type: "website" as const,
    siteName: "dip.crochet",
    locale: "id_ID",
  },
} as const;

export type SiteConfig = typeof siteConfig;
