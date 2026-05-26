"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Sparkles, ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Character {
  id: string;
  name: string;
  price: number;
  color: string;
  personality: string;
  story: string;
  image: string | null;
}

interface ProductGridProps {
  characters: Character[];
}

export default function ProductGrid({ characters }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {characters.map((char, index) => (
        <motion.div
          key={char.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Link href={`/product/${char.id}`} className="group block">
            <article className="bg-white rounded-[3.5rem] border border-border/50 overflow-hidden hover:shadow-[0_32px_64px_-16px_rgba(74,58,53,0.1)] transition-all duration-500 h-full">
              {/* Image Area */}
              <div
                className="relative aspect-square flex items-center justify-center overflow-hidden m-4 mb-0 rounded-[2.5rem]"
                style={{ background: `${char.color}11` }}
              >
                <div
                  className="text-8xl font-black opacity-10 select-none"
                  style={{ color: char.color }}
                  aria-hidden="true"
                >
                  {char.name[0]}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3a35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Adoption Fee Tag */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-primary font-black text-[10px] uppercase tracking-widest shadow-sm">
                  Adoption Fee
                </div>

                {/* Action Overlay */}
                <div className="absolute inset-x-4 bottom-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="w-full py-4 bg-white text-primary font-black rounded-2xl shadow-xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest border border-primary/10">
                    <Heart className="w-4 h-4 fill-primary" aria-hidden="true" />
                    Meet {char.name.split(" — ")[0]}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-black text-[#4a3a35] tracking-tight">
                      {char.name}
                    </h2>
                    <div className="flex gap-1.5 mt-1">
                      {char.personality
                        .split(", ")
                        .slice(0, 2)
                        .map((p) => (
                          <span
                            key={p}
                            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                          >
                            {p}
                          </span>
                        ))}
                    </div>
                  </div>
                  <span className="text-2xl font-black text-primary">
                    {formatPrice(char.price)}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 italic font-medium">
                  &ldquo;{char.story.split(".")[0]}...&rdquo;
                </p>
              </div>
            </article>
          </Link>
        </motion.div>
      ))}

      {/* Custom Builder CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: characters.length * 0.1 }}
      >
        <Link href="/customizer">
          <div className="bg-[#2d2320] rounded-[3.5rem] border border-transparent overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col justify-between p-10 relative group">
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <Sparkles className="text-primary w-10 h-10 fill-primary/20" aria-hidden="true" />
              </div>
              <h2 className="text-4xl font-black mb-4 text-white leading-tight">
                Co-create your own
                <br />
                forever friend.
              </h2>
              <p className="text-white/40 font-medium mb-8 leading-relaxed">
                Every choice you make is a piece of your personality woven into yarn.
              </p>
            </div>

            <div className="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all uppercase text-[11px] tracking-widest w-fit">
              Start Co-creating{" "}
              <ArrowLeft className="w-4 h-4 rotate-180" aria-hidden="true" />
            </div>

            {/* Texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"
              aria-hidden="true"
            />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
