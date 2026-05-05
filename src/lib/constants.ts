export const BRAND = {
  name: "dip.crochet",
  tagline: "Handmade with Soul ✦ Bekasi",
  whatsapp: "6281234567890", // Replace with actual WhatsApp number
  instagram: "https://www.instagram.com/dip_crochet/",
  tiktok: "https://www.tiktok.com/@dip.crochet_",
  googleMaps: "https://maps.app.goo.gl/whTVfq1q1CXneE3A7",
  address: "RT.001/RW.010, Jatisampurna, Bekasi, West Java 17433",
} as const;

export function getWhatsAppLink(message: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const CHARACTERS = [
  {
    id: "momo-bunny",
    name: "Momo — Secret-Keeper Bunny",
    price: 95000,
    color: "#ff8fb1",
    personality: "Empathetic, Quiet, Loyal",
    story: "Stitched with extra-soft milk cotton to handle late-night hugs and whispered secrets. Momo is the perfect companion for those who need a silent, loyal listener.",
    image: null,
  },
  {
    id: "kopi-bear",
    name: "Kopi — The Midnight Bear",
    price: 95000,
    color: "#4a3a35",
    personality: "Calm, Protective, Warm",
    story: "Made with deep chocolate yarn, Kopi was born to watch over your dreams. He’s a bit shy but has the warmest heart (and the softest ears) in the workshop.",
    image: null,
  },
  {
    id: "pip-duck",
    name: "Pip — The Optimism Duck",
    price: 85000,
    color: "#ffca3a",
    personality: "Cheerful, Adventurous, Brave",
    story: "Pip believes every day is an adventure. Even on rainy days, Pip’s bright yellow stitches remind you that the sun is always just behind the clouds.",
    image: null,
  },
];

export const COLORS = [
  { name: "Strawberry Pink", value: "#ff8fb1" },
  { name: "Chocolate Brown", value: "#4a3a35" },
  { name: "Sunlight Yellow", value: "#ffca3a" },
  { name: "Matcha Green", value: "#A4BE7B" },
  { name: "Sky Blue", value: "#B4E4FF" },
  { name: "Cotton White", value: "#ffffff" },
];

export const EYE_STYLES = [
  { id: "cute", name: "Innocent (Dot)" },
  { id: "sleepy", name: "Dreamy (Closed)" },
  { id: "wink", name: "Playful (Wink)" },
];

export const ACCESSORIES = [
  { id: "none", name: "No Accessories" },
  { id: "scarf", name: "Cozy Wool Scarf" },
  { id: "ribbon", name: "Silk Bow Ribbon" },
  { id: "grad-cap", name: "Graduation Cap" },
];
