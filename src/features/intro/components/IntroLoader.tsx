"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Premium loading indicator shown while 3D assets load.
 * Yarn-ball inspired spinning animation.
 */
export default function IntroLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10"
    >
      {/* Spinning yarn circle */}
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-3 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-lg">🧶</span>
        </div>
      </div>

      <p className="text-sm font-bold text-muted-foreground tracking-widest uppercase animate-pulse">
        Stitching your experience...
      </p>
    </motion.div>
  );
}
