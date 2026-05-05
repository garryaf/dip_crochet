"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col items-center justify-center p-6 selection:bg-primary/20">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-black text-xs uppercase tracking-widest">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </Link>
      
      <div className="w-full max-w-md bg-white p-10 md:p-12 rounded-[3.5rem] shadow-2xl border border-white relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />

        <div className="text-center mb-10 relative z-10">
          <BrandLogo size="lg" />
          <h1 className="text-4xl font-black mt-8 tracking-tight text-[#4a3a35]">Join the Club</h1>
          <p className="text-muted-foreground font-medium mt-3">Start your adoption journey and track your co-creations.</p>
        </div>

        <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Your Name"
              className="w-full p-5 rounded-2xl border-2 border-border focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold bg-white/50 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="hello@example.com"
              className="w-full p-5 rounded-2xl border-2 border-border focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold bg-white/50 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full p-5 rounded-2xl border-2 border-border focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold bg-white/50 transition-all"
            />
          </div>
          
          <button className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95 mt-6 flex items-center justify-center gap-2 uppercase text-xs tracking-widest">
            <Heart className="w-4 h-4 fill-white" /> Create Account
          </button>
        </form>

        <div className="mt-10 text-center text-xs font-bold text-muted-foreground relative z-10 uppercase tracking-widest">
          Already a member? <Link href="/signin" className="text-primary font-black hover:underline ml-1">Sign In</Link>
        </div>
      </div>

      <div className="mt-12 flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
         <span>Handmade in Bekasi</span>
         <span className="w-1 h-1 rounded-full bg-border" />
         <span>Stitched with Soul</span>
      </div>
    </div>
  );
}
