"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="text-center mb-16 max-w-2xl mx-auto">
       <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex p-5 bg-primary text-white rounded-full mb-8 shadow-xl shadow-primary/20"
       >
          <Award className="w-8 h-8" />
       </motion.div>
       <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[0.9]">
         Celebrate the <span className="text-primary italic font-light">success.</span>
       </h1>
       <p className="text-xl text-muted-foreground font-medium leading-relaxed">
         A keepsake that lasts a lifetime. Our graduation souls come with a custom cap, wooden diploma, and personalized heart tag.
       </p>
    </section>
  );
}
