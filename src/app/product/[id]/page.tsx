import { CHARACTERS } from "@/lib/constants";
import ProductDetailClient from "./ProductDetailClient";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const character = CHARACTERS.find((c) => c.id === id);

  if (!character) {
    return {
      title: "Product Not Found | Cotcret",
    };
  }

  return {
    title: `${character.name} | Cotcret Premium Crochet`,
    description: character.story,
    openGraph: {
      title: `${character.name} | Cotcret`,
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
  return <ProductDetailClient id={id} />;
}
