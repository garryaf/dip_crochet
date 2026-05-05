"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Sparkles, Clock } from "lucide-react";
import { CustomizationConfig } from "../hooks/useCustomization";

const PlushViewer = dynamic(() => import("@/components/three/PlushViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-accent/20 animate-pulse rounded-[3rem]" />,
});

interface PreviewSectionProps {
  config: CustomizationConfig;
}

export default function PreviewSection({ config }: PreviewSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-square bg-white rounded-[3rem] shadow-2xl border border-white overflow-hidden flex items-center justify-center p-8"
      >
        <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-primary font-bold text-sm shadow-sm z-10">
          <Sparkles className="w-4 h-4" />
          Live Preview
        </div>

        <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full text-secondary font-bold text-[10px] shadow-sm z-10 border border-secondary/10">
          <Clock className="w-3 h-3" />
          Queue: 3 dolls ahead
        </div>
        
        <PlushViewer 
            color={config.color} 
            eyeStyle={config.eyeStyle} 
            accessory={config.accessory} 
        />

        {config.name && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/80 backdrop-blur shadow-lg border border-primary/20 rounded-full text-primary font-black text-lg animate-fade-in text-center">
            {config.name}
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-border">
            <h4 className="font-bold text-sm text-muted-foreground uppercase mb-1">Estimated Crafting</h4>
            <p className="text-xl font-bold">3 - 5 Days</p>
         </div>
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-border">
            <h4 className="font-bold text-sm text-muted-foreground uppercase mb-1">Materials</h4>
            <p className="text-xl font-bold">Egyptian Cotton</p>
         </div>
      </div>
    </section>
  );
}
