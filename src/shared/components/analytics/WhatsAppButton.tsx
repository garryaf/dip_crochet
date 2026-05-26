"use client";

import React from "react";
import { analytics } from "@/services/analytics";
import { trackBeginCheckout, trackGenerateLead } from "@/services/analytics/ecommerce";
import { appendUTMToMessage } from "@/services/analytics/utm";
import { getWhatsAppLink } from "@/lib/constants";

interface WhatsAppButtonProps {
  message: string;
  productName: string;
  productId?: string;
  value: number;
  source: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * WhatsApp CTA button with built-in analytics tracking.
 * Tracks: whatsapp_click, begin_checkout, generate_lead across all platforms.
 *
 * Usage:
 *   <WhatsAppButton
 *     message="Hi! I want to order Momo Bunny"
 *     productName="Momo Bunny"
 *     value={95000}
 *     source="product_detail"
 *   >
 *     Order via WhatsApp
 *   </WhatsAppButton>
 */
export default function WhatsAppButton({
  message,
  productName,
  productId,
  value,
  source,
  children,
  className,
}: WhatsAppButtonProps) {
  const handleClick = () => {
    // Track across all platforms
    analytics.trackWhatsAppClick(productName, value);

    // Enhanced e-commerce: begin_checkout
    trackBeginCheckout(
      [
        {
          item_id: productId || productName.toLowerCase().replace(/\s+/g, "-"),
          item_name: productName,
          price: value,
          currency: "IDR",
          quantity: 1,
          item_category: "Handmade Crochet",
          item_brand: "dip.crochet",
        },
      ],
      value
    );

    // Track as lead generation
    trackGenerateLead(value, source);

    // Append UTM data to message for offline attribution
    const enrichedMessage = appendUTMToMessage(message);

    // Open WhatsApp
    window.open(getWhatsAppLink(enrichedMessage), "_blank");
  };

  return (
    <button onClick={handleClick} className={className} type="button">
      {children}
    </button>
  );
}
