"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, X } from "lucide-react";
import IntroBackground from "./IntroBackground";
import IntroLoader from "./IntroLoader";
import { useIntroState } from "../hooks/useIntroState";

// Lazy load the heavy 3D scene
const IntroScene = dynamic(() => import("./IntroScene"), {
  ssr: false,
  loading: () => <IntroLoader />,
});

/**
 * Main Intro Overlay — orchestrates the entire intro experience.
 * Renders as a fixed overlay on top of the homepage.
 * Dismisses on "Get Started" click or "Skip" button.
 */
export default function IntroOverlay() {
  const { showIntro, dismissIntro, isReady } = useIntroState();
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect mobile and reduced motion
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Auto-show content after scene loads (or timeout)
  useEffect(() => {
    if (!showIntro) return;

    const timer = setTimeout(() => {
      setSceneLoaded(true);
      // Stagger content appearance
      setTimeout(() => setShowContent(true), 500);
    }, prefersReducedMotion ? 200 : 1500);

    return () => clearTimeout(timer);
  }, [showIntro, prefersReducedMotion]);

  // Handle dismiss with exit animation
  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      dismissIntro();
    }, 800);
  }, [dismissIntro]);

  // Handle keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        handleDismiss();
      }
    };
    if (showIntro) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [showIntro, handleDismiss]);

  // Don't render until client-side check is done
  if (!isReady || !showIntro) return null;

  // Reduced motion: show simple version
  if (prefersReducedMotion) {
    return (
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] bg-[#fffbf9] flex flex-col items-center justify-center gap-8"
            role="dialog"
            aria-label="Welcome to dip.crochet"
          >
            <h1 className="text-5xl md:text-7xl font-black text-[#4a3a35]">
              dip<span className="text-primary">.</span>crochet
            </h1>
            <p className="text-muted-foreground font-medium text-lg">
              Premium Handmade Crochet Characters
            </p>
            <button
              onClick={handleDismiss}
              className="px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30"
            >
              Explore Collection
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1000] bg-[#fffbf9] flex flex-col items-center justify-center overflow-hidden"
          role="dialog"
          aria-label="Welcome to dip.crochet"
        >
          {/* Skip button — always visible */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleDismiss}
            className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors"
            aria-label="Skip intro"
          >
            Skip <X className="w-4 h-4" />
          </motion.button>

          {/* Animated background patterns */}
          <IntroBackground />

          {/* 3D Scene */}
          <div className="relative w-full h-[40vh] md:h-[50vh] max-w-4xl">
            <AnimatePresence>
              {!sceneLoaded && <IntroLoader />}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sceneLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <IntroScene quality={isMobile ? "low" : "high"} />
            </motion.div>
          </div>

          {/* Tagline + CTA */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center gap-6 mt-4 md:mt-8 px-6 text-center"
              >
                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-lg md:text-xl text-muted-foreground font-medium max-w-md leading-relaxed"
                >
                  Every stitch tells a story.
                  <br />
                  <span className="text-primary font-bold">Handmade with soul</span>, for yours.
                </motion.p>

                {/* Get Started Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDismiss}
                  className="group px-12 py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 flex items-center gap-3 text-sm md:text-base uppercase tracking-widest hover:shadow-primary/50 transition-shadow"
                >
                  Explore Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Subtle hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-[0.3em]"
                >
                  Bekasi, Indonesia ✦ Since 2023
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
