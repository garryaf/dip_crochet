"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Heart } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";
import { BRAND } from "@/lib/constants";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-xl border-b border-white/40 px-6 py-4 flex justify-between items-center"
    >
      <Link href="/">
        <BrandLogo />
      </Link>
      
      {/* Desktop Nav */}
      <div className="hidden lg:flex gap-10 font-bold text-muted-foreground text-[11px] uppercase tracking-[0.2em]">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <Link href="/products" className="hover:text-primary transition-colors">Shop All</Link>
        <Link href="/customizer" className="hover:text-primary transition-colors">Co-create</Link>
        <Link href="/graduation" className="hover:text-secondary transition-colors text-secondary flex items-center gap-1.5">
          Graduation '24 <span className="text-[14px]">✦</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-5 mr-5 pr-5 border-r border-border">
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <span className="sr-only">Instagram</span>
            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href={BRAND.tiktok} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <span className="sr-only">TikTok</span>
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18c0 1.94-.66 3.82-1.88 5.32A9.91 9.91 0 0110.66 24C8.02 24.19 5.27 23.32 3.26 21.52 1.03 19.51-.15 16.39.02 13.43c.15-2.7 1.47-5.46 3.66-7.03 2.11-1.55 5.02-2.01 7.4-1.15V9.4c-1.31-.46-2.82-.33-4.01.44-1.22.79-1.92 2.26-1.71 3.71.25 1.62 1.58 3.14 3.26 3.4 1.54.21 3.19-.74 3.74-2.2.14-.38.16-.78.16-1.18V.24c.05-.14.1-.22.25-.22z"/>
            </svg>
          </a>
        </div>
        
        <button className="p-3 hover:bg-accent rounded-full transition-colors relative group">
          <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
        </button>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-3 hover:bg-accent rounded-full transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        <Link href="/signin" className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-black rounded-full text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
          <Heart className="w-3.5 h-3.5 fill-white" />
          Join the Club
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-full bg-black/20 backdrop-blur-sm lg:hidden h-screen"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-border flex flex-col p-8 gap-8 lg:hidden"
            >
              <div className="flex flex-col gap-6">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-black hover:text-primary tracking-tight">Home</Link>
                <Link href="/products" onClick={() => setIsOpen(false)} className="text-2xl font-black hover:text-primary tracking-tight">Shop All</Link>
                <Link href="/customizer" onClick={() => setIsOpen(false)} className="text-2xl font-black hover:text-primary tracking-tight">Co-create</Link>
                <Link href="/graduation" onClick={() => setIsOpen(false)} className="text-2xl font-black text-secondary tracking-tight">Graduation '24 ✦</Link>
              </div>
              
              <div className="pt-8 border-t border-border flex flex-col gap-6">
                <div className="flex items-center gap-8">
                  <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-sm">
                    Instagram
                  </a>
                  <a href={BRAND.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-sm">
                    TikTok
                  </a>
                </div>
                <Link href="/signin" onClick={() => setIsOpen(false)} className="w-full py-5 bg-primary text-white text-center font-black rounded-2xl shadow-xl uppercase text-xs tracking-[0.2em]">
                  Join the Club
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
