import type { Metadata } from "next";
import Navigation from "@/shared/components/layout/Navigation";
import Footer from "@/shared/components/layout/Footer";
import Hero from "@/features/home/components/Hero";
import CharacterSeries from "@/features/home/components/CharacterSeries";
import CustomBuilderCTA from "@/features/home/components/CustomBuilderCTA";
import TikTokSpotlight from "@/features/home/components/TikTokSpotlight";
import MeetTheMaker from "@/features/home/components/MeetTheMaker";
import Reviews from "@/features/home/components/Reviews";
import BundleSection from "@/features/home/components/BundleSection";
import FaqSection from "@/features/home/components/FaqSection";
import Location from "@/features/home/components/Location";
import IntroWrapper from "@/features/intro/components/IntroWrapper";
import { siteConfig } from "@/config/site";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  generateFaqSchema,
} from "@/shared/lib/jsonLd";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: siteConfig.keywords as unknown as string[],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.creator,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      "Every stitch tells a story. Discover our premium character series or build your own custom companion.",
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.openGraph.siteName,
    locale: siteConfig.openGraph.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const FAQ_DATA = [
  {
    question: "Is it safe for children?",
    answer:
      "Absolutely. We use premium non-toxic milk cotton and safety eyes that are securely fastened from the inside.",
  },
  {
    question: "How do I take care of my companion?",
    answer:
      "We recommend a gentle hand wash with mild soap and air drying. Avoid machine washing.",
  },
  {
    question: "Do you ship outside of Bekasi?",
    answer:
      "Yes! We ship across Indonesia via JNE/J&T. Every soul is packed in a premium gift box.",
  },
  {
    question: "Can I request a custom design not in the builder?",
    answer:
      "We love a challenge! Chat with us on WhatsApp and our master artisan will see if we can bring your vision to life.",
  },
];

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();
  const faqSchema = generateFaqSchema(FAQ_DATA);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden selection:bg-primary/20">
      {/* Premium 3D Intro Experience — client-only overlay */}
      <IntroWrapper />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Navigation />

      <main className="texture-bg">
        <Hero />
        <CharacterSeries />
        <CustomBuilderCTA />
        <TikTokSpotlight />
        <MeetTheMaker />
        <Reviews />
        <BundleSection />
        <FaqSection />
        <Location />
      </main>

      <Footer />
    </div>
  );
}
