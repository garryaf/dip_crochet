import type { Metadata } from "next";
import Navigation from "@/shared/components/layout/Navigation";
import Footer from "@/shared/components/layout/Footer";
import { BRAND } from "@/lib/constants";
import { MapPin, MessageCircle, Clock, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Hubungi Kami | dip.crochet",
  description:
    "Hubungi dip.crochet via WhatsApp, kunjungi studio kami di Bekasi, atau temukan kami di Instagram dan TikTok.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Hubungi Kami | dip.crochet",
    description: "Ada pertanyaan tentang pesanan custom? Hubungi artisan kami langsung.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col">
      <Navigation />

      <main className="flex-grow max-w-5xl mx-auto px-6 py-28 w-full">
        <div className="mb-16 max-w-2xl">
          <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">
            Get in Touch
          </p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-[#4a3a35] mb-6">
            Ada yang bisa kami{" "}
            <span className="text-primary italic font-light">bantu?</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed">
            Kami selalu senang mendengar dari kamu. Baik itu pertanyaan tentang pesanan, request
            custom, atau sekadar ingin say hi — jangan ragu untuk menghubungi kami.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi dip.crochet! Aku mau tanya...")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-10 rounded-[3rem] border border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-[#4a3a35] mb-2">WhatsApp</h2>
            <p className="text-muted-foreground font-medium mb-4">
              Chat langsung dengan artisan kami. Respon cepat di jam kerja.
            </p>
            <p className="text-primary font-black text-sm uppercase tracking-widest group-hover:gap-3 flex items-center gap-2 transition-all">
              Chat Sekarang →
            </p>
          </a>

          {/* Instagram Card */}
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-10 rounded-[3rem] border border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8 text-pink-500" />
            </div>
            <h2 className="text-2xl font-black text-[#4a3a35] mb-2">Instagram</h2>
            <p className="text-muted-foreground font-medium mb-4">
              Lihat koleksi terbaru dan behind-the-scenes proses crafting.
            </p>
            <p className="text-primary font-black text-sm uppercase tracking-widest group-hover:gap-3 flex items-center gap-2 transition-all">
              @dip_crochet →
            </p>
          </a>

          {/* Studio Visit Card */}
          <a
            href={BRAND.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-10 rounded-[3rem] border border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-black text-[#4a3a35] mb-2">Studio Visit</h2>
            <p className="text-muted-foreground font-medium mb-4">
              Kunjungi studio kami di Bekasi untuk lihat koleksi secara langsung.
            </p>
            <p className="text-sm text-muted-foreground font-medium">{BRAND.address}</p>
          </a>
        </div>

        {/* Operating Hours */}
        <div className="bg-white p-10 rounded-[3rem] border border-border/50 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#4a3a35]">Jam Operasional</h3>
              <p className="text-muted-foreground font-medium text-sm">
                WhatsApp &amp; Studio Visit
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 bg-accent/30 rounded-2xl">
              <p className="font-black text-sm text-[#4a3a35] mb-1">Senin – Sabtu</p>
              <p className="text-muted-foreground font-medium">09:00 – 18:00 WIB</p>
            </div>
            <div className="p-6 bg-accent/30 rounded-2xl">
              <p className="font-black text-sm text-[#4a3a35] mb-1">Minggu &amp; Hari Libur</p>
              <p className="text-muted-foreground font-medium">Tutup (Chat tetap bisa dikirim)</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
