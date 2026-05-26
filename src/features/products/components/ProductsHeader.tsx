"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProductsHeader() {
  return (
    <div className="mb-20 max-w-2xl">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4"
      >
        The Soul Collection
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-6xl md:text-[5.5rem] font-black tracking-tight leading-[0.88] mb-8 text-[#4a3a35]"
      >
        Every <span className="text-primary italic font-light">stitch</span> awaits you.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-muted-foreground font-medium leading-relaxed"
      >
        Explore our artisan character series. Each companion is hand-crocheted in our studio and is ready to start a new story with you.
      </motion.p>
    </div>
  );
}
