import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SourceList from "@/components/ui/SourceList";
import { SOURCES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Misi FORESTWATCH, batasan platform, dan catatan penggunaan AI.",
};

const TEAM = [
  {
    number: "01",
    initials: "INS",
    name: "Ilham Nur Salam",
    role: "Lead Developer",
    className: "XII RPL 2",
    handle: "@hammzy19",
    instagram: "https://www.instagram.com/hammzy19",
    accent: "bg-primary",
  },
  {
    number: "02",
    initials: "LDL",
    name: "Ledzi Dwi Liantona",
    role: "Member",
    className: "XI RPL 1",
    handle: "@ldzdwi",
    instagram: "https://www.instagram.com/ldzdwi",
    accent: "bg-secondary",
  },
  {
    number: "03",
    initials: "WF",
    name: "Wildan Ferdiansyah",
    role: "Member",
    className: "XI RPL 1",
    handle: "@wldnnaaa",
    instagram: "https://www.instagram.com/wldnnaaa",
    accent: "bg-alert",
  },
];

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

        <section className="relative overflow-hidden border-y border-on-ink/15 py-10 sm:py-14">
          <div className="absolute -right-16 -top-20 text-[10rem] sm:text-[15rem] font-extrabold leading-none text-on-ink/[0.025] select-none pointer-events-none">
            79
          </div>

          <div className="relative">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-label text-secondary">
                  <span className="h-2 w-2 bg-alert" />
                  <span>Tim pengembang</span>
                </div>
                <h2 className="text-4xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-6xl">
                  Casper <span className="text-secondary">79</span>
                </h2>
              </div>
              <div className="max-w-xs text-sm leading-relaxed text-on-ink/65 md:text-right">
                <p>Technoversary Vol. II</p>
                <p>Web Design · Forest Watch</p>
                <p>SMK Pertiwi Kuningan</p>
              </div>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {TEAM.map((member) => (
                <article
                  key={member.name}
                  className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden border border-on-ink/15 bg-on-ink/[0.025] p-5 transition-colors duration-300 hover:border-secondary/70 hover:bg-primary/20 sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-geist text-xs tracking-label text-on-ink/45">{member.number}</span>
                    <span className={`h-2.5 w-2.5 ${member.accent}`} aria-hidden="true" />
                  </div>

                  <div>
                    <div className="mb-6 flex h-16 w-16 items-center justify-center border border-on-ink/25 text-xl font-extrabold tracking-tight text-on-ink transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-secondary group-hover:text-secondary">
                      {member.initials}
                    </div>
                    <h3 className="text-xl font-extrabold uppercase leading-[0.95] tracking-tight text-on-ink">
                      {member.name}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-label text-on-ink/55">
                      <span className="text-secondary">{member.role}</span>
                      <span aria-hidden="true">/</span>
                      <span>{member.className}</span>
                    </div>
                  </div>

                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-label text-on-ink/65 transition-colors hover:text-secondary"
                    aria-label={`Instagram ${member.name}`}
                  >
                    <Instagram className="h-3.5 w-3.5" />
                    <span>{member.handle}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </article>
              ))}
            </div>
          </div>
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
