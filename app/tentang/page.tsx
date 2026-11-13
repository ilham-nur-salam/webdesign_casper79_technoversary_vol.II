import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import SourceList from "@/components/ui/SourceList";
import { SOURCES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Misi FORESTWATCH, batasan platform, dan catatan penggunaan AI.",
};

export default function TentangPage() {
  return (
    <div className="pb-28">
      <PageHeader kicker="Tentang" title="Mengapa FORESTWATCH ada" lead="Karhutla berulang hampir setiap kemarau. Banyak orang terdampak asapnya, tetapi tidak semua tahu penyebabnya atau apa yang bisa dilakukan." />
      <div className="px-6 sm:px-12 md:px-20 max-w-4xl mx-auto space-y-12 text-base text-on-ink/90 leading-relaxed">
        <section>
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight mb-4">Misi</h2>
          <p>FORESTWATCH adalah web edukasi yang mengajak orang memahami penyebab karhutla, mencegahnya, tahu langkah saat melihat api, dan ikut menjaga serta memulihkan lingkungan.</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-secondary">
            <li>Pahami: penyebab dan cara kerja karhutla.</li>
            <li>Cegah: kebiasaan dan upaya menjaga gambut tetap basah.</li>
            <li>Bertindak: apa yang dilakukan saat menemukan api atau asap.</li>
            <li>Pulihkan: cara berpartisipasi dalam restorasi.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight mb-4">Batasan</h2>
          <p>FORESTWATCH bukan layanan darurat dan tidak menerima laporan kebakaran. Bila melihat api, hubungi 112 atau BPBD dan pemadam kebakaran setempat. Titik panas satelit adalah indikasi, bukan konfirmasi kebakaran.</p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight mb-4">Tentang visual dan AI</h2>
          <p>Urutan visual di beranda dan gambar di galeri adalah ilustrasi yang dibuat dengan bantuan AI dan diberi label sebagai ilustrasi. Gambar tersebut bukan dokumentasi kejadian nyata. Rincian alat yang dipakai tercantum di README proyek.</p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight mb-4">Tim</h2>
          <p>Dibuat oleh [NAMA TIM] untuk Technoversary Vol. II, tema EcoDigital. Anggota: [ISI NAMA ANGGOTA].</p>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link href="/konten" className="px-5 py-3 text-xs uppercase tracking-label font-bold bg-on-ink text-ink hover:bg-secondary rounded-sm">Baca konten</Link>
          <Link href="/kontak" className="px-5 py-3 text-xs uppercase tracking-label font-bold border border-on-ink/30 hover:bg-on-ink hover:text-ink rounded-sm">Hubungi kami</Link>
        </div>

        <SourceList sources={[SOURCES.worldBank, SOURCES.warren, SOURCES.pp57, SOURCES.pantau, SOURCES.sipongi, SOURCES.firms, SOURCES.bmkg, SOURCES.brgm]} />
      </div>
    </div>
  );
}
