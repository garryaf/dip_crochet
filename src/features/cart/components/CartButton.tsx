"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/features/cart/store/cartStore";

/**
 * Cart icon button with item count badge.
 * Used in the navigation bar.
 */
export default function CartButton() {
  const { openCart, getItemCount } = useCartStore();
  const count = getItemCount();

  return (
    <button
      onClick={openCart}
      className="p-3 hover:bg-accent rounded-full transition-colors relative group"
      aria-label={`Shopping cart${count > 0 ? `, ${count} items` : ""}`}
    >
      <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
      {count > 0 && (
        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
