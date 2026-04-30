"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PlushViewer from "@/components/three/PlushViewer";
import { GraduationCap, Award, Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GraduationPage() {
  const [formData, setFormData] = useState({
    name: "",
    major: "",
    year: "2024",
  });

  return (
    <div className="min-h-screen bg-[#fffbf9]">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" /> Home
        </Link>
        <div className="text-2xl font-black text-[#212121] tracking-tighter flex items-center gap-2">
            GRADUATION <span className="text-primary">SERIES</span>
        </div>
        <div className="w-24" />
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="text-center mb-16 max-w-2xl mx-auto">
           <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex p-4 bg-primary text-white rounded-full mb-6"
           >
              <Award className="w-8 h-8" />
           </motion.div>
           <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Celebrate the <span className="text-primary italic">Success</span>.</h1>
           <p className="text-xl text-muted-foreground font-medium">
             A keepsake that lasts a lifetime. Our graduation dolls come with a custom cap, wooden diploma, and personalized name embroidery.
           </p>
        </section>

        <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="sticky top-32">
                <div className="aspect-square bg-gradient-to-br from-accent/50 to-white rounded-[3rem] shadow-xl overflow-hidden relative border border-border">
                    <PlushViewer accessory="grad-cap" color="#ff8fb1" />
                    <div className="absolute top-8 right-8 flex flex-col gap-2">
                         <div className="p-4 bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-border flex items-center gap-3">
                             <GraduationCap className="text-primary w-6 h-6" />
                             <div>
                                 <p className="text-[10px] uppercase font-bold text-muted-foreground">Included</p>
                                 <p className="font-bold text-sm">Graduation Cap</p>
                             </div>
                         </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                    <h2 className="text-3xl font-black">Personalize Your Graduate</h2>
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <User className="w-4 h-4" /> Full Name
                            </label>
                            <input 
                                type="text"
                                placeholder="E.g. Sarah J. Smith"
                                className="w-full p-4 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <Award className="w-4 h-4" /> Major / Degree
                            </label>
                            <input 
                                type="text"
                                placeholder="E.g. Computer Science"
                                className="w-full p-4 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                value={formData.major}
                                onChange={(e) => setFormData({...formData, major: e.target.value})}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Graduation Year
                            </label>
                            <select 
                                className="w-full p-4 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 outline-none bg-white font-bold"
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

                <div className="p-8 rounded-[2rem] bg-white border border-border shadow-sm">
                    <h3 className="font-bold text-xl mb-4">Summary Preview</h3>
                    <div className="space-y-4">
                        <li className="flex justify-between items-center text-muted-foreground">
                            <span>Base Model (Bunny)</span>
                            <span className="font-bold text-foreground">$15.00</span>
                        </li>
                        <li className="flex justify-between items-center text-muted-foreground">
                            <span>Graduation Kit</span>
                            <span className="font-bold text-foreground">$10.00</span>
                        </li>
                        <li className="flex justify-between items-center text-muted-foreground">
                            <span>Personalized Tag</span>
                            <span className="text-primary font-bold">FREE</span>
                        </li>
                        <hr className="border-dashed" />
                        <li className="flex justify-between items-center text-2xl font-black">
                            <span>Total Price</span>
                            <span>$25.00</span>
                        </li>
                    </div>
                    <button className="w-full mt-8 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">
                        Order Graduation Gift
                    </button>
                    <p className="text-center mt-4 text-xs text-muted-foreground font-medium">
                        *Shipped in a premium gift box with a congratulatory card.
                    </p>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
