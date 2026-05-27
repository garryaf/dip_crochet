"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Animated decorative background with transparent crochet-inspired patterns.
 * Uses SVG shapes with gentle floating motion for depth.
 */

function CrochetStitch({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -12, 0] }}
      transition={{
        opacity: { duration: 1.5, delay },
        y: { duration: 8 + delay * 2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* V-stitch pattern */}
      <path
        d="M20 60 L40 20 L60 60"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M25 55 L40 25 L55 55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <circle cx="40" cy="18" r="4" fill="currentColor" opacity="0.3" />
    </motion.svg>
  );
}

function YarnBall({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      transition={{
        opacity: { duration: 2, delay },
        rotate: { duration: 30, repeat: Infinity, ease: "linear" },
      }}
    >
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M25 50 Q50 20 75 50 Q50 80 25 50" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M50 20 Q80 50 50 80 Q20 50 50 20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M30 30 Q50 50 70 30" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M30 70 Q50 50 70 70" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    </motion.svg>
  );
}

function Hook({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 40 80"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
      transition={{
        opacity: { duration: 1.5, delay },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <path
        d="M20 75 L20 25 Q20 10 30 10 Q40 10 35 20 Q30 30 20 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </motion.svg>
  );
}

export default function IntroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large yarn ball — top left */}
      <YarnBall
        className="absolute -top-10 -left-10 w-48 h-48 text-primary/[0.07]"
        delay={0.3}
      />

      {/* Stitch pattern — top right */}
      <CrochetStitch
        className="absolute top-20 right-16 w-20 h-20 text-secondary/[0.1]"
        delay={0.8}
      />

      {/* Hook — bottom left */}
      <Hook
        className="absolute bottom-32 left-20 w-12 h-24 text-primary/[0.08]"
        delay={1.2}
      />

      {/* Small yarn ball — bottom right */}
      <YarnBall
        className="absolute -bottom-8 -right-8 w-36 h-36 text-secondary/[0.06]"
        delay={0.5}
      />

      {/* Stitch — center left */}
      <CrochetStitch
        className="absolute top-1/2 -left-4 w-16 h-16 text-primary/[0.06] blur-[1px]"
        delay={1.5}
      />

      {/* Stitch — center right */}
      <CrochetStitch
        className="absolute top-1/3 right-1/4 w-14 h-14 text-secondary/[0.08] blur-[0.5px]"
        delay={2}
      />

      {/* Radial gradient overlays for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,143,177,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(110,191,181,0.04),transparent_50%)]" />
    </div>
  );
}
