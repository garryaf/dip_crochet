"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, ShoppingBag, Star, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";
import { CHARACTERS, COLORS } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/constants";

// Lazy load the 3D viewer — do NOT SSR
const PlushViewer = dynamic(() => import("@/components/three/PlushViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full gap-3">
      <div className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
      <div className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  ),
});

interface ProductDetailClientProps {
  id: string;
}

export default function ProductDetailClient({ id }: ProductDetailClientProps) {
  const character = CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];
  const [selectedColor, setSelectedColor] = useState(character.color);

  const relatedCharacters = CHARACTERS.filter((c) => c.id !== character.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#fffbf9]">
      {/* Nav */}
      <nav className="p-6 flex justify-between items-center bg-white/60 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <Link href="/products" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" /> All Characters
        </Link>
        <BrandLogo />
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <ShoppingBag className="w-6 h-6" />
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Left: 3D Viewer */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-white rounded-[3rem] border border-border shadow-xl overflow-hidden">
              {/* Viewer tips badge */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-bold text-muted-foreground border border-border shadow-sm">
                  <RotateCcw className="w-3 h-3" /> Drag to rotate
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-bold text-muted-foreground border border-border shadow-sm">
                  <ZoomIn className="w-3 h-3" /> Scroll to zoom
                </div>
              </div>

              <PlushViewer color={selectedColor} />
            </div>

            {/* Color switcher */}
            <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Color Variations</p>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={cn(
                      "w-10 h-10 rounded-full border-4 transition-all hover:scale-110",
                      selectedColor === color.value ? "border-primary shadow-lg scale-110" : "border-white shadow-sm"
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-8 pt-4">
            <div>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Character Series Vol.1</p>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-4">{character.name}</h1>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">4.9 (127 reviews)</span>
              </div>
              <span className="text-5xl font-black text-primary">{formatPrice(character.price)}</span>
            </div>

            {/* Personality Tags */}
            <div className="flex flex-wrap gap-2">
              {character.personality.split(", ").map((trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 bg-accent text-primary font-bold text-sm rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Story */}
            <div className="p-8 bg-white rounded-3xl border border-border shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-full" />
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3 pl-4">Character Story</p>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium pl-4">
                "{character.story}"
              </p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Material", value: "Premium Cotton Yarn" },
                { label: "Size", value: "15cm / 6 inches" },
                { label: "Crafting Time", value: "3–5 Business Days" },
                { label: "Packaging", value: "Premium Gift Box" },
              ].map((spec) => (
                <div key={spec.label} className="p-5 bg-white rounded-2xl border border-border shadow-sm">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">{spec.label}</p>
                  <p className="font-bold">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-4 mt-2">
              <button 
                onClick={() => {
                  const message = `Hi dip.crochet! I want to order ${character.name} in ${selectedColor} color. Is it available?`;
                  window.open(getWhatsAppLink(message), "_blank");
                }}
                className="flex-1 py-5 bg-primary text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/25 hover:bg-primary/90 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" /> Order via WhatsApp
              </button>
              <Link
                href="/customizer"
                className="px-8 py-5 bg-white border-2 border-primary/20 text-primary font-black text-lg rounded-2xl hover:bg-accent transition-colors flex items-center justify-center"
              >
                Customize
              </Link>
            </div>
          </div>
        </div>

        {/* Related Characters */}
        {relatedCharacters.length > 0 && (
          <div>
            <h2 className="text-3xl font-black mb-8">You may also love</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCharacters.map((char) => (
                <Link key={char.id} href={`/product/${char.id}`}>
                  <div className="flex gap-6 bg-white p-6 rounded-3xl border border-border hover:shadow-xl transition-all hover:-translate-y-1 group">
                    <div
                      className="w-24 h-24 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-4xl opacity-40"
                      style={{ backgroundColor: `${char.color}33`, color: char.color }}
                    >
                      {char.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-black group-hover:text-primary transition-colors">{char.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium mb-2 italic">{char.personality}</p>
                      <span className="text-primary font-black">{formatPrice(char.price)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
