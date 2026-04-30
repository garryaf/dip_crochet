"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Heart } from "lucide-react";
import { CHARACTERS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9]">
      {/* Nav */}
      <nav className="p-6 flex justify-between items-center bg-white/60 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" /> Home
        </Link>
        <div className="text-2xl font-black text-primary tracking-tighter">COTCRET.</div>
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <ShoppingBag className="w-6 h-6" />
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold text-sm uppercase tracking-widest mb-4"
          >
            Our Characters
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6"
          >
            Meet the full <span className="text-primary">cast</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-medium"
          >
            Each doll is hand-crocheted with premium cotton yarn and comes with its own story card.
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CHARACTERS.map((char, index) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/product/${char.id}`} className="group block">
                <div className="bg-white rounded-[2.5rem] border border-border overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  {/* Image Area */}
                  <div
                    className="relative aspect-square flex items-center justify-center overflow-hidden"
                    style={{ background: `${char.color}22` }}
                  >
                    {/* Placeholder character art */}
                    <div
                      className="w-40 h-40 rounded-full flex items-center justify-center text-6xl font-black opacity-40"
                      style={{ backgroundColor: char.color, color: "#fff" }}
                    >
                      {char.name[0]}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Wishlist */}
                    <button
                      className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:scale-110"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart className="w-5 h-5 text-primary" />
                    </button>

                    {/* Quick Add */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                      <button
                        className="flex items-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-2xl shadow-xl hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
                        onClick={(e) => e.preventDefault()}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h2 className="text-xl font-black">{char.name}</h2>
                        <p className="text-sm text-muted-foreground font-medium italic">{char.personality}</p>
                      </div>
                      <span className="text-xl font-black text-primary">{formatPrice(char.price)}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                      {char.story}
                    </p>

                    {/* Color Swatch */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: char.color }}
                      />
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: char.secondaryColor }}
                      />
                      <span className="text-xs text-muted-foreground font-medium ml-1">+3 colors</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Custom Builder CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: CHARACTERS.length * 0.1 }}
          >
            <Link href="/customizer">
              <div className="bg-[#4a3a35] rounded-[2.5rem] border border-transparent overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full min-h-[500px] flex flex-col justify-between p-8">
                <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center">
                  <span className="text-4xl">✨</span>
                </div>
                <div className="text-white">
                  <h2 className="text-3xl font-black mb-3">Design Your Own</h2>
                  <p className="text-white/60 font-medium mb-6">
                    Choose yarn color, eye style, accessories and a custom name tag.
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-colors">
                    Start Building
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
