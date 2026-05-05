"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { BRAND, getWhatsAppLink } from "@/lib/constants";

export default function LiveSupport() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowBubble(true), 1500);
    }, 10000); // Appear after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-4 rounded-2xl shadow-2xl border border-border max-w-[200px] relative mb-2"
          >
            <button 
              onClick={() => setShowBubble(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-border rounded-full flex items-center justify-center text-[10px]"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-xs font-bold text-[#4a3a35]">
              Hi! Any questions about our crochet souls? I'm here to help! 🧶
            </p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-border rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <a
              href={getWhatsAppLink("Hi! I have a question about dip.crochet...")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center relative group"
            >
              <MessageCircle className="w-8 h-8" />
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 group-hover:hidden" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
