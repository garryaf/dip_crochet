"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye, Heart } from "lucide-react";

const ACTIVITIES = [
  { type: "purchase", name: "Siti from Jakarta", item: "Momo the Bunny" },
  { type: "view", name: "15 people", item: "Custom Bear" },
  { type: "purchase", name: "Andi from Bekasi", item: "Graduation Duck" },
  { type: "like", name: "Someone", item: "your custom creation" },
];

export default function TrustSignals() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
      setIndex((prev) => (prev + 1) % ACTIVITIES.length);
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const activity = ACTIVITIES[index];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-8 left-8 z-[100] bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-primary/20 flex items-center gap-4 max-w-[320px]"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            {activity.type === "purchase" && <ShoppingBag className="w-5 h-5 text-primary" />}
            {activity.type === "view" && <Eye className="w-5 h-5 text-primary" />}
            {activity.type === "like" && <Heart className="w-5 h-5 text-primary fill-primary" />}
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {activity.type === "purchase" ? "Just Purchased" : activity.type === "view" ? "Trending Now" : "New Interest"}
            </p>
            <p className="text-sm font-black leading-tight">
              {activity.name} <span className="font-medium text-muted-foreground tracking-normal">just viewed/ordered</span> {activity.item}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
