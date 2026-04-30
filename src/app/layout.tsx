import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "dip.crochet — Premium Handmade Crochet Characters",
  description:
    "Discover premium handmade amigurumi crochet keychains and custom dolls. Each character has a unique personality and story. Build your own custom companion today.",
  keywords: ["crochet", "amigurumi", "handmade", "kawaii", "doll", "keychain", "custom gift", "dip.crochet"],
  openGraph: {
    title: "dip.crochet — Premium Handmade Crochet Characters",
    description:
      "Every stitch tells a story. Discover our premium character series or build your own custom companion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fffbf9]">{children}</body>
    </html>
  );
}
