"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ACTION_ROWS = [
  {
    num: "01",
    title: "Pahami penyebabnya",
    desc: "Mengapa gambut kering mudah terbakar dan siapa saja yang terdampak.",
    href: "/konten/pahami",
  },
  {
    num: "02",
    title: "Cegah di sekitarmu",
    desc: "Kebiasaan aman, menjaga air gambut, dan peran masyarakat peduli api.",
    href: "/konten/cegah",
  },
  {
    num: "03",
    title: "Dukung pemulihan",
    desc: "Pembasahan, penanaman jenis asli, dan cara berpartisipasi yang nyata.",
    href: "/konten/pulihkan",
  },
];

export default function CTASection() {
  return (
    <section
      id="aksi"
      className="relative w-full bg-ink text-on-ink py-32 sm:py-44 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      {/* Animated Background Drift Layers (Transform & Opacity only) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Layer 1: Warm Ember / Smoke Glow */}
        <motion.div
          animate={{
            x: ["-5%", "6%", "-4%"],
            y: ["0%", "-8%", "3%"],
            opacity: [0.15, 0.28, 0.15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-warning/20 via-alert/15 to-transparent blur-3xl"
        />

        {/* Layer 2: Deep Primary Peat Atmosphere */}
        <motion.div
          animate={{
            x: ["4%", "-6%", "5%"],
            y: ["5%", "-5%", "4%"],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/4 -right-1/4 w-[75vw] h-[75vw] rounded-full bg-gradient-to-tl from-primary/30 via-secondary/15 to-transparent blur-3xl"
        />

        {/* Layer 3: Central Ambient Drift */}
        <motion.div
          animate={{
            scale: [0.95, 1.08, 0.95],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/3 w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-alert/10 via-warning/10 to-transparent blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold uppercase tracking-tight text-on-ink leading-[0.95] max-w-4xl">
            IKUT JAGA HUTAN<span className="text-alert">.</span>
          </h2>
        </div>

        {/* Editorial Action Rows */}
        <div className="flex flex-col mb-20">
          {ACTION_ROWS.map((row) => (
            <Link
              key={row.num}
              href={row.href}
              className="group hairline-t py-8 sm:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300 hover:bg-on-ink/[0.02]"
            >
              <div className="flex items-start md:items-center gap-6 sm:gap-10">
                <span className="font-geist text-sm sm:text-base text-secondary font-mono tracking-widest pt-1 md:pt-0">
                  {row.num}
                </span>

                <div>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-on-ink group-hover:text-secondary transition-colors duration-300">
                    {row.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-ink/70 max-w-2xl font-normal leading-relaxed mt-2">
                    {row.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end pl-12 md:pl-0">
                <div className="w-12 h-12 rounded-sm border border-on-ink/20 flex items-center justify-center text-on-ink group-hover:border-on-ink group-hover:bg-on-ink group-hover:text-ink transition-all duration-300">
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </Link>
          ))}
          {/* Bottom hairline closing rows */}
          <div className="hairline-t" />
        </div>
      </div>
    </section>
  );
}

