"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";

const TIKTOK_VIDEOS = [
  { id: "7608837833268219144", tag: "#crochetasmr" },
  { id: "7603159595636231431", tag: "#handmade" },
  { id: "7602729212436434184", tag: "#crochettips" },
  { id: "7600982266721864968", tag: "#giftideas" },
];

export default function TikTokSpotlight() {
  return (
    <section className="py-24 px-6 md:px-20 bg-[#fffbf9]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <Music className="w-4 h-4 text-primary" />
              </div>
              TikTok Spotlight
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight flex flex-wrap gap-x-4 items-center">
              Vibes from 
              <span className="text-primary italic font-light inline-flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm not-italic font-bold">@</span>
                {BRAND.name.replace('.crochet', '')}.crochet_
              </span>
            </h2>
          </div>
          <a 
            href={BRAND.tiktok} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-4 bg-black text-white rounded-2xl font-bold text-sm hover:scale-105 hover:-translate-y-1 transition-all flex items-center gap-2 shadow-xl group"
          >
            Follow on TikTok
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {TIKTOK_VIDEOS.map((video, i) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-[9/16] bg-accent/30 rounded-[2.5rem] overflow-hidden relative group border border-primary/10 shadow-sm hover:shadow-2xl transition-all"
            >
              <iframe
                src={`https://www.tiktok.com/embed/v2/${video.id}`}
                className="w-full h-full border-none"
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture"
              />
              
              {/* Optional overlay to capture clicks if needed, but iframe handles internally */}
              <div className="absolute top-4 right-4 z-20">
                 <p className="bg-white/80 backdrop-blur px-2.5 py-1 rounded-full shadow-sm text-[10px] font-bold text-primary uppercase tracking-tighter">
                   {video.tag}
                 </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-white rounded-[2rem] border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Music className="text-secondary w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-bold text-lg">Join our community</h4>
                  <p className="text-muted-foreground text-sm font-medium">Get daily behind-the-scenes and crochet ASMR.</p>
               </div>
            </div>
            <a href={BRAND.tiktok} target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
               Visit @dip.crochet_ ✦
            </a>
        </div>
      </div>
    </section>
  );
}
