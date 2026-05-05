"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function MeetTheMaker() {
  return (
    <section className="py-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto bg-white rounded-[4rem] overflow-hidden border border-border/50 shadow-2xl flex flex-col md:flex-row items-center">
        {/* Visual Column */}
        <div className="w-full md:w-1/2 p-12 md:p-20 bg-accent/40 flex flex-col gap-8 relative overflow-hidden">
           <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-primary/20 flex items-center justify-center text-4xl mb-6 shadow-xl">
                 🧶
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#4a3a35] tracking-tight leading-tight">
                 Handmade with <br />
                 <span className="text-secondary italic">soul</span>, for yours.
              </h2>
           </div>
           
           <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="p-5 bg-white/60 backdrop-blur-md rounded-3xl border border-white/50">
                 <Heart className="w-6 h-6 text-primary mb-2 fill-primary" />
                 <p className="text-sm font-black uppercase tracking-widest text-[#4a3a35]">100% Love</p>
                 <p className="text-xs text-muted-foreground font-medium">No machines, just hands.</p>
              </div>
              <div className="p-5 bg-white/60 backdrop-blur-md rounded-3xl border border-white/50">
                 <Sparkles className="w-6 h-6 text-yellow-500 mb-2 fill-yellow-500" />
                 <p className="text-sm font-black uppercase tracking-widest text-[#4a3a35]">Bespoke</p>
                 <p className="text-xs text-muted-foreground font-medium">Every doll is unique.</p>
              </div>
           </div>

           {/* Decorative Fiber Blobs */}
           <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Story Column */}
        <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col gap-8">
           <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-secondary/10 rounded-full text-secondary font-black text-[10px] uppercase tracking-[0.2em]">
                 Meet the human behind the stitch
              </div>
              <h3 className="text-2xl font-black text-[#4a3a35] tracking-tight">"A doll is a vessel for a memory."</h3>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                 Hi, I'm the creator behind dip.crochet. What started as a way to find calm through ASMR crochet evolved into a mission to create physical companions for life's big (and small) moments.
              </p>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                 When you adopt a companion from my studio, you're not just buying yarn and stuffing. You're supporting hours of focused craftsmanship and a commitment to keeping handmade art alive.
              </p>
           </div>

           <div className="flex items-center gap-6 pt-4">
              <a 
                href={BRAND.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 font-black text-sm uppercase tracking-widest text-primary hover:gap-4 transition-all"
              >
                 Watch the process <MessageCircle className="w-4 h-4" />
              </a>
           </div>
        </div>
      </div>
    </section>
  );
}
