"use client";

import React from "react";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { CHARACTERS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export default function CrossSell({ currentId }: { currentId: string }) {
  const suggestions = CHARACTERS.filter(c => c.id !== currentId).slice(0, 2);

  return (
    <section className="py-20 border-t border-border/50">
      <h3 className="text-2xl font-black mb-8 text-[#4a3a35]">Adopted together...</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {suggestions.map((char) => (
          <Link key={char.id} href={`/product/${char.id}`} className="group">
            <div className="bg-white p-6 rounded-[2.5rem] border border-border/50 flex items-center gap-6 group-hover:shadow-xl transition-all">
              <div 
                className="w-24 h-24 rounded-3xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${char.color}22` }}
              >
                <span className="text-3xl font-black opacity-20" style={{ color: char.color }}>{char.name[0]}</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-black text-[#4a3a35] group-hover:text-primary transition-colors">{char.name.split(' — ')[0]}</h4>
                <p className="text-sm font-bold text-primary">{formatPrice(char.price)}</p>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-black uppercase text-secondary">
                  <Plus className="w-3 h-3" /> Pair with current
                </div>
              </div>
              <div className="p-3 bg-accent rounded-2xl text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-5 h-5 fill-primary" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
