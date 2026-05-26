"use client";

import React from "react";
import CartDrawer from "@/features/cart/components/CartDrawer";

/**
 * Cart Provider — renders the CartDrawer globally.
 * Placed in root layout so the drawer is accessible from any page.
 */
export default function CartProvider() {
  return <CartDrawer />;
}
