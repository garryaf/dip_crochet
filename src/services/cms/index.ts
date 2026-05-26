/**
 * CMS Service — Content Management Abstraction Layer
 *
 * Provides a unified API for fetching CMS-managed content.
 * Currently returns static data (Sprint 3 Phase 1).
 * Will be connected to Sanity CMS in production.
 *
 * This abstraction ensures:
 * - UI components don't know about the CMS provider
 * - Easy migration from static → Sanity → any other CMS
 * - Content is typed and validated
 */

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  socialProof: string;
  featuredCharacter: { name: string; quote: string };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  text: string;
  character: string;
  rating: number;
}

export interface MakerContent {
  title: string;
  subtitle: string;
  bio: string[];
  stats: { label: string; value: string }[];
}

export interface TikTokVideo {
  id: string;
  tag: string;
}

// ============================================
// CONTENT FETCHERS
// ============================================

/**
 * Get hero section content.
 */
export async function getHeroContent(): Promise<HeroContent> {
  return {
    badge: "Every stitch contains a piece of heart",
    title: "Every",
    titleHighlight: "stitch",
    subtitle:
      "Your memories, hand-crocheted. Discover our artisan character series — or co-create your own companion from scratch.",
    primaryCTA: { text: "Adopt a Companion", href: "/products" },
    secondaryCTA: { text: "Co-create Yours", href: "/customizer" },
    socialProof: "Trusted by 2,000+ souls",
    featuredCharacter: {
      name: "Momo Bunny",
      quote: "I was made to listen to secrets and share strawberry dreams.",
    },
  };
}

/**
 * Get FAQ content.
 */
export async function getFAQs(): Promise<FAQItem[]> {
  return [
    {
      id: "faq-1",
      question: "Is it safe for children?",
      answer:
        "Absolutely. We use premium non-toxic milk cotton and 'safety eyes' that are securely fastened from the inside. However, for infants, we recommend our 'Sleepy Style' (embroidered eyes) for maximum safety.",
      category: "general",
    },
    {
      id: "faq-2",
      question: "How do I take care of my companion?",
      answer:
        "Think of them as delicate art. We recommend a gentle hand wash with mild soap and air drying. Avoid machine washing to keep the fiber texture soft and the shape intact.",
      category: "general",
    },
    {
      id: "faq-3",
      question: "Do you ship outside of Bekasi?",
      answer:
        "Yes! We ship across Indonesia via JNE/J&T. Every soul is packed in a premium gift box to ensure they arrive safely and ready for adoption.",
      category: "shipping",
    },
    {
      id: "faq-4",
      question: "Can I request a custom design not in the builder?",
      answer:
        "We love a challenge! If you have a specific character or idea in mind, chat with us on WhatsApp. Our master artisan will see if we can bring your vision to life.",
      category: "custom",
    },
  ];
}

/**
 * Get testimonials/reviews.
 */
export async function getTestimonials(): Promise<TestimonialItem[]> {
  return [
    {
      id: "review-1",
      name: "Salsabila K.",
      location: "Jakarta",
      text: "Momo is even cuter in person! The texture is so soft and the custom name tag makes it feel so personal. High quality work!",
      character: "Momo (Bunny)",
      rating: 5,
    },
    {
      id: "review-2",
      name: "Ravi A.",
      location: "Bandung",
      text: "Ordered a custom bear as a gift for my partner. The artisan was so helpful on WhatsApp. She loved it!",
      character: "Kopi (Bear)",
      rating: 5,
    },
    {
      id: "review-3",
      name: "Indah P.",
      location: "Bekasi",
      text: "Support local artisans! Stitched with so much love. You can really feel the difference between this and store-bought toys.",
      character: "Pip (Duck)",
      rating: 5,
    },
  ];
}

/**
 * Get maker/about content.
 */
export async function getMakerContent(): Promise<MakerContent> {
  return {
    title: "Handmade with soul, for yours.",
    subtitle: "Meet the human behind the stitch",
    bio: [
      "Hi, I'm the creator behind dip.crochet. What started as a way to find calm through ASMR crochet evolved into a mission to create physical companions for life's big (and small) moments.",
      "When you adopt a companion from my studio, you're not just buying yarn and stuffing. You're supporting hours of focused craftsmanship and a commitment to keeping handmade art alive.",
    ],
    stats: [
      { label: "100% Love", value: "No machines, just hands." },
      { label: "Bespoke", value: "Every doll is unique." },
    ],
  };
}

/**
 * Get TikTok video IDs for spotlight section.
 */
export async function getTikTokVideos(): Promise<TikTokVideo[]> {
  return [
    { id: "7608837833268219144", tag: "#crochetasmr" },
    { id: "7603159595636231431", tag: "#handmade" },
    { id: "7602729212436434184", tag: "#crochettips" },
    { id: "7600982266721864968", tag: "#giftideas" },
  ];
}

/**
 * Get a content block by key.
 * Used for individual editable text blocks.
 */
export async function getContentBlock(key: string): Promise<string | null> {
  const blocks: Record<string, string> = {
    announcement_bar: "🎓 Graduation Collection 2024 — Order now for June delivery!",
    footer_tagline:
      "Creating emotional connections through handmade crochet art. Every piece is unique, just like you.",
  };

  return blocks[key] || null;
}
