"use client";

import React from "react";
import Navigation from "@/shared/components/layout/Navigation";
import Footer from "@/shared/components/layout/Footer";
import HeroSection from "@/features/graduation/components/HeroSection";
import PreviewSection from "@/features/graduation/components/PreviewSection";
import OrderForm from "@/features/graduation/components/OrderForm";

export default function GraduationPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col">
      <Navigation />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-28 texture-bg w-full">
        <HeroSection />

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
            <PreviewSection />
            <OrderForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
