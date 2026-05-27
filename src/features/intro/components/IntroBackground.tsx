"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Animated decorative background — soft gradient blobs + crochet patterns.
 * More visible than before to fill the "empty" feeling.
 */

export default function IntroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {/* Large soft gradient blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[100px]"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-secondary/[0.06] blur-[100px]"
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#ffca3a]/[0.04] blur-[80px]"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Yarn stitch SVG patterns — more visible */}
      <motion.svg
        viewBox="0 0 80 80"
        className="absolute top-16 right-20 w-16 h-16 text-primary/[0.12]"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M20 60 L40 20 L60 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M28 52 L40 28 L52 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 80 80"
        className="absolute bottom-24 left-16 w-12 h-12 text-secondary/[0.12]"
        animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <path d="M20 60 L40 20 L60 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      </motion.svg>

      {/* Dotted circle pattern */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-1/2 left-8 w-20 h-20 text-primary/[0.08]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" fill="none" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 100 100"
        className="absolute bottom-1/3 right-12 w-24 h-24 text-secondary/[0.07]"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 10" fill="none" />
        <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" strokeDasharray="3 8" fill="none" opacity="0.5" />
      </motion.svg>

      {/* Felt texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/felt.png')" }}
      />
    </div>
  );
}
