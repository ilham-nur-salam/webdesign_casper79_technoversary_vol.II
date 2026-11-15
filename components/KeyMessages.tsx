"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const SLIDES = [
  {
    id: "m1",
    title: "Gambut yang basah sulit terbakar.",
    body: "Menjaga muka air tanah tetap tinggi adalah pencegahan paling mendasar. Gambut dinyatakan rusak bila muka airnya lebih dari 40 cm di bawah permukaan.",
    image: "/assets/canal-block.webp",
    alt: "Ilustrasi AI: sekat kanal menahan air di lahan gambut",
    href: "/konten/cegah",
    cta: "Baca cara mencegah",
  },
  {
    id: "m2",
    title: "Api di gambut bisa tak terlihat.",
    body: "Api dapat menjalar di bawah permukaan dan sulit dipadamkan. Jangan mendekat sendiri. Jauhi lokasi dan hubungi 112 atau BPBD setempat.",
    image: "/assets/fireFighter.webp",
    alt: "Ilustrasi AI: petugas di area kebakaran lahan",
    href: "/konten/darurat",
    cta: "Apa yang harus dilakukan",
  },
  {
    id: "m3",
    title: "Asap berdampak pada semua orang.",
    body: "Pantau kualitas udara dari sumber resmi, kurangi aktivitas luar ruangan, dan gunakan masker yang sesuai, misalnya jenis N95.",
    image: "/assets/villager-mask.webp",
    alt: "Ilustrasi AI: warga memakai masker karena asap",
    href: "/konten/darurat",
    cta: "Lindungi diri dari asap",
  },
  {
    id: "m4",
    title: "Pemulihan butuh waktu dan kerja bersama.",
    body: "Pembasahan kembali, penanaman jenis asli, dan mata pencaharian yang tidak bergantung pada pembakaran berjalan beriringan.",
    image: "/assets/regenerating.webp",
    alt: "Ilustrasi AI: vegetasi tumbuh kembali setelah kebakaran",
    href: "/konten/pulihkan",
    cta: "Ikut memulihkan",
  },
];

const INTERVAL = 7000;

export default function KeyMessages() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchX = useRef<number | null>(null);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
    setProgress(0);
  }, []);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setIndex((i) => (i + 1) % SLIDES.length);
          return 0;
        }
        return p + (50 / INTERVAL) * 100;
      });
    }, 50);
    return () => clearInterval(id);
  }, [paused]);

  const s = SLIDES[index];

  return (
    <section
      id="pesan-kunci"
      aria-roledescription="carousel"
      aria-label="Pesan kunci"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const d = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(d) > 50) (d > 0 ? next : prev)();
        touchX.current = null;
      }}
      className="relative w-full min-h-[90vh] bg-ink text-on-ink flex flex-col justify-between overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image src={s.image} alt={s.alt} fill sizes="100vw" className="object-cover brightness-[0.4]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/70" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 px-6 sm:px-12 md:px-16 max-w-6xl mx-auto w-full my-auto py-12" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[1.05]">{s.title}</h2>
            <p className="text-base sm:text-lg text-on-ink/90 max-w-2xl leading-relaxed">{s.body}</p>
            <Link
              href={s.href}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-label font-bold border border-on-ink hover:bg-on-ink hover:text-ink transition-colors rounded-sm"
            >
              {s.cta}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 p-6 sm:p-12 md:p-16 max-w-7xl mx-auto w-full space-y-6">
        <div className="w-full h-[2px] bg-on-ink/20 overflow-hidden">
          <div className="h-full bg-on-ink" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between text-xs tracking-label uppercase">
          <div className="flex items-center gap-4">
            <span className="font-geist text-sm font-bold font-tabular">
              0{index + 1} {"//"} 0{SLIDES.length}
            </span>
            <button
              onClick={() => setPaused((p) => !p)}
              className="p-1 text-on-ink/70 hover:text-on-ink"
              aria-label={paused ? "Putar otomatis" : "Jeda otomatis"}
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} aria-label="Pesan sebelumnya" className="w-10 h-10 rounded-sm border border-on-ink/30 hover:border-on-ink hover:bg-on-ink hover:text-ink flex items-center justify-center transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} aria-label="Pesan berikutnya" className="w-10 h-10 rounded-sm border border-on-ink/30 hover:border-on-ink hover:bg-on-ink hover:text-ink flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
