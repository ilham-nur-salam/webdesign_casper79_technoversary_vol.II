import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import SourceList from "@/components/ui/SourceList";
import { ARTICLES } from "@/lib/content";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = ARTICLES.find((x) => x.slug === params.slug);
  return a ? { title: a.title, description: a.lead } : {};
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const i = ARTICLES.findIndex((x) => x.slug === params.slug);
  if (i < 0) notFound();
  const a = ARTICLES[i];
  const next = ARTICLES[(i + 1) % ARTICLES.length];
  const hideArticleMeta = ["pahami", "cegah", "darurat", "pulihkan"].includes(a.slug);

  return (
    <article className="pb-28">
      <div className="px-6 sm:px-12 md:px-20 max-w-7xl mx-auto pt-24 sm:pt-32">
        <Link
          href="/konten"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-label font-bold border border-on-ink/30 hover:bg-on-ink hover:text-ink rounded-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Kembali ke artikel & galeri
        </Link>
      </div>
      <PageHeader kicker={hideArticleMeta ? undefined : `${a.num} // ${a.kicker}`} title={a.title} lead={a.lead} />
      <div className="px-6 sm:px-12 md:px-20 max-w-4xl mx-auto">
        <figure className="relative w-full aspect-[16/9] border border-on-ink/15 overflow-hidden rounded-sm mb-12">
          <Image src={a.image} alt={a.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 896px" className="object-cover" />
          {!hideArticleMeta && (
            <figcaption className="absolute bottom-0 left-0 bg-ink/80 text-[10px] uppercase tracking-widest font-mono px-3 py-1.5 text-on-ink/80">
              Ilustrasi AI
            </figcaption>
          )}
        </figure>

        {a.sections.map((s) => (
          <section key={s.heading} className="mb-10">
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight mb-4">{s.heading}</h2>
            {s.body.map((p, k) => (
              <p key={k} className="text-base text-on-ink/90 leading-relaxed mb-4">{p}</p>
            ))}
            {s.bullets && (
              <ul className="list-disc pl-5 space-y-2 text-base text-on-ink/90 leading-relaxed marker:text-secondary">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <SourceList sources={a.sources} />

        <nav aria-label="Artikel lain" className="mt-14 flex flex-wrap gap-4">
          <Link href="/konten" className="px-5 py-3 text-xs uppercase tracking-label font-bold border border-on-ink/30 hover:bg-on-ink hover:text-ink rounded-sm">
            Semua konten
          </Link>
          <Link href={`/konten/${next.slug}`} className="px-5 py-3 text-xs uppercase tracking-label font-bold bg-on-ink text-ink hover:bg-secondary rounded-sm">
            Berikutnya: {next.title}
          </Link>
        </nav>
      </div>
    </article>
  );
}
