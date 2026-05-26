import type { Metadata, Viewport } from "next";
import "./globals.css";
import TrustSignals from "@/shared/components/ui/TrustSignals";
import LiveSupport from "@/shared/components/ui/LiveSupport";
import StickyMobileCTA from "@/shared/components/ui/StickyMobileCTA";
import AnalyticsProvider from "@/shared/providers/AnalyticsProvider";
import CartProvider from "@/shared/providers/CartProvider";
import { WebVitals } from "@/shared/components/analytics/WebVitals";
import { siteConfig } from "@/config/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fffbf9",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords as unknown as string[],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.creator,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fffbf9]">
        <AnalyticsProvider />
        <WebVitals />
        <CartProvider />
        {children}
        <TrustSignals />
        <LiveSupport />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
