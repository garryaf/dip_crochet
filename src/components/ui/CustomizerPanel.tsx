"use client";

import React, { useState } from "react";
import { COLORS, EYE_STYLES, ACCESSORIES } from "@/lib/constants";
import { Check, Info, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/constants";

interface CustomizerPanelProps {
  onUpdate: (config: {
    color: string;
    eyeStyle: string;
    accessory: string;
    name: string;
  }) => void;
}

export function CustomizerPanel({ onUpdate }: CustomizerPanelProps) {
  const [config, setConfig] = useState({
    color: COLORS[0].value,
    eyeStyle: EYE_STYLES[0].id,
    accessory: ACCESSORIES[0].id,
    name: "",
  });

  const handleChange = (key: string, value: string) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onUpdate(newConfig);
  };

  return (
    <div className="flex flex-col gap-8 p-8 bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white/50 custom-shadow">
      <div>
        <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-[#4a3a35]">
          1. Choice of Spirit (Color)
        </h3>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => handleChange("color", color.value)}
              className={cn(
                "w-12 h-12 rounded-full border-4 transition-all scale-100 hover:scale-110 flex items-center justify-center relative group",
                config.color === color.value ? "border-primary shadow-lg scale-105" : "border-white"
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {config.color === color.value && (
                <Check className={cn("w-6 h-6", (color.value === "#ffffff" || color.value === "#B4E4FF") ? "text-primary" : "text-white")} />
              )}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-black mb-4 text-[#4a3a35]">2. The Soul's Expression (Eyes)</h3>
        <div className="grid grid-cols-3 gap-3">
          {EYE_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => handleChange("eyeStyle", style.id)}
              className={cn(
                "px-4 py-3 rounded-2xl border-2 text-xs font-black uppercase tracking-widest transition-all",
                config.eyeStyle === style.id
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-white border-border hover:border-primary/30"
              )}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-black mb-4 text-[#4a3a35]">3. Personal Style (Accessories)</h3>
        <div className="grid grid-cols-2 gap-3">
          {ACCESSORIES.map((acc) => (
            <button
              key={acc.id}
              onClick={() => handleChange("accessory", acc.id)}
              className={cn(
                "px-4 py-4 rounded-2xl border-2 text-xs font-black uppercase tracking-widest transition-all text-center",
                config.accessory === acc.id
                  ? "bg-secondary text-white border-secondary shadow-lg shadow-secondary/20"
                  : "bg-white border-border hover:border-secondary/30"
              )}
            >
              {acc.name}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <h3 className="text-lg font-black mb-4 text-[#4a3a35]">4. A Name to Remember</h3>
        <input
          type="text"
          placeholder="E.g. Momo"
          className="w-full px-6 py-4 bg-white/50 border-2 border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold placeholder:font-medium"
          value={config.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <p className="mt-3 text-[10px] text-muted-foreground font-bold italic flex items-center gap-1">
          <Info className="w-3 h-3" /> Every name is hand-embroidered on a tiny wooden heart.
        </p>
      </div>
      
      <div className="pt-4 border-t border-border/50">
        <div className="flex justify-between items-center mb-6">
            <span className="text-muted-foreground font-bold text-sm uppercase tracking-widest">Adoption Fee</span>
            <span className="text-3xl font-black text-[#4a3a35]">IDR 95.000</span>
        </div>
        <button 
          onClick={() => {
            const colorName = COLORS.find(c => c.value === config.color)?.name || config.color;
            const eyeName = EYE_STYLES.find(e => e.id === config.eyeStyle)?.name || config.eyeStyle;
            const accName = ACCESSORIES.find(a => a.id === config.accessory)?.name || config.accessory;
            
            const message = `Halo Kak dip.crochet! Aku ingin ADOPSI boneka custom buatan tangan:\n\n- Warna: ${colorName}\n- Mata: ${eyeName}\n- Aksesoris: ${accName}\n- Nama: ${config.name || "Belum ada"}\n\nKira-kira kapan bisa selesai dikirim ya?`;
            
            window.open(getWhatsAppLink(message), "_blank");
          }}
          className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em]"
        >
          <Heart className="w-4 h-4 fill-white" /> Adopsi Sekarang
        </button>
      </div>
    </div>
  );
}
