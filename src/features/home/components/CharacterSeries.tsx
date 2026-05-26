"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Heart, Timer } from "lucide-react";
import Image from "next/image";
import { CHARACTERS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function CharacterSeries() {
  return (
    <section className="py-28 px-6 md:px-20 bg-muted/20 texture-bg">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
      >
        <motion.div variants={fadeUp} className="max-w-xl">
          <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">The Soul Collection</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#4a3a35]">Find your<br /><span className="italic font-light text-muted-foreground">forever friend.</span></h2>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Link href="/products" className="group text-primary font-black flex items-center gap-3 hover:gap-4 transition-all text-sm uppercase tracking-widest">
            View all souls <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CHARACTERS.map((char, index) => (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group bg-white rounded-[3rem] overflow-hidden border border-border/50 hover:shadow-[0_32px_64px_-16px_rgba(74,58,53,0.08)] transition-all duration-500 cursor-pointer"
          >
            <Link href={`/product/${char.id}`}>
              <div className="relative aspect-square rounded-[2.5rem] m-4 mb-0 overflow-hidden flex items-center justify-center bg-accent/20">
                {char.image ? (
                  <Image 
                    src={char.image} 
                    alt={char.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                ) : (
                  <div className="text-[140px] font-black opacity-5 select-none" style={{ color: char.color }}>{char.name[0]}</div>
                )}
                <div className="absolute top-8 left-8 flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black text-secondary uppercase tracking-widest shadow-sm">
                   <Timer className="w-3 h-3" />
                   {index === 0 ? "Only 2 left" : "Crafting Slot Open"}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3a35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating "Adopt" badge on hover */}
                <div className="absolute inset-0 flex items-center justify-center translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                   <div className="px-6 py-3 bg-white text-primary font-black rounded-full shadow-xl flex items-center gap-2 scale-90 group-hover:scale-100 transition-transform">
                      <Heart className="w-4 h-4 fill-primary" />
                      Adopt {char.name.split(' ')[0]}
                   </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black text-[#4a3a35] tracking-tight">{char.name}</h3>
                  <span className="text-xl font-black text-primary">{formatPrice(char.price)}</span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed font-medium">"{char.story}"</p>
                <div className="flex gap-2 flex-wrap">
                  {char.personality.split(', ').map((p) => (
                    <span key={p} className="px-3.5 py-1.5 bg-accent/40 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/5">{p}</span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
