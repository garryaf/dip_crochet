"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, ArrowRight } from "lucide-react";
import { BUNDLES, getWhatsAppLink } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

/**
 * Psychology:
 * 1. Social Connection: "One for you, one for them" triggers altruistic spending.
 * 2. Visual Savings: "Save IDR 10.000" provides logical justification for the impulse.
 */

export default function BundleSection() {
  const bundle = BUNDLES[0];

  return (
    <section className="py-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto rounded-[4rem] bg-[#fbf5f3] p-12 md:p-24 border border-primary/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
         <div className="relative z-10 w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-white rounded-full text-secondary font-black text-[10px] uppercase tracking-[0.2em] mb-8 shadow-sm">
               <Users className="w-3.5 h-3.5" /> Bundle & Bond
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[#4a3a35] leading-none tracking-tighter mb-8 italic">
              Friendship <br />
              <span className="text-primary font-light">Stitched</span>.
            </h2>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-10 max-w-md">
              {bundle.description} Pre-packaged in our premium double-soul box with matching congratulate cards.
            </p>
            <div className="space-y-4 mb-10">
               {bundle.items.map((item, i) => (
                 <div key={i} className="flex items-center gap-3 font-black text-sm text-[#4a3a35]">
                    <Heart className="w-4 h-4 text-primary fill-primary" /> {item}
                 </div>
               ))}
            </div>
            
            <div className="flex items-baseline gap-6 mb-10">
               <span className="text-4xl font-black text-primary">{formatPrice(bundle.price)}</span>
               <span className="text-xs font-black text-secondary px-3 py-1 bg-secondary/10 rounded-lg uppercase tracking-widest">{bundle.saving}</span>
            </div>

            <button 
              onClick={() => {
                const message = `Halo Kak dip.crochet! Aku berminat untuk ambil BESTIES BUNDLE (2 Soul).\n\nWarnanya bisa custom kan ya Kak?`;
                window.open(getWhatsAppLink(message), "_blank");
              }}
              className="px-12 py-6 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 flex items-center gap-3 hover:scale-105 transition-all text-xs uppercase tracking-[0.2em]"
            >
               Adopt the Bundle <ArrowRight className="w-4 h-4" />
            </button>
         </div>

         <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] flex items-center justify-center">
            {/* Visual representation of two dolls */}
            <div className="relative">
               <div className="w-64 h-64 md:w-80 md:h-80 bg-accent rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
               <div className="flex gap-4 md:gap-8 items-center rotate-[-10deg]">
                  <div className="w-40 h-40 md:w-56 md:h-56 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center text-6xl relative z-10 border-4 border-white">
                     🐰
                     <div className="absolute top-4 right-4 text-xs font-black text-primary">01</div>
                  </div>
                  <div className="w-40 h-40 md:w-56 md:h-56 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center text-6xl translate-y-12 rotate-[20deg] border-4 border-white">
                     🐻
                     <div className="absolute top-4 right-4 text-xs font-black text-primary">02</div>
                  </div>
               </div>
            </div>
         </div>

         {/* Fiber background texture */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden select-none">
            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
         </div>
      </div>
    </section>
  );
}
