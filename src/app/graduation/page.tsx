import type { Metadata } from "next";
import Navigation from "@/shared/components/layout/Navigation";
import Footer from "@/shared/components/layout/Footer";
import HeroSection from "@/features/graduation/components/HeroSection";
import PreviewSection from "@/features/graduation/components/PreviewSection";
import OrderForm from "@/features/graduation/components/OrderForm";
import { siteConfig } from "@/config/site";
import { generateBreadcrumbSchema } from "@/shared/lib/jsonLd";

export const metadata: Metadata = {
  title: "Graduation Collection — Hadiah Wisuda Handmade",
  description:
    "Boneka rajut wisuda custom dengan topi toga, diploma kayu, dan name tag personal. Hadiah wisuda yang berkesan dan tahan lama. Pesan sekarang via WhatsApp.",
  alternates: {
    canonical: "/graduation",
  },
  openGraph: {
    title: "Graduation Collection | dip.crochet",
    description:
      "A keepsake that lasts a lifetime. Custom graduation dolls with personalized details.",
    type: "website",
    url: `${siteConfig.url}/graduation`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GraduationPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Graduation Collection", url: `${siteConfig.url}/graduation` },
  ]);

  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navigation />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-28 texture-bg w-full">
        <HeroSection />

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          <PreviewSection />
          <OrderForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
