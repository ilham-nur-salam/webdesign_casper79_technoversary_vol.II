import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Gallery from "@/components/Gallery";
import { ARTICLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Konten: Artikel & Galeri",
  description: "Artikel edukasi tentang penyebab, pencegahan, tindakan saat melihat api, dan pemulihan lahan pasca karhutla.",
};

export default function KontenPage() {
  return (
    <div className="pb-28">
      <div className="px-6 sm:px-12 md:px-20 max-w-7xl mx-auto pt-24 sm:pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-label font-bold border border-on-ink/30 hover:bg-on-ink hover:text-ink rounded-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Kembali ke beranda
        </Link>
      </div>
      <PageHeader
        title="Artikel & galeri"
        lead="Empat artikel singkat yang disusun dari sumber resmi dan publikasi ilmiah, plus galeri ilustrasi."
      />
      <section aria-label="Artikel" className="px-6 sm:px-12 md:px-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={`/konten/${a.slug}`}
            className="group relative overflow-hidden border border-on-ink/15 hover:border-on-ink/50 transition-colors rounded-sm min-h-[360px] flex flex-col justify-end p-6 sm:p-8"
          >
            <Image src={a.image} alt={a.imageAlt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-2 group-hover:text-secondary transition-colors">{a.title}</h2>
              <p className="text-sm text-on-ink/85 leading-relaxed max-w-lg">{a.lead}</p>
            </div>
          </Link>
        ))}
      </section>

      <section aria-labelledby="galeri" className="px-6 sm:px-12 md:px-20 max-w-7xl mx-auto mt-24">
        <div className="hairline-b pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <h2 id="galeri" className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">Galeri</h2>
        </div>
        <Gallery />
      </section>
    </div>
  );
}
