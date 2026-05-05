"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";
import PreviewSection from "@/features/customizer/components/PreviewSection";
import ControlSection from "@/features/customizer/components/ControlSection";
import { useCustomization } from "@/features/customizer/hooks/useCustomization";
import Footer from "@/shared/components/layout/Footer";

export default function CustomizerPage() {
  const { config, setConfig } = useCustomization();

  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <BrandLogo />
        <div className="w-24" /> {/* Spacer */}
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 lg:gap-20">
        <PreviewSection config={config} />
        <ControlSection onUpdate={setConfig} />
      </main>

      <Footer />
    </div>
  );
}
