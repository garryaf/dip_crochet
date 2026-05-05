"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function TikTokSpotlight() {
  return (
    <section className="py-24 px-6 md:px-20 bg-[#fffbf9]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <Music className="w-4 h-4" />
              TikTok Spotlight
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight flex flex-wrap gap-x-4 items-center">
              Vibes from 
              <span className="text-primary italic font-light inline-flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm not-italic">@</span>
                {BRAND.name.replace('.crochet', '')}.crochet
              </span>
            </h2>
          </div>
          <a 
            href={BRAND.tiktok} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-4 bg-black text-white rounded-2xl font-bold text-sm hover:scale-105 hover:-translate-y-1 transition-all flex items-center gap-2 shadow-xl"
          >
            Follow on TikTok
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[9/16] bg-accent/30 rounded-[2rem] overflow-hidden relative group cursor-pointer border border-primary/10">
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                <Music className="w-12 h-12 text-primary/40" />
              </div>
              <div className="absolute bottom-6 left-4 right-4 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                <p className="bg-white/80 backdrop-blur px-3 py-2 rounded-xl shadow-sm">
                  #crochetasmr #handmade
                </p>
              </div>
              {/* Overlay for glass effect */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
