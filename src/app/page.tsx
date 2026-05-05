"use client";

import React from "react";
import Navigation from "@/shared/components/layout/Navigation";
import Footer from "@/shared/components/layout/Footer";
import Hero from "@/features/home/components/Hero";
import CharacterSeries from "@/features/home/components/CharacterSeries";
import CustomBuilderCTA from "@/features/home/components/CustomBuilderCTA";
import TikTokSpotlight from "@/features/home/components/TikTokSpotlight";
import Location from "@/features/home/components/Location";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navigation />
      
      <main>
        <Hero />
        <CharacterSeries />
        <CustomBuilderCTA />
        <TikTokSpotlight />
        <Location />
      </main>

      <Footer />
    </div>
  );
}
