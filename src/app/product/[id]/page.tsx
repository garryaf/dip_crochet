import { CHARACTERS } from "@/lib/constants";
import ProductDetailClient from "./ProductDetailClient";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { generateProductSchema, generateBreadcrumbSchema } from "@/shared/lib/jsonLd";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const character = CHARACTERS.find((c) => c.id === id);

  if (!character) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${character.name} — Premium Handmade Crochet`,
    description: character.story,
    alternates: {
      canonical: `/product/${id}`,
    },
    openGraph: {
      title: `${character.name} | ${siteConfig.name}`,
      description: character.story,
      type: "website",
      url: `${siteConfig.url}/product/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${character.name} | ${siteConfig.name}`,
      description: character.story,
    },
  };
}

export async function generateStaticParams() {
  return CHARACTERS.map((char) => ({
    id: char.id,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const character = CHARACTERS.find((c) => c.id === id);

  if (!character) {
    notFound();
  }

  const productSchema = generateProductSchema({
    name: character.name,
    description: character.story,
    price: character.price,
    id: character.id,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Shop All", url: `${siteConfig.url}/products` },
    { name: character.name, url: `${siteConfig.url}/product/${id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient id={id} />
    </>
  );
}
