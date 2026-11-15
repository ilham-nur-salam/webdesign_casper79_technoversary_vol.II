"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useLenisScroll } from "./LenisProvider";
import { SOURCES } from "@/lib/content";

const LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Pahami Karhutla", href: "/konten/pahami" },
  { label: "Cegah", href: "/konten/cegah" },
  { label: "Jika Melihat Api", href: "/konten/darurat" },
  { label: "Pulihkan", href: "/konten/pulihkan" },
  { label: "Konten & Galeri", href: "/konten" },
  { label: "Uji Diri", href: "/interaktif" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export default function Footer() {
  const { scrollTo } = useLenisScroll();
  return (
    <footer className="relative w-full bg-ink text-on-ink border-t border-on-ink/15 z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 hairline-b">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight">FORESTWATCH</span>
              <span className="w-2.5 h-2.5 rounded-full bg-alert inline-block" />
            </div>
            <p className="text-sm text-on-ink/80 leading-relaxed max-w-lg">
              Web edukasi tentang kebakaran hutan dan lahan (karhutla) di Indonesia: penyebab, pencegahan, tindakan
              saat melihat api, dan cara ikut memulihkan lingkungan.
            </p>
          </div>

          <nav aria-label="Navigasi footer" className="lg:col-span-3 space-y-4">
            <h2 className="text-xs uppercase tracking-label font-bold text-on-ink/60">Halaman</h2>
            <ul className="space-y-2.5 text-xs uppercase tracking-label font-semibold">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-on-ink/85 hover:text-secondary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xs uppercase tracking-label font-bold text-on-ink/60">Sumber resmi</h2>
            <ul className="space-y-2 text-xs">
              {[SOURCES.sipongi, SOURCES.firms, SOURCES.bmkg, SOURCES.brgm].map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-on-ink/80 hover:text-secondary underline underline-offset-4">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-on-ink/60 tracking-label uppercase">
          <div>&copy; 2026 FORESTWATCH. Dibuat Oleh --Casper 79</div>
          <button
            onClick={() => scrollTo(0)}
            className="flex items-center gap-2 text-on-ink hover:text-secondary transition-colors"
            aria-label="Kembali ke atas"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
