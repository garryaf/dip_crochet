"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function CustomBuilderCTA() {
  return (
    <section className="py-24 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-[#2d2320] rounded-[4rem] p-12 md:p-24 overflow-hidden relative overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl">
          <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-6">Workshop Co-creation</p>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
            Couldn't find <br />
            <span className="text-primary italic font-light italic">your</span> story?
          </h2>
          <p className="text-xl text-white/50 mb-12 font-medium max-w-md leading-relaxed">
            Every choice you make in our workshop is a reflection of your intent. Select your fiber, eyes, and name — and we'll stitch them into a one-of-a-kind companion.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Link href="/customizer" className="inline-flex items-center gap-3 px-12 py-6 bg-primary text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/40 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              <Sparkles className="w-5 h-5 fill-white" />
              Co-create Yours
            </Link>
            <div className="flex items-center gap-3 text-white/40 text-xs font-bold uppercase tracking-widest">
               <Heart className="w-4 h-4 fill-white/20" />
               Limited Slots Available
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        {/* Tactile fiber pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
           <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
        </div>
      </motion.div>
    </section>
  );
}
