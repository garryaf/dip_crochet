"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { ShoppingBag, Star, Heart, ArrowRight, Sparkles, Menu, X, MapPin, ExternalLink, Music } from "lucide-react";
import { CHARACTERS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* Navigation */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-xl border-b border-white/40 px-6 py-4 flex justify-between items-center"
      >
        <BrandLogo />
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8 font-medium text-muted-foreground text-sm">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
          <Link href="/customizer" className="hover:text-primary transition-colors">Custom Build</Link>
          <Link href="/graduation" className="hover:text-secondary transition-colors font-semibold text-secondary">
            Graduation '24 ✦
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-4 mr-4 pr-4 border-r border-border">
            <a href="https://www.instagram.com/dip_crochet" target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@dip.crochet" target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18c0 1.94-.66 3.82-1.88 5.32A9.91 9.91 0 0110.66 24C8.02 24.19 5.27 23.32 3.26 21.52 1.03 19.51-.15 16.39.02 13.43c.15-2.7 1.47-5.46 3.66-7.03 2.11-1.55 5.02-2.01 7.4-1.15V9.4c-1.31-.46-2.82-.33-4.01.44-1.22.79-1.92 2.26-1.71 3.71.25 1.62 1.58 3.14 3.26 3.4 1.54.21 3.19-.74 3.74-2.2.14-.38.16-.78.16-1.18V.24c.05-.14.1-.22.25-.22z"/>
              </svg>
            </a>
          </div>
          
          <button className="p-2 hover:bg-muted rounded-full transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Link href="/signin" className="hidden lg:block px-5 py-2 bg-primary text-white font-semibold rounded-full text-sm shadow-lg shadow-primary/25 hover:scale-105 transition-transform active:scale-95">
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-border flex flex-col p-6 gap-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold hover:text-primary">Home</Link>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold hover:text-primary">Shop</Link>
              <Link href="/customizer" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold hover:text-primary">Custom Builder</Link>
              <Link href="/graduation" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-secondary">Graduation '24 ✦</Link>
            </div>
            
            <div className="pt-6 border-t border-border flex items-center gap-6">
              <a href="https://www.instagram.com/dip_crochet" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold">
                <svg className="w-6 h-6 stroke-primary fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Instagram
              </a>
              <a href="https://www.tiktok.com/@dip.crochet" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold">
                <svg className="w-6 h-6 fill-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18c0 1.94-.66 3.82-1.88 5.32A9.91 9.91 0 0110.66 24C8.02 24.19 5.27 23.32 3.26 21.52 1.03 19.51-.15 16.39.02 13.43c.15-2.7 1.47-5.46 3.66-7.03 2.11-1.55 5.02-2.01 7.4-1.15V9.4c-1.31-.46-2.82-.33-4.01.44-1.22.79-1.92 2.26-1.71 3.71.25 1.62 1.58 3.14 3.26 3.4 1.54.21 3.19-.74 3.74-2.2.14-.38.16-.78.16-1.18V.24c.05-.14.1-.22.25-.22z"/>
                </svg>
                TikTok
              </a>
            </div>
            
            <Link href="/signin" className="w-full py-4 bg-primary text-white text-center font-bold rounded-2xl shadow-xl">
              Sign In
            </Link>
          </motion.div>
        )}
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
        </motion.div>
      </section>

      {/* ─── TikTok Experience ─── */}
      <section className="py-24 px-6 md:px-20 bg-[#fffbf9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                <Music className="w-4 h-4" />
                TikTok Spotlight
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Vibes from <br /><span className="text-primary italic font-light">@dip.crochet</span></h2>
            </div>
            <a href="https://www.tiktok.com/@dip.crochet" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
              Follow on TikTok
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[9/16] bg-accent/30 rounded-[2rem] overflow-hidden relative group cursor-pointer border border-primary/10">
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                  <Music className="w-12 h-12 text-primary/40" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  #crochetasmr #handmade
                </div>
                {/* Overlay for glass effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Location ─── */}
      <section className="py-24 px-6 md:px-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent rounded-full text-primary font-bold text-xs uppercase tracking-widest mb-6">
              <MapPin className="w-3.5 h-3.5" />
              Our Studio
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Visit us in <br /><span className="text-primary">Bekasi.</span></h2>
            <p className="text-lg text-muted-foreground font-medium mb-8 leading-relaxed max-w-md">
              Want to see our characters in person? Visit our handmade studio in the heart of Bekasi. We're open for consultations and custom orders.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-accent rounded-2xl text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Address</h4>
                  <p className="text-muted-foreground font-medium">RT.001/RW.010, Jatisampurna, Bekasi,<br />West Java 17433</p>
                </div>
              </div>
              {/* Add deep link to google maps */}
              <a 
                href="https://maps.app.goo.gl/whTVfq1q1CXneE3A7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-border rounded-2xl font-bold hover:bg-accent/50 transition-colors group"
              >
                Open in Google Maps
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="h-[450px] rounded-[3rem] overflow-hidden border border-border shadow-2xl relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.916892305886!2d106.9150!3d-6.3688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69930773998f45%3A0x6b876fc162e249b6!2sJatisampurna%2C%20Bekasi%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1714467200000!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-110"
            />
          </div>
        </div>
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
              <li><a href="https://www.instagram.com/dip_crochet" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="https://www.tiktok.com/@dip.crochet" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">TikTok</a></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
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
