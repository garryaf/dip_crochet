"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const PlushViewer = dynamic(() => import("@/components/three/PlushViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-accent/20 animate-pulse rounded-[3rem]" />,
});

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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="pt-36 pb-20 px-6 md:px-20 grid md:grid-cols-2 items-center gap-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent rounded-full text-primary font-semibold text-xs uppercase tracking-widest w-fit">
          <Heart className="w-3.5 h-3.5 fill-primary" />
          Handmade · Premium Cotton · Made with Love
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-6xl md:text-[5.5rem] font-black text-[#4a3a35] leading-[0.92] tracking-tight">
          Tiny dolls for{" "}
          <span className="relative inline-block">
            <span className="text-primary italic">big</span>
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-1 bg-primary/40 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
            />
          </span>{" "}
          memories.
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg text-muted-foreground font-medium max-w-md leading-relaxed">
          Every stitch carries a story. Discover our premium character series — or build your own companion from scratch.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link href="/products" className="group px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300">
            Shop Characters
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/customizer" className="px-8 py-4 bg-white text-primary font-bold rounded-2xl border border-primary/15 flex items-center justify-center gap-2 hover:bg-accent/60 hover:border-primary/30 transition-all duration-300">
            <Sparkles className="w-4 h-4" />
            Custom Builder
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-5 mt-4">
          <div className="flex -space-x-3">
            {["#ffd1dc","#d4f1ee","#e0d4f0","#fff3cd"].map((bg, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center font-bold text-xs" style={{ backgroundColor: bg }}>
                ✨
              </div>
            ))}
          </div>
          <div className="text-sm">
            <div className="flex items-center gap-0.5 text-yellow-400 mb-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-muted-foreground font-medium">Loved by 2,000+ customers</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="show"
        className="relative h-[520px] md:h-[680px] bg-gradient-to-br from-accent/40 to-white/60 rounded-[4rem] overflow-hidden border border-white shadow-2xl"
      >
        <PlushViewer autoRotate={true} />

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-8 p-5 glass-card rounded-3xl shadow-xl max-w-[220px]"
        >
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">✦ Featured</p>
          <h3 className="text-lg font-black mb-1.5 leading-tight">Momo the Bunny</h3>
          <p className="text-xs text-muted-foreground leading-relaxed italic">"I love strawberry fields and helping friends smile."</p>
        </motion.div>

        {/* Ping dot */}
        <motion.div
          className="absolute top-8 right-8 flex items-center gap-2 px-3 py-2 bg-white/90 rounded-full text-xs font-bold shadow-md"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-ping absolute" />
          <span className="w-2 h-2 rounded-full bg-green-400 ml-0 mr-1 relative" />
          3D Interactive
        </motion.div>
      </motion.div>
    </section>
  );
}

// Re-export icon for the parent component to use if needed
import { Star } from "lucide-react";
