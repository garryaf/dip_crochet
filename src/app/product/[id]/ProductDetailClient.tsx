"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Heart, Sparkles, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";
import { CHARACTERS, COLORS } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/constants";

// Lazy load the 3D viewer — do NOT SSR
const PlushViewer = dynamic(() => import("@/components/three/PlushViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-accent/20 animate-pulse rounded-[3rem]" />,
});

interface ProductDetailClientProps {
  id: string;
}

export default function ProductDetailClient({ id }: ProductDetailClientProps) {
  const character = CHARACTERS.find((c) => c.id === id);
  const [selectedColor, setSelectedColor] = useState(character?.color || COLORS[0].value);

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Character Not Found</h1>
          <Link href="/products" className="text-primary font-bold hover:underline">Back to Souls</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/products" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-black text-xs uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Souls
        </Link>
        <BrandLogo />
        <div className="w-24 md:flex hidden" />
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-16 lg:gap-24 items-start texture-bg">
        {/* Left Side: 3D Preview */}
        <section className="flex flex-col gap-6 sticky top-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square bg-white rounded-[3.5rem] shadow-2xl border-4 border-white overflow-hidden flex items-center justify-center p-8 group"
          >
            <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-primary font-black text-[10px] uppercase tracking-widest shadow-sm z-10">
              <Sparkles className="w-3 h-3" />
              Living Preview
            </div>
            
            <PlushViewer color={selectedColor} />

            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/80 backdrop-blur shadow-lg border border-primary/20 rounded-full text-primary font-black text-xs animate-fade-in"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              TOUCH TO EXPLORE
            </motion.div>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-border/50 flex flex-col items-center text-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Crafting Time</p>
                <p className="font-black text-[#4a3a35]">3 - 5 Days</p>
             </div>
             <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-border/50 flex flex-col items-center text-center gap-2">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Certified</p>
                <p className="font-black text-[#4a3a35]">Handcrafted</p>
             </div>
          </div>
        </section>

        {/* Right Side: Details */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
               Character Series No. 0{CHARACTERS.indexOf(character) + 1}
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-[#4a3a35] leading-tight">{character.name}</h1>
            <div className="flex items-baseline gap-4 mt-2">
              <span className="text-4xl font-black text-primary">{formatPrice(character.price)}</span>
              <span className="text-muted-foreground font-bold text-sm uppercase tracking-widest">Adoption Fee</span>
            </div>
          </div>

          <div className="space-y-6">
             <h3 className="text-lg font-black text-[#4a3a35] uppercase tracking-widest flex items-center gap-2">
                <Heart className="w-5 h-5 fill-primary text-primary" /> Their Story
             </h3>
             <p className="text-xl text-muted-foreground font-medium leading-relaxed italic">
               "{character.story}"
             </p>
             <div className="flex flex-wrap gap-2 pt-2">
                {character.personality.split(', ').map(p => (
                  <span key={p} className="px-4 py-2 bg-accent rounded-xl text-xs font-black uppercase tracking-widest text-primary border border-primary/10">
                    {p}
                  </span>
                ))}
             </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-border/50">
            <h3 className="text-lg font-black text-[#4a3a35]">Choose Yarn Color</h3>
            <div className="flex flex-wrap gap-4">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={cn(
                    "w-12 h-12 rounded-full border-4 transition-all scale-100 hover:scale-110 flex items-center justify-center relative",
                    selectedColor === color.value ? "border-primary shadow-xl scale-105" : "border-white"
                  )}
                  style={{ backgroundColor: color.value }}
                >
                  {selectedColor === color.value && (
                    <div className={cn("w-2 h-2 rounded-full", (color.value === "#ffffff" || color.value === "#B4E4FF") ? "bg-primary" : "bg-white")} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <button 
              onClick={() => {
                const colorObj = COLORS.find(c => c.value === selectedColor);
                const colorName = colorObj?.name || selectedColor;
                const message = `Halo Kak dip.crochet! Aku ingin ADOPSI si lucu ${character.name.split(' — ')[0]} dengan warna ${colorName}.\n\nBisa diproses sekarang Kak?`;
                window.open(getWhatsAppLink(message), "_blank");
              }}
              className="w-full py-6 bg-primary text-white font-black text-xl rounded-2xl shadow-2xl shadow-primary/30 hover:bg-primary/90 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              <Heart className="w-6 h-6 fill-white" /> Bawa Pulang Sekarang
            </button>
            
            <div className="p-6 rounded-3xl bg-white border border-border/50 flex items-center gap-4 group cursor-pointer hover:bg-accent/30 transition-colors">
               <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
               </div>
               <div className="flex-grow">
                  <h4 className="font-bold text-sm tracking-tight">Need something more personal?</h4>
                  <p className="text-xs text-muted-foreground font-medium">Chat with the artisan for custom requests.</p>
               </div>
               <Link href="/customizer" className="p-2 hover:bg-white rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 rotate-180" />
               </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
