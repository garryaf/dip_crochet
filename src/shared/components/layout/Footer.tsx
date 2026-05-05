"use client";

import React from "react";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import { BRAND } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="py-20 px-6 md:px-20 border-t border-border bg-white mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <BrandLogo size="lg" />
          <p className="text-muted-foreground font-medium max-w-xs leading-relaxed mt-4 text-sm">
            Creating emotional connections through handmade crochet art. Every piece is unique, just like you.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-muted-foreground">Explore</h4>
          <ul className="flex flex-col gap-3 font-medium">
            <li><Link href="/products" className="hover:text-primary transition-colors">All Characters</Link></li>
            <li><Link href="/customizer" className="hover:text-primary transition-colors">Custom Builder</Link></li>
            <li><Link href="/graduation" className="hover:text-secondary transition-colors">Graduation Collection</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-muted-foreground">Connect</h4>
          <ul className="flex flex-col gap-3 font-medium">
            <li><a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
            <li><a href={BRAND.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">TikTok</a></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-xs font-medium pt-8 border-t border-border">
        <p>© 2024 {BRAND.name}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
