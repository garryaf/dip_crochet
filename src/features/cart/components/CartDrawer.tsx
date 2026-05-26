"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, Heart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/features/cart/store/cartStore";
import { formatPrice } from "@/lib/utils";

/**
 * Cart Drawer — Slide-in panel showing cart contents.
 * Uses Zustand store for state management.
 */
export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getItemCount } =
    useCartStore();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[200]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[201] flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-black text-[#4a3a35]">
                  Your Cart
                  {itemCount > 0 && (
                    <span className="ml-2 text-sm font-bold text-muted-foreground">
                      ({itemCount})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-accent rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-black text-[#4a3a35] mb-1">Cart is empty</p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Find your forever friend in our collection
                    </p>
                  </div>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-accent/30 rounded-2xl border border-border/50"
                    >
                      {/* Color swatch */}
                      <div
                        className="w-16 h-16 rounded-xl shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: `${item.config.color || "#ff8fb1"}22` }}
                      >
                        <span
                          className="text-2xl font-black opacity-30"
                          style={{ color: item.config.color || "#ff8fb1" }}
                        >
                          {item.productName[0]}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-[#4a3a35] truncate">
                          {item.productName}
                        </h4>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">
                          {item.config.customName && `"${item.config.customName}" · `}
                          {item.config.eyeStyle || "cute"} eyes
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-black text-primary text-sm">
                            {formatPrice(item.price)}
                          </span>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-accent transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-accent transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors self-start"
                        aria-label={`Remove ${item.productName}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-muted-foreground">Subtotal</span>
                  <span className="text-2xl font-black text-[#4a3a35]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  Shipping calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  Checkout via WhatsApp
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
