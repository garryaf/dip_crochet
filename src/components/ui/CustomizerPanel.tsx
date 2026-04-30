"use client";

import React, { useState } from "react";
import { COLORS, EYE_STYLES, ACCESSORIES } from "@/lib/constants";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-col gap-8 p-6 bg-white/50 backdrop-blur-md rounded-3xl border border-white/50 custom-shadow">
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          1. Select Yarn Color
          <Info className="w-4 h-4 text-muted-foreground" />
        </h3>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => handleChange("color", color.value)}
              className={cn(
                "w-12 h-12 rounded-full border-4 transition-all scale-100 hover:scale-110 flex items-center justify-center",
                config.color === color.value ? "border-primary shadow-lg" : "border-transparent"
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {config.color === color.value && (
                <Check className={cn("w-6 h-6", color.value === "#ffffff" ? "text-primary" : "text-white")} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">2. Choose Eye Style</h3>
        <div className="grid grid-cols-3 gap-2">
          {EYE_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => handleChange("eyeStyle", style.id)}
              className={cn(
                "px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                config.eyeStyle === style.id
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-white border-border hover:border-primary/50"
              )}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">3. Add Accessories</h3>
        <div className="grid grid-cols-2 gap-2">
          {ACCESSORIES.map((acc) => (
            <button
              key={acc.id}
              onClick={() => handleChange("accessory", acc.id)}
              className={cn(
                "px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left",
                config.accessory === acc.id
                  ? "bg-secondary text-white border-secondary shadow-md"
                  : "bg-white border-border hover:border-secondary/50"
              )}
            >
              {acc.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">4. Custom Name (Optional)</h3>
        <input
          type="text"
          placeholder="E.g. Bunny Momo"
          className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
          value={config.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <p className="mt-2 text-xs text-muted-foreground italic">
          *Name will be embroidered on a tiny wooden heart tag.
        </p>
      </div>
      
      <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all transform hover:-translate-y-1">
        Add to Cart — $25.00
      </button>
    </div>
  );
}
