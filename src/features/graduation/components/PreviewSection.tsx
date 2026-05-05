"use client";

import React from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const PlushViewer = dynamic(() => import("@/components/three/PlushViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-accent/20 animate-pulse rounded-[3rem]" />,
});

export default function PreviewSection() {
  return (
    <div className="sticky top-32">
        <div className="aspect-square bg-gradient-to-br from-accent/50 to-white rounded-[3rem] shadow-xl overflow-hidden relative border border-white">
            <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full text-primary font-black text-xs shadow-sm z-10 border border-primary/10">
              <Sparkles className="w-4 h-4" />
              Graduation Special
            </div>
            
            <PlushViewer accessory="grad-cap" color="#ff8fb1" />
            
            <div className="absolute top-8 right-8 flex flex-col gap-2">
                 <div className="p-4 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-border flex items-center gap-3">
                     <GraduationCap className="text-secondary w-6 h-6" />
                     <div>
                         <p className="text-[10px] uppercase font-bold text-muted-foreground">Included</p>
                         <p className="font-bold text-sm">Graduation Kit</p>
                     </div>
                 </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/80 backdrop-blur shadow-lg border border-primary/20 rounded-full text-primary font-black text-xs animate-pulse">
               360° PREVIEW
            </div>
        </div>
    </div>
  );
}
