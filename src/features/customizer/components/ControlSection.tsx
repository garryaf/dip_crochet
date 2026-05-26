"use client";

import React from "react";
import { Info, Heart } from "lucide-react";
import { CustomizerPanel } from "./CustomizerPanel";

interface ControlSectionProps {
  onUpdate: (config: any) => void;
}

export default function ControlSection({ onUpdate }: ControlSectionProps) {
  return (
    <section className="flex flex-col gap-10">
       <div className="flex flex-col gap-3">
          <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">The Workshop</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#4a3a35]">
            Co-create your<br />
            <span className="text-primary italic font-light">forever friend.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed">
            Every companion starts with a dream. Choose the details that resonate with you, and we'll bring them to life with every stitch.
          </p>
       </div>
       
       <CustomizerPanel onUpdate={onUpdate} />

       <div className="p-8 rounded-[2.5rem] bg-white border border-border/50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
          <h4 className="font-black text-lg mb-3 flex items-center gap-2 text-[#4a3a35]">
            <Heart className="w-5 h-5 text-secondary fill-secondary" /> Why Co-create?
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            Unlike mass-produced toys, a co-created companion carries your intent. Whether it's a gift for a loved one or a treat for your inner child, it’s a story waiting to be told.
          </p>
       </div>
    </section>
  );
}
