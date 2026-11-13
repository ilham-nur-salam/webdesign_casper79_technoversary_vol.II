import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Kirim pertanyaan atau masukan tentang FORESTWATCH.",
};

export default function KontakPage() {
  return (
    <div className="pb-28">
      <PageHeader kicker="Kontak" title="Kirim pesan" lead="Punya pertanyaan, koreksi data, atau masukan untuk konten ini? Tulis di bawah." />
      <div className="px-6 sm:px-12 md:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
        <aside className="lg:col-span-5 space-y-6">
          <div className="p-6 border border-alert/40 bg-alert/5 rounded-sm">
            <h2 className="text-xs uppercase tracking-label font-bold text-red-400 mb-2">Melihat kebakaran?</h2>
            <p className="text-sm leading-relaxed text-on-ink/90">
              Jangan gunakan formulir ini. FORESTWATCH bukan layanan darurat. Jauhi lokasi dan hubungi <strong>112</strong> atau BPBD dan pemadam kebakaran setempat.
            </p>
          </div>
          <p className="text-sm text-on-ink/75 leading-relaxed">
            Untuk memantau titik panas dan kondisi udara, gunakan kanal resmi: SiPongi (KLHK), NASA FIRMS, dan BMKG.
          </p>
        </aside>
      </div>
    </div>
  );
}
