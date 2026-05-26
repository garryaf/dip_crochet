"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, MessageCircle, Heart } from "lucide-react";

/**
 * Psychological Reasoning:
 * 1. Social Validation: Seeing others happy with the "adoption" process.
 * 2. Visual Trust: Using specific character names in reviews.
 */

const REVIEWS = [
  {
    name: "Salsabila K.",
    location: "Jakarta",
    text: "Momo is even cuter in person! The texture is so soft and the custom name tag makes it feel so personal. High quality work!",
    character: "Momo (Bunny)"
  },
  {
    name: "Ravi A.",
    location: "Bandung",
    text: "Ordered a custom bear as a gift for my partner. The artisan was so helpful on WhatsApp. She loved it!",
    character: "Kopi (Bear)"
  },
  {
    name: "Indah P.",
    location: "Bekasi",
    text: "Support local artisans! Stitched with so much love. You can really feel the difference between this and store-bought toys.",
    character: "Pip (Duck)"
  }
];

export default function Reviews() {
  return (
    <section className="py-24 px-6 md:px-20 bg-accent/20 border-t border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-white rounded-full text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4 shadow-sm">
                 <Heart className="w-3 h-3 fill-primary" /> From the community
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#4a3a35] tracking-tight">Heartfelt stories <br />from our <span className="text-primary italic font-light">family.</span></h2>
           </div>
           <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground">
              <MessageCircle className="w-5 h-5 text-primary" /> 2,000+ Happy Adoptions
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl shadow-primary/5 border border-white flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-yellow-500">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-lg text-[#4a3a35] font-medium leading-relaxed mb-8">
                  "{review.text}"
                </p>
              </div>
              
              <div className="flex items-center justify-between border-t border-border/50 pt-6">
                 <div>
                    <h4 className="font-black text-[#4a3a35]">{review.name}</h4>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{review.location}</p>
                 </div>
                 <div className="px-3 py-1 bg-accent rounded-full text-[9px] font-black text-primary uppercase tracking-widest">
                    {review.character}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
