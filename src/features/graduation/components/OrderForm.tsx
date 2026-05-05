"use client";

import React, { useState } from "react";
import { User, Award, Calendar, ChevronRight } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    major: "",
    year: "2024",
  });

  const basePrice = 95000;
  const kitPrice = 25000;
  const total = basePrice + kitPrice;

  const handleOrder = () => {
    const message = `Hi dip.crochet! I'd like to order a Graduation Soul:\n\n- Name: ${formData.name || "N/A"}\n- Major: ${formData.major || "N/A"}\n- Year: ${formData.year}\n\nCan I proceed with the order?`;
    window.open(getWhatsAppLink(message), "_blank");
  };

  return (
    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black tracking-tight text-[#4a3a35]">Personalize</h2>
            <div className="space-y-6">
                <div className="flex flex-col gap-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> Graduate Name
                    </label>
                    <input 
                        type="text"
                        placeholder="E.g. Sarah J. Smith"
                        className="w-full p-5 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 outline-none font-bold bg-white/50"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5" /> Major / Degree
                    </label>
                    <input 
                        type="text"
                        placeholder="E.g. Computer Science"
                        className="w-full p-5 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 outline-none font-bold bg-white/50"
                        value={formData.major}
                        onChange={(e) => setFormData({...formData, major: e.target.value})}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> Graduation Year
                    </label>
                    <select 
                        className="w-full p-5 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 outline-none bg-white font-bold appearance-none cursor-pointer"
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                    >
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="p-10 rounded-[3rem] bg-white border border-border shadow-2xl shadow-primary/5">
            <h3 className="font-black text-xl mb-6 text-[#4a3a35]">Order Summary</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-muted-foreground font-medium">
                    <span>Base Soul (Bunny)</span>
                    <span className="font-bold text-foreground">IDR 95.000</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground font-medium">
                    <span>Graduation Kit (Cap + Diploma)</span>
                    <span className="font-bold text-foreground">IDR 25.000</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground font-medium">
                    <span>Gift Box & Card</span>
                    <span className="text-secondary font-black text-[10px] uppercase tracking-widest px-2 py-1 bg-secondary/10 rounded-md">FREE</span>
                </div>
                <hr className="border-dashed border-border" />
                <div className="flex justify-between items-center text-3xl font-black text-primary pt-2">
                    <span>Total</span>
                    <span>IDR {(total).toLocaleString('id-ID')}</span>
                </div>
            </div>
            <button 
                onClick={handleOrder}
                className="w-full mt-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/25 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                Start Adoption <ChevronRight className="w-5 h-5" />
            </button>
            <p className="text-center mt-6 text-xs text-muted-foreground font-medium italic">
                *Every graduation gift is blessed with success.
            </p>
        </div>
    </div>
  );
}
