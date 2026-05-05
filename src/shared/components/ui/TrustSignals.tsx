"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye, Heart } from "lucide-react";

/**
 * Psychological Reasoning:
 * 1. Social Proof: "21 people looking" creates herd mentality.
 * 2. Endowment Effect: "Just adopted" makes the user feel they might miss out.
 * 3. Humanization: Using specific locations (Bekasi, Jakarta) creates local trust.
 */

const ACTIVITIES = [
  { type: "adoption", name: "Sarah from Jakarta", item: "Momo (Secret-Keeper)" },
  { type: "view", name: "21 people", item: "Custom Co-creation" },
  { type: "adoption", name: "Andi from Bekasi", item: "The Midnight Bear" },
  { type: "interest", name: "Someone", item: "the Graduation Series" },
];

export default function TrustSignals() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay for first appearance
    const startTimeout = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 6000);
    }, 5000);

    const timer = setInterval(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 6000);
      setIndex((prev) => (prev + 1) % ACTIVITIES.length);
    }, 15000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(timer);
    };
  }, []);

  const activity = ACTIVITIES[index];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-8 left-8 z-[100] bg-white/80 backdrop-blur-2xl p-5 rounded-[2rem] shadow-2xl border border-white/60 flex items-center gap-5 max-w-[340px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            {activity.type === "adoption" && <ShoppingBag className="w-5 h-5 text-primary" />}
            {activity.type === "view" && <Eye className="w-5 h-5 text-primary" />}
            {activity.type === "interest" && <Heart className="w-5 h-5 text-primary fill-primary" />}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
              {activity.type === "adoption" ? "New Adoption" : activity.type === "view" ? "Trending" : "New Interest"}
            </p>
            <p className="text-sm font-black text-[#4a3a35] leading-tight tracking-tight">
              {activity.name} <span className="font-medium text-muted-foreground italic">just interacted with</span> {activity.item}
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
