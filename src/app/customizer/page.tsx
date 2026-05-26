import type { Metadata } from "next";
import CustomizerClient from "@/features/customizer/components/CustomizerClient";
import { siteConfig } from "@/config/site";
import { generateBreadcrumbSchema } from "@/shared/lib/jsonLd";

export const metadata: Metadata = {
  title: "Custom Builder — Co-create Your Own Companion",
  description:
    "Design your own handmade crochet companion. Choose yarn color, eye style, accessories, and name. Every custom doll is hand-stitched with love in our Bekasi studio.",
  alternates: {
    canonical: "/customizer",
  },
  openGraph: {
    title: "Custom Builder | dip.crochet",
    description:
      "Co-create your own forever friend. Choose every detail and we'll bring it to life.",
    type: "website",
    url: `${siteConfig.url}/customizer`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CustomizerPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Custom Builder", url: `${siteConfig.url}/customizer` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CustomizerClient />
    </>
  );
}
