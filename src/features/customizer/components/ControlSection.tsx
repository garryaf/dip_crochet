"use client";

import React from "react";
import { Info } from "lucide-react";
import { CustomizerPanel } from "@/components/ui/CustomizerPanel";
import { CustomizationConfig } from "../hooks/useCustomization";

interface ControlSectionProps {
  onUpdate: (config: any) => void;
}

export default function ControlSection({ onUpdate }: ControlSectionProps) {
  return (
    <section className="flex flex-col gap-8">
       <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-black tracking-tight leading-tight">
            Create your personal <br />
            <span className="text-primary text-glow italic">Crochet Doll</span>.
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Customize every detail. Our master artisans will crochet it stitch by stitch just for you.
          </p>
       </div>
       
       <CustomizerPanel onUpdate={onUpdate} />

       <div className="p-6 rounded-2xl bg-muted/50 border border-border">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" /> Why Custom?
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            Custom dolls are perfect for personalized gifts, matching with your partner, or celebrating a major life milestone like graduation or a new job.
          </p>
       </div>
    </section>
  );
}
