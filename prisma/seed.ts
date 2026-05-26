/**
 * Database Seed Script
 *
 * Populates the database with initial product data, color options,
 * eye styles, accessories, FAQs, and testimonials.
 *
 * Run: npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ============================================
  // PRODUCTS
  // ============================================
  const products = [
    {
      slug: "momo-bunny",
      name: "Momo — Secret-Keeper Bunny",
      description:
        "Stitched with extra-soft milk cotton to handle late-night hugs and whispered secrets.",
      story:
        "Stitched with extra-soft milk cotton to handle late-night hugs and whispered secrets. Momo is the perfect companion for those who need a silent, loyal listener.",
      personality: "Empathetic, Quiet, Loyal",
      price: 95000,
      color: "#ff8fb1",
      category: "CHARACTER" as const,
      status: "ACTIVE" as const,
      stock: 5,
      featured: true,
      sortOrder: 1,
      metaTitle: "Momo Bunny — Premium Handmade Crochet Character",
      metaDescription:
        "Meet Momo, the Secret-Keeper Bunny. Hand-crocheted with premium milk cotton. Empathetic, quiet, and loyal.",
    },
    {
      slug: "kopi-bear",
      name: "Kopi — The Midnight Bear",
      description:
        "Made with deep chocolate yarn, Kopi was born to watch over your dreams.",
      story:
        "Made with deep chocolate yarn, Kopi was born to watch over your dreams. He's a bit shy but has the warmest heart (and the softest ears) in the workshop.",
      personality: "Calm, Protective, Warm",
      price: 95000,
      color: "#4a3a35",
      category: "CHARACTER" as const,
      status: "ACTIVE" as const,
      stock: 3,
      featured: true,
      sortOrder: 2,
      metaTitle: "Kopi Bear — Premium Handmade Crochet Character",
      metaDescription:
        "Meet Kopi, The Midnight Bear. Hand-crocheted with deep chocolate yarn. Calm, protective, and warm.",
    },
    {
      slug: "pip-duck",
      name: "Pip — The Optimism Duck",
      description:
        "Pip believes every day is an adventure. Bright yellow stitches to remind you the sun is always there.",
      story:
        "Pip believes every day is an adventure. Even on rainy days, Pip's bright yellow stitches remind you that the sun is always just behind the clouds.",
      personality: "Cheerful, Adventurous, Brave",
      price: 85000,
      color: "#ffca3a",
      category: "CHARACTER" as const,
      status: "ACTIVE" as const,
      stock: 4,
      featured: true,
      sortOrder: 3,
      metaTitle: "Pip Duck — Premium Handmade Crochet Character",
      metaDescription:
        "Meet Pip, The Optimism Duck. Hand-crocheted with bright yellow yarn. Cheerful, adventurous, and brave.",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`  ✓ ${products.length} products seeded`);

  // ============================================
  // COLOR OPTIONS
  // ============================================
  const colors = [
    { name: "Strawberry Pink", value: "#ff8fb1", sortOrder: 1 },
    { name: "Chocolate Brown", value: "#4a3a35", sortOrder: 2 },
    { name: "Sunlight Yellow", value: "#ffca3a", sortOrder: 3 },
    { name: "Matcha Green", value: "#A4BE7B", sortOrder: 4 },
    { name: "Sky Blue", value: "#B4E4FF", sortOrder: 5 },
    { name: "Cotton White", value: "#ffffff", sortOrder: 6 },
  ];

  for (const color of colors) {
    await prisma.colorOption.upsert({
      where: { id: color.value }, // Use value as unique identifier
      update: color,
      create: { ...color, id: color.value },
    });
  }
  console.log(`  ✓ ${colors.length} color options seeded`);

  // ============================================
  // EYE STYLES
  // ============================================
  const eyeStyles = [
    { slug: "cute", name: "Innocent (Dot)", sortOrder: 1 },
    { slug: "sleepy", name: "Dreamy (Closed)", sortOrder: 2 },
    { slug: "wink", name: "Playful (Wink)", sortOrder: 3 },
  ];

  for (const style of eyeStyles) {
    await prisma.eyeStyle.upsert({
      where: { slug: style.slug },
      update: style,
      create: style,
    });
  }
  console.log(`  ✓ ${eyeStyles.length} eye styles seeded`);

  // ============================================
  // ACCESSORIES
  // ============================================
  const accessories = [
    { slug: "none", name: "No Accessories", price: 0, sortOrder: 1 },
    { slug: "scarf", name: "Cozy Wool Scarf", price: 15000, sortOrder: 2 },
    { slug: "ribbon", name: "Silk Bow Ribbon", price: 10000, sortOrder: 3 },
    { slug: "grad-cap", name: "Graduation Cap", price: 25000, sortOrder: 4 },
  ];

  for (const acc of accessories) {
    await prisma.accessory.upsert({
      where: { slug: acc.slug },
      update: acc,
      create: acc,
    });
  }
  console.log(`  ✓ ${accessories.length} accessories seeded`);

  // ============================================
  // FAQs
  // ============================================
  const faqs = [
    {
      question: "Is it safe for children?",
      answer:
        "Absolutely. We use premium non-toxic milk cotton and 'safety eyes' that are securely fastened from the inside. However, for infants, we recommend our 'Sleepy Style' (embroidered eyes) for maximum safety.",
      category: "general",
      sortOrder: 1,
    },
    {
      question: "How do I take care of my companion?",
      answer:
        "Think of them as delicate art. We recommend a gentle hand wash with mild soap and air drying. Avoid machine washing to keep the fiber texture soft and the shape intact.",
      category: "general",
      sortOrder: 2,
    },
    {
      question: "Do you ship outside of Bekasi?",
      answer:
        "Yes! We ship across Indonesia via JNE/J&T. Every soul is packed in a premium gift box to ensure they arrive safely and ready for adoption.",
      category: "shipping",
      sortOrder: 3,
    },
    {
      question: "Can I request a custom design not in the builder?",
      answer:
        "We love a challenge! If you have a specific character or idea in mind, chat with us on WhatsApp. Our master artisan will see if we can bring your vision to life.",
      category: "custom",
      sortOrder: 4,
    },
  ];

  // Delete existing FAQs and recreate
  await prisma.fAQ.deleteMany();
  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log(`  ✓ ${faqs.length} FAQs seeded`);

  // ============================================
  // TESTIMONIALS
  // ============================================
  const testimonials = [
    {
      authorName: "Salsabila K.",
      location: "Jakarta",
      content:
        "Momo is even cuter in person! The texture is so soft and the custom name tag makes it feel so personal. High quality work!",
      productName: "Momo (Bunny)",
      rating: 5,
      featured: true,
      sortOrder: 1,
    },
    {
      authorName: "Ravi A.",
      location: "Bandung",
      content:
        "Ordered a custom bear as a gift for my partner. The artisan was so helpful on WhatsApp. She loved it!",
      productName: "Kopi (Bear)",
      rating: 5,
      featured: true,
      sortOrder: 2,
    },
    {
      authorName: "Indah P.",
      location: "Bekasi",
      content:
        "Support local artisans! Stitched with so much love. You can really feel the difference between this and store-bought toys.",
      productName: "Pip (Duck)",
      rating: 5,
      featured: true,
      sortOrder: 3,
    },
  ];

  await prisma.testimonial.deleteMany();
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log(`  ✓ ${testimonials.length} testimonials seeded`);

  console.log("\n✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
