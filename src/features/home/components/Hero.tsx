"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Heart, ArrowRight, Sparkles, Star } from "lucide-react";
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
    <section className="pt-36 pb-20 px-6 md:px-20 grid md:grid-cols-2 items-center gap-12 max-w-[1600px] mx-auto">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-8"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent rounded-full text-primary font-bold text-[10px] uppercase tracking-[0.2em] w-fit shadow-sm">
          <Heart className="w-3 h-3 fill-primary" />
          Every stitch contains a piece of heart
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-6xl md:text-[5.8rem] font-black text-[#4a3a35] leading-[0.88] tracking-tight">
          Every <span className="text-primary italic font-light">stitch</span>,<br /> 
          a story.
        </motion.h1>

        <motion.p variants={fadeUp} className="text-xl text-muted-foreground font-medium max-w-md leading-relaxed">
          Your memories, hand-crocheted. Discover our artisan character series — or co-create your own companion from scratch.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link href="/products" className="group px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-primary/40 transition-all duration-300">
            Adopt a Companion
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/customizer" className="px-10 py-5 bg-white text-primary font-black rounded-2xl border-2 border-primary/10 flex items-center justify-center gap-3 hover:bg-accent/60 hover:border-primary/20 transition-all duration-300">
            <Sparkles className="w-5 h-5" />
            Co-create Yours
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-5 mt-6 p-4 bg-white/40 backdrop-blur-sm rounded-3xl w-fit border border-white/50">
          <div className="flex -space-x-3">
            {[1,2,3,4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-accent flex items-center justify-center font-bold text-xs shadow-sm">
                🧶
              </div>
            ))}
          </div>
          <div className="text-sm">
            <div className="flex items-center gap-0.5 text-yellow-500 mb-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-muted-foreground font-bold tracking-tight">Trusted by 2,000+ souls</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="show"
        className="relative h-[550px] md:h-[720px] bg-gradient-to-br from-[#fff0f3] to-white rounded-[4.5rem] overflow-hidden border-2 border-white shadow-[0_32px_64px_-12px_rgba(74,58,53,0.12)]"
      >
        <PlushViewer autoRotate={true} />

        {/* Floating badge - Emotional Connect */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute top-12 right-12 p-6 glass-card rounded-[2.5rem] shadow-xl max-w-[240px] border border-white/60"
        >
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">✧ Featured Soul</p>
          <h3 className="text-xl font-black mb-1.5 leading-tight text-[#4a3a35]">Momo Bunny</h3>
          <p className="text-xs text-muted-foreground leading-relaxed font-medium">"I was made to listen to secrets and share strawberry dreams."</p>
        </motion.div>

        {/* Interactive Label */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur rounded-full text-xs font-black shadow-lg border border-primary/10"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          TOUCH TO EXPLORE
        </motion.div>
      </motion.div>
    </section>
  );
}
