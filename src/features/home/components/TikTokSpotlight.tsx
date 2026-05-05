"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music, ArrowRight, Play } from "lucide-react";
import { BRAND } from "@/lib/constants";

const TIKTOK_VIDEOS = [
  { id: 1, views: "12.5K", tag: "#crochetasmr" },
  { id: 2, views: "8.2K", tag: "#handmade" },
  { id: 3, views: "15.1K", tag: "#crochettips" },
  { id: 4, views: "9.8K", tag: "#giftideas" },
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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TIKTOK_VIDEOS.map((video, i) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-[9/16] bg-accent/30 rounded-[2.5rem] overflow-hidden relative group cursor-pointer border border-primary/10 shadow-sm hover:shadow-2xl transition-all"
            >
              {/* Fake Video Preview Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/60 z-10" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-6 left-5 right-5 z-20">
                 <p className="text-white font-bold text-xs mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    {video.views} views
                 </p>
                 <p className="text-white/80 font-medium text-[10px] uppercase tracking-widest">{video.tag}</p>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-white rounded-[2rem] border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Music className="text-secondary w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-bold text-lg">Join our 50K+ community</h4>
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
