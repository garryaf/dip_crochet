"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useCartStore, type CartItemConfig } from "@/features/cart/store/cartStore";
import { analytics } from "@/services/analytics";
import { trackAddToCart } from "@/services/analytics/ecommerce";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  image?: string;
  config: CartItemConfig;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Add to Cart button with analytics tracking.
 * Adds item to Zustand store and fires tracking events.
 */
export default function AddToCartButton({
  productId,
  productName,
  price,
  image,
  config,
  className,
  children,
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    // Add to store
    addItem({
      productId,
      productName,
      price,
      quantity: 1,
      image,
      config,
    });

    // Track analytics
    trackAddToCart({
      item_id: productId,
      item_name: productName,
      price,
      currency: "IDR",
      quantity: 1,
      item_category: "Handmade Crochet",
      item_variant: config.color || undefined,
    });

    analytics.trackEvent({
      event: "add_to_cart",
      value: price,
      currency: "IDR",
      items: [{ item_id: productId, item_name: productName, price }],
    });

    // Open cart drawer
    openCart();
  };

  return (
    <button onClick={handleAddToCart} className={className} type="button">
      {children || (
        <>
          <Heart className="w-5 h-5 fill-white" /> Add to Cart
        </>
      )}
    </button>
  );
}
