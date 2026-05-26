import type { Metadata } from "next";
import Navigation from "@/shared/components/layout/Navigation";
import Footer from "@/shared/components/layout/Footer";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | dip.crochet",
  description:
    "Baca syarat dan ketentuan layanan dip.crochet untuk pemesanan boneka rajut handmade custom.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col">
      <Navigation />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-28 w-full">
        <div className="mb-12">
          <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">Legal</p>
          <h1 className="text-5xl font-black tracking-tight text-[#4a3a35] mb-4">
            Syarat &amp; Ketentuan
          </h1>
          <p className="text-muted-foreground font-medium">
            Terakhir diperbarui: 1 Januari 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8 text-[#4a3a35]">
          <section>
            <h2 className="text-2xl font-black mb-3">1. Ketentuan Umum</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Dengan mengakses dan menggunakan situs web {BRAND.name}, Anda setuju untuk terikat
              dengan syarat dan ketentuan ini. Jika Anda tidak setuju dengan bagian manapun dari
              syarat ini, Anda tidak diperkenankan menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">2. Pemesanan &amp; Pembayaran</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground font-medium">
              <li>Semua pesanan dilakukan melalui WhatsApp Business dan dikonfirmasi secara manual oleh tim kami.</li>
              <li>Harga yang tercantum di situs adalah harga dasar dan dapat berubah untuk pesanan custom yang kompleks.</li>
              <li>Pembayaran dilakukan melalui transfer bank setelah konfirmasi pesanan. Detail rekening akan dikirimkan via WhatsApp.</li>
              <li>Pesanan mulai diproses setelah bukti pembayaran diterima dan diverifikasi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">3. Waktu Pengerjaan</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Setiap produk handmade memerlukan waktu pengerjaan 3–5 hari kerja. Untuk pesanan
              custom yang kompleks atau pesanan dalam jumlah besar, waktu pengerjaan dapat lebih
              lama dan akan dikomunikasikan saat konfirmasi pesanan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">4. Pengiriman</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground font-medium">
              <li>Pengiriman tersedia ke seluruh Indonesia melalui JNE dan J&amp;T Express.</li>
              <li>Biaya pengiriman ditanggung oleh pembeli dan dihitung berdasarkan berat dan lokasi tujuan.</li>
              <li>Opsi pengambilan di studio Bekasi tersedia secara gratis (Free Store Pickup).</li>
              <li>Nomor resi akan diberikan melalui WhatsApp setelah pengiriman dilakukan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">5. Pengembalian &amp; Pembatalan</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Karena sifat produk yang handmade dan custom, kami tidak menerima pengembalian atau
              pembatalan setelah pesanan dikonfirmasi dan pembayaran diterima. Namun, jika terdapat
              kerusakan pada produk saat diterima, silakan hubungi kami dalam waktu 24 jam untuk
              solusi terbaik.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">6. Hak Kekayaan Intelektual</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Seluruh desain karakter, foto produk, dan konten di situs ini adalah milik {BRAND.name}{" "}
              dan dilindungi oleh hak cipta. Penggunaan tanpa izin tertulis tidak diperkenankan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">7. Hubungi Kami</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Pertanyaan mengenai syarat dan ketentuan ini dapat disampaikan melalui{" "}
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                className="text-primary font-bold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>{" "}
              atau halaman{" "}
              <a href="/contact" className="text-primary font-bold hover:underline">
                Kontak
              </a>{" "}
              kami.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
