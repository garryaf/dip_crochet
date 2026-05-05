"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
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
    <section className="py-28 px-6 md:px-20 bg-muted/20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
      >
        <motion.div variants={fadeUp} className="max-w-xl">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-3">Character Collection</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Meet the<br /><span className="italic font-light text-muted-foreground">full cast.</span></h2>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Link href="/products" className="group text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all text-base">
            See all characters <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CHARACTERS.map((char, index) => (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-border hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
          >
            <Link href={`/product/${char.id}`}>
              <div className="relative aspect-square rounded-[2rem] m-3 mb-0 overflow-hidden flex items-center justify-center bg-accent/20">
                {char.image ? (
                  <Image 
                    src={char.image} 
                    alt={char.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="text-[120px] font-black opacity-10 select-none" style={{ color: char.color }}>{char.name[0]}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button className="absolute bottom-4 right-4 p-3.5 bg-white rounded-2xl shadow-xl translate-y-8 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-black">{char.name}</h3>
                  <span className="text-lg font-bold text-primary">{formatPrice(char.price)}</span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">{char.story}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {char.personality.split(', ').map((p) => (
                    <span key={p} className="px-2.5 py-1 bg-accent/60 rounded-full text-[11px] font-semibold text-primary">{p}</span>
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
