"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";

/**
 * CRO Logic:
 * Persistent CTA on mobile ensures that the "Conversion Path" is never buried 
 * during long vertical scrolls on small screens.
 */

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 600px (approx past the Hero)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 w-full z-[90] p-4 lg:hidden pointer-events-none"
        >
          <div className="flex gap-3 pointer-events-auto">
            <Link 
              href="/products" 
              className="flex-1 py-4 bg-white text-primary font-black rounded-2xl shadow-2xl border border-primary/20 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest active:scale-95 transition-transform"
            >
              <Heart className="w-3 h-3 fill-primary" /> Adopt Now
            </Link>
            <Link 
              href="/customizer" 
              className="flex-1 py-4 bg-primary text-white font-black rounded-2xl shadow-2xl flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest active:scale-95 transition-transform"
            >
              <Sparkles className="w-3 h-3 fill-white" /> Co-create
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
