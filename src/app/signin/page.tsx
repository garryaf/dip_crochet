"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col items-center justify-center p-6">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </Link>
      
      <div className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-2xl border border-white">
        <div className="text-center mb-10">
          <BrandLogo size="lg" />
          <h1 className="text-3xl font-black mt-6 tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground font-medium mt-2">Sign in to manage your custom orders</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="hello@example.com"
              className="w-full p-4 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 outline-none font-medium"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full p-4 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 outline-none font-medium"
            />
          </div>
          
          <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 mt-4">
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-muted-foreground">
          Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
