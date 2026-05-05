"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
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
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href={BRAND.tiktok} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
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
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        <Link href="/signin" className="hidden lg:block px-5 py-2 bg-primary text-white font-semibold rounded-full text-sm shadow-lg shadow-primary/25 hover:scale-105 transition-transform active:scale-95">
          Sign In
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-border flex flex-col p-6 gap-6 lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-bold hover:text-primary">Home</Link>
              <Link href="/products" onClick={() => setIsOpen(false)} className="text-xl font-bold hover:text-primary">Shop</Link>
              <Link href="/customizer" onClick={() => setIsOpen(false)} className="text-xl font-bold hover:text-primary">Custom Builder</Link>
              <Link href="/graduation" onClick={() => setIsOpen(false)} className="text-xl font-bold text-secondary">Graduation '24 ✦</Link>
            </div>
            
            <div className="pt-6 border-t border-border flex items-center gap-6">
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold">
                Instagram
              </a>
              <a href={BRAND.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold">
                TikTok
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
