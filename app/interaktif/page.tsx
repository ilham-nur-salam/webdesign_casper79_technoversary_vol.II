import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import RiskChecklist from "@/components/RiskChecklist";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Uji Diri: Cek Risiko & Kuis",
  description: "Daftar periksa risiko karhutla di sekitarmu dan kuis singkat untuk menguji pemahaman.",
};

export default function InteraktifPage() {
  return (
    <div className="pb-28">
      <div className="px-6 sm:px-12 md:px-20 max-w-7xl mx-auto pt-24 sm:pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 text-[10px] sm:text-xs leading-none uppercase tracking-label font-bold border border-on-ink/30 hover:bg-on-ink hover:text-ink rounded-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="sm:hidden">Kembali</span>
          <span className="hidden sm:inline">Kembali ke beranda</span>
        </Link>
      </div>
      <PageHeader
        compact
        title="Uji diri"
        lead="Cek faktor risiko di sekitarmu, lalu uji pemahamanmu dengan kuis enam pertanyaan."
      />
      <div className="px-6 sm:px-12 md:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <section aria-labelledby="cek">
          <h2 id="cek" className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight hairline-b pb-4 mb-6">Cek risiko</h2>
          <RiskChecklist />
        </section>
        <section aria-labelledby="kuis">
          <h2 id="kuis" className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight hairline-b pb-4 mb-6">Kuis</h2>
          <Quiz />
        </section>
      </div>
    </div>
  );
}
