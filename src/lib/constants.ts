export const BRAND = {
  name: "dip.crochet",
  tagline: "Handmade with Love ✦ Bekasi",
  whatsapp: "6281234567890", // Replace with actual WhatsApp number
  instagram: "https://www.instagram.com/dip_crochet",
  tiktok: "https://www.tiktok.com/@dip.crochet",
  googleMaps: "https://maps.app.goo.gl/whTVfq1q1CXneE3A7",
  address: "RT.001/RW.010, Jatisampurna, Bekasi, West Java 17433",
} as const;

export function getWhatsAppLink(message: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const CHARACTERS = [
  {
    id: "momo-bunny",
    name: "Momo the Bunny",
    price: 75000,
    story: "Momo is a shy but sweet bunny who loves strawberry fields and warm hugs. She's always ready to listen to your secrets.",
    personality: "Shy, Sweet, Attentive",
    color: "#ff8fb1",
    secondaryColor: "#ffffff",
    image: "/images/momo.png",
    badge: "Best Seller ✦",
  },
  {
    id: "kuma-bear",
    name: "Kuma the Bear",
    price: 95000,
    story: "Kuma is the protector of the forest. He loves honey tea and napping under oak trees with his best friends.",
    personality: "Protective, Calm, Loyal",
    color: "#8d6e63",
    secondaryColor: "#d7ccc8",
    image: "/images/kuma.png",
    badge: "New Arrival",
  },
  {
    id: "pipo-duck",
    name: "Pipo the Duck",
    price: 65000,
    story: "Pipo is an adventurous little duck who dreams of traveling across the seven ponds. He always wears his yellow raincoat.",
    personality: "Adventurous, Cheerful, Energetic",
    color: "#ffd54f",
    secondaryColor: "#ffffff",
    image: "/images/pipo.png",
    badge: "Fan Favorite",
  },
];

export const COLORS = [
  { name: "Cotton Pink", value: "#ff8fb1" },
  { name: "Minty Fresh", value: "#6ebfb5" },
  { name: "Creamy Sky", value: "#b3e5fc" },
  { name: "Lilac Dream", value: "#ce93d8" },
  { name: "Lemon Soda", value: "#fff59d" },
  { name: "Soft Marshmallow", value: "#ffffff" },
];

export const EYE_STYLES = [
  { id: "cute", name: "Cute / Classic" },
  { id: "sleepy", name: "Sleepy / Relaxed" },
  { id: "happy", name: "Happy / Blinking" },
];

export const ACCESSORIES = [
  { id: "none", name: "None" },
  { id: "hat", name: "Classic Hat" },
  { id: "grad-cap", name: "Graduation Cap" },
  { id: "couple", name: "Couple Set (Pair)" },
];

export const TESTIMONIALS = [
  {
    name: "Rina A.",
    text: "Bonekanya lucu banget, jahitannya rapi dan warnanya persis kayak di foto. Pasti order lagi! 💕",
    rating: 5,
    product: "Momo the Bunny",
  },
  {
    name: "Dinda S.",
    text: "Beli buat kado wisuda temen, dia sampe nangis seneng. Packagingnya juga premium banget!",
    rating: 5,
    product: "Graduation Series",
  },
  {
    name: "Farah M.",
    text: "Custom doll-nya exactly kayak yang aku mau. Komunikasinya juga ramah dan fast response 🧶",
    rating: 5,
    product: "Custom Doll",
  },
];
