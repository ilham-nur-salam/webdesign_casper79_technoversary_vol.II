"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BentoItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  colSpan: string;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    id: "pahami",
    title: "PAHAMI",
    subtitle: "Penyebab karhutla, mengapa gambut kering mudah terbakar, dan apa arti titik panas.",
    image: "/assets/dried-peat.webp",
    href: "/konten/pahami",
    colSpan: "lg:col-span-7",
  },
  {
    id: "cegah",
    title: "CEGAH",
    subtitle: "Menjaga gambut tetap basah, kebiasaan yang aman, dan peran masyarakat.",
    image: "/assets/canal-block.webp",
    href: "/konten/cegah",
    colSpan: "lg:col-span-5",
  },
  {
    id: "darurat",
    title: "JIKA MELIHAT API",
    subtitle: "Langkah cepat saat menemukan api, cara melapor, dan perlindungan dari asap.",
    image: "/assets/fireFighter.webp",
    href: "/konten/darurat",
    colSpan: "lg:col-span-4",
  },
  {
    id: "pulihkan",
    title: "PULIHKAN",
    subtitle: "Pembasahan, penanaman kembali, dan cara kamu ikut berperan.",
    image: "/assets/planting.webp",
    href: "/konten/pulihkan",
    colSpan: "lg:col-span-4",
  },
  {
    id: "uji",
    title: "UJI DIRI",
    subtitle: "Cek risiko di sekitarmu lewat daftar periksa, lalu uji pemahamanmu dengan kuis singkat.",
    image: "/assets/aerial-river.webp",
    href: "/interaktif",
    colSpan: "lg:col-span-4",
  },
];

export default function BentoCards() {
  return (
    <section
      id="eksplorasi"
      className="relative w-full bg-ink text-on-ink py-28 sm:py-36 px-6 sm:px-12 md:px-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between hairline-b pb-8 mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-on-ink">
              JELAJAHI PENGETAHUAN<span className="text-secondary">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-on-ink/70 max-w-md font-normal leading-relaxed">
            Mulai dari memahami penyebab, mencegah, bertindak saat melihat api, sampai ikut memulihkan.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {BENTO_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              id={item.id}
              className={`group relative overflow-hidden border border-on-ink/15 hover:border-on-ink/40 transition-colors rounded-sm min-h-[360px] sm:min-h-[420px] flex flex-col justify-between p-6 sm:p-8 ${item.colSpan}`}
            >
              {/* Background Image with Zoom on Hover */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Dark Gradient Overlay for optimal legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />
              </div>

              {/* Link Arrow */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="w-8 h-8 rounded-sm border border-on-ink/20 flex items-center justify-center text-on-ink group-hover:bg-on-ink group-hover:text-ink transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-auto pt-16">
                <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-on-ink mb-3 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-on-ink/80 leading-relaxed max-w-xl">
                  {item.subtitle}
                </p>
                <div className="mt-4 pt-3 hairline-t border-on-ink/15 flex items-center gap-2 text-[10px] text-on-ink/50 uppercase tracking-widest">
                  <span>BUKA HALAMAN</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

