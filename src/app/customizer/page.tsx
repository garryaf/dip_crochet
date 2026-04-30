"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { CustomizerPanel } from "@/components/ui/CustomizerPanel";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

const PlushViewer = dynamic(() => import("@/components/three/PlushViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-accent/20 animate-pulse rounded-[3rem]" />,
});

export default function CustomizerPage() {
  const [config, setConfig] = useState({
    color: "#ff8fb1",
    eyeStyle: "cute",
    accessory: "none",
    name: "",
  });

  return (
    <div className="min-h-screen bg-[#fffbf9]">
      {/* Simple Header */}
      <nav className="p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <div className="text-2xl font-black text-primary tracking-tighter">COTCRET.</div>
        <div className="w-24" /> {/* Spacer */}
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
        {/* Left Side: 3D Preview */}
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
            
            <PlushViewer 
                color={config.color} 
                eyeStyle={config.eyeStyle} 
                accessory={config.accessory} 
            />

            {config.name && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/80 backdrop-blur shadow-lg border border-primary/20 rounded-full text-primary font-black text-lg animate-fade-in">
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

        {/* Right Side: Controls */}
        <section className="flex flex-col gap-8">
           <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-black tracking-tight">Create your personal <span className="text-primary text-glow">Crochet Doll</span>.</h1>
              <p className="text-lg text-muted-foreground font-medium">
                Customize every detail. Our master artisans will crochet it stitch by stitch just for you.
              </p>
           </div>
           
           <CustomizerPanel onUpdate={setConfig} />

           <div className="p-6 rounded-2xl bg-muted/50 border border-border">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" /> Why Custom?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Custom dolls are perfect for personalized gifts, matching with your partner, or celebrating a major life milestone like graduation or a new job.
              </p>
           </div>
        </section>
      </main>
    </div>
  );
}

function Info({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
