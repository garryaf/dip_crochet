"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CustomBuilderCTA() {
  return (
    <section className="py-24 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-[#2d2320] rounded-[3rem] p-12 md:p-20 overflow-hidden relative"
      >
        <div className="relative z-10 max-w-2xl">
          <p className="text-primary/80 font-semibold text-sm uppercase tracking-widest mb-4">Custom Builder</p>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight">
            Can't find <br />your match?<br />
            <span className="text-primary italic font-light">Build one.</span>
          </h2>
          <p className="text-xl text-white/50 mb-10 font-medium max-w-md leading-relaxed">
            Choose from 20+ yarn colors, 5 eye styles, and accessories. We'll hand-crochet it exactly as you imagine.
          </p>
          <Link href="/customizer" className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-bold text-lg rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
            <Sparkles className="w-5 h-5" />
            Start Customizing
          </Link>
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/8 -skew-x-12 translate-x-16 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
      </motion.div>
    </section>
  );
}
