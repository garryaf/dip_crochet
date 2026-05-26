import type { Metadata } from "next";
import Navigation from "@/shared/components/layout/Navigation";
import Footer from "@/shared/components/layout/Footer";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | dip.crochet",
  description:
    "Baca kebijakan privasi dip.crochet. Kami berkomitmen melindungi data dan privasi pelanggan yang mempercayai kami.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col">
      <Navigation />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-28 w-full">
        <div className="mb-12">
          <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">Legal</p>
          <h1 className="text-5xl font-black tracking-tight text-[#4a3a35] mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-muted-foreground font-medium">
            Terakhir diperbarui: 1 Januari 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8 text-[#4a3a35]">
          <section>
            <h2 className="text-2xl font-black mb-3">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Ketika Anda berinteraksi dengan {BRAND.name}, kami mungkin mengumpulkan informasi
              yang Anda berikan secara langsung, seperti nama, nomor WhatsApp, dan detail pesanan
              custom Anda. Informasi ini digunakan semata-mata untuk memproses dan memenuhi pesanan
              Anda.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">2. Cara Kami Menggunakan Informasi</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground font-medium">
              <li>Memproses dan mengirimkan pesanan Anda.</li>
              <li>Berkomunikasi dengan Anda terkait status pesanan.</li>
              <li>Meningkatkan produk dan layanan kami.</li>
              <li>Memenuhi kewajiban hukum yang berlaku.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">3. Keamanan Data</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Kami mengambil langkah-langkah yang wajar untuk melindungi informasi pribadi Anda dari
              akses, pengungkapan, perubahan, atau penghancuran yang tidak sah. Komunikasi pesanan
              dilakukan melalui platform WhatsApp Business yang terenkripsi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">4. Berbagi Informasi</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada
              pihak luar. Informasi hanya dibagikan kepada mitra pengiriman (JNE/J&T) yang
              diperlukan untuk memenuhi pesanan Anda.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">5. Hak Anda</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Anda berhak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda yang kami
              simpan. Untuk mengajukan permintaan, silakan hubungi kami melalui WhatsApp di{" "}
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                className="text-primary font-bold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {BRAND.whatsapp}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">6. Perubahan Kebijakan</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Setiap perubahan
              akan diposting di halaman ini dengan tanggal pembaruan yang baru.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3">7. Hubungi Kami</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami
              melalui WhatsApp atau kunjungi halaman{" "}
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
