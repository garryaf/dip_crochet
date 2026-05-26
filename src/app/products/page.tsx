import type { Metadata } from "next";
import Navigation from "@/shared/components/layout/Navigation";
import Footer from "@/shared/components/layout/Footer";
import ProductGrid from "@/features/products/components/ProductGrid";
import ProductsHeader from "@/features/products/components/ProductsHeader";
import { siteConfig } from "@/config/site";
import { generateBreadcrumbSchema } from "@/shared/lib/jsonLd";
import { CHARACTERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shop All Characters | dip.crochet",
  description:
    "Explore our artisan character series. Each companion is hand-crocheted in our studio and is ready to start a new story with you. Momo Bunny, Kopi Bear, Pip Duck and more.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Shop All Characters | dip.crochet",
    description:
      "Discover premium handmade crochet characters. Each one is unique, hand-stitched with love.",
    type: "website",
    url: `${siteConfig.url}/products`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Shop All", url: `${siteConfig.url}/products` },
  ]);

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "dip.crochet Character Collection",
    description: "Premium handmade crochet character series",
    numberOfItems: CHARACTERS.length,
    itemListElement: CHARACTERS.map((char, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/product/${char.id}`,
      name: char.name,
    })),
  };

  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col selection:bg-primary/20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />

      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-28 texture-bg">
        <ProductsHeader />
        <ProductGrid characters={CHARACTERS} />
      </main>

      <Footer />
    </div>
  );
}
