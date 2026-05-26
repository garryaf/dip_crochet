"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, MessageCircle, Package, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/features/cart/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { createOrderWhatsAppLink, calculateOrderTotals } from "@/services/order";
import { analytics } from "@/services/analytics";
import { trackBeginCheckout } from "@/services/analytics/ecommerce";
import { getUTMParams } from "@/services/analytics/utm";
import BrandLogo from "@/components/ui/BrandLogo";

export default function CheckoutClient() {
  const { items, clearCart, getSubtotal } = useCartStore();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    isGift: false,
    giftMessage: "",
    notes: "",
  });

  const subtotal = getSubtotal();
  const { total, shippingCost } = calculateOrderTotals(
    items.map((item) => ({
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
    }))
  );

  const handleCheckout = () => {
    if (!form.name || !form.phone) return;

    const utm = getUTMParams();

    const orderLink = createOrderWhatsAppLink({
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email || undefined,
      items: items.map((item) => ({
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
        color: item.config.color,
        eyeStyle: item.config.eyeStyle,
        accessory: item.config.accessory,
        customName: item.config.customName,
      })),
      shippingAddress: form.address || undefined,
      isGift: form.isGift,
      giftMessage: form.giftMessage || undefined,
      customNotes: form.notes || undefined,
      utmSource: utm?.utm_source,
      utmMedium: utm?.utm_medium,
      utmCampaign: utm?.utm_campaign,
    });

    // Track checkout
    trackBeginCheckout(
      items.map((item) => ({
        item_id: item.productId,
        item_name: item.productName,
        price: item.price,
        currency: "IDR",
        quantity: item.quantity,
        item_variant: item.config.color || undefined,
      })),
      total
    );

    analytics.trackWhatsAppClick("Checkout", total);

    // Open WhatsApp
    window.open(orderLink, "_blank");

    // Clear cart after successful checkout initiation
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fffbf9] flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-black text-[#4a3a35] mb-3">Cart is empty</h1>
          <p className="text-muted-foreground font-medium mb-8">
            Add some companions to your cart before checking out.
          </p>
          <Link
            href="/products"
            className="px-8 py-4 bg-primary text-white font-black rounded-2xl inline-flex items-center gap-2"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50 border-b border-border/50">
        <Link
          href="/products"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
        <BrandLogo />
        <div className="w-24" />
      </nav>

      <main className="flex-grow max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-5 gap-12">
        {/* Form */}
        <section className="md:col-span-3 space-y-8">
          <div>
            <h1 className="text-3xl font-black text-[#4a3a35] mb-2">Checkout</h1>
            <p className="text-muted-foreground font-medium">
              Isi data kamu, lalu kami akan proses pesanan via WhatsApp.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-black text-[#4a3a35] uppercase text-xs tracking-widest">
              Informasi Kontak
            </h3>
            <input
              type="text"
              placeholder="Nama Lengkap *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-4 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium"
              required
            />
            <input
              type="tel"
              placeholder="Nomor WhatsApp * (08xxx)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-4 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium"
              required
            />
            <input
              type="email"
              placeholder="Email (opsional)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-4 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium"
            />
          </div>

          {/* Shipping */}
          <div className="space-y-4">
            <h3 className="font-black text-[#4a3a35] uppercase text-xs tracking-widest">
              Pengiriman
            </h3>
            <textarea
              placeholder="Alamat lengkap (opsional — bisa dibahas di WhatsApp)"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-4 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium min-h-[100px]"
            />
          </div>

          {/* Gift Option */}
          <div className="p-6 rounded-2xl bg-accent/30 border border-primary/10 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isGift}
                onChange={(e) => setForm({ ...form, isGift: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
              />
              <span className="font-bold text-sm text-[#4a3a35]">
                Ini untuk hadiah 🎁
              </span>
            </label>
            {form.isGift && (
              <textarea
                placeholder="Pesan untuk penerima..."
                value={form.giftMessage}
                onChange={(e) => setForm({ ...form, giftMessage: e.target.value })}
                className="w-full p-4 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm"
              />
            )}
          </div>

          {/* Notes */}
          <textarea
            placeholder="Catatan tambahan (opsional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full p-4 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium"
          />
        </section>

        {/* Order Summary */}
        <section className="md:col-span-2">
          <div className="sticky top-28 bg-white p-8 rounded-[2.5rem] border border-border shadow-xl space-y-6">
            <h3 className="font-black text-lg text-[#4a3a35]">Ringkasan Pesanan</h3>

            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-bold text-[#4a3a35]">{item.productName.split(" — ")[0]}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <hr className="border-dashed border-border" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-bold text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Ongkir</span>
                <span className="text-secondary font-bold text-xs uppercase">Dibahas di WA</span>
              </div>
            </div>

            <hr className="border-border" />

            <div className="flex justify-between items-center">
              <span className="font-black text-[#4a3a35]">Total</span>
              <span className="text-2xl font-black text-primary">{formatPrice(total)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={!form.name || !form.phone}
              className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 text-sm uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <MessageCircle className="w-5 h-5" />
              Pesan via WhatsApp
            </button>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
              <p>Pembayaran aman via transfer bank. Detail dikirim setelah konfirmasi.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
