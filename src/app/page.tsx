"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { ShoppingBag, Star, Heart, ArrowRight, Sparkles } from "lucide-react";
import { CHARACTERS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

const PlushViewer = dynamic(() => import("@/components/three/PlushViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-accent/20 animate-pulse rounded-[3rem]" />,
});

// Brand logo component with stylized typography
function BrandLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };
  return (
    <span className={`${sizes[size]} font-black tracking-tight select-none`}>
      <span className="text-foreground">dip</span>
      <span className="text-primary">.</span>
      <span className="text-foreground italic font-light">crochet</span>
    </span>
  );
}

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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* Navigation */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-white/40 px-6 py-4 flex justify-between items-center"
      >
        <BrandLogo />
        <div className="hidden md:flex gap-8 font-medium text-muted-foreground text-sm">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
          <Link href="/customizer" className="hover:text-primary transition-colors">Custom Build</Link>
          <Link href="/graduation" className="hover:text-secondary transition-colors font-semibold text-secondary">
            Graduation '24 ✦
          </Link>
        </div>
        <div className="flex gap-3">
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button className="hidden md:block px-5 py-2 bg-primary text-white font-semibold rounded-full text-sm shadow-lg shadow-primary/25 hover:scale-105 transition-transform active:scale-95">
            Sign In
          </button>
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
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

      {/* ─── Character Series ─── */}
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
                <div className="relative aspect-square rounded-[2rem] m-3 mb-0 overflow-hidden flex items-center justify-center" style={{ backgroundColor: `${char.color}22` }}>
                  <div className="text-[120px] font-black opacity-10 select-none" style={{ color: char.color }}>{char.name[0]}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button className="absolute bottom-4 right-4 p-3.5 bg-white rounded-2xl shadow-xl translate-y-8 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110">
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

      {/* ─── Custom Builder CTA ─── */}
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
          <div className="absolute top-12 right-48 w-48 h-48 bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-20 px-6 md:px-20 border-t border-border mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <BrandLogo size="lg" />
            <p className="text-muted-foreground font-medium max-w-xs leading-relaxed mt-4 text-sm">
              Creating emotional connections through handmade crochet art. Every piece is unique, just like you.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-muted-foreground">Explore</h4>
            <ul className="flex flex-col gap-3 font-medium">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Characters</Link></li>
              <li><Link href="/customizer" className="hover:text-primary transition-colors">Custom Builder</Link></li>
              <li><Link href="/graduation" className="hover:text-secondary transition-colors">Graduation Collection</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-muted-foreground">Connect</h4>
            <ul className="flex flex-col gap-3 font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">TikTok</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-xs font-medium pt-8 border-t border-border">
          <p>© 2024 dip.crochet. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
