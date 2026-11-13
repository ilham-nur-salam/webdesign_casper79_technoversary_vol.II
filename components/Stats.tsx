"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS } from "@/lib/content";

type Stat = (typeof STATS)[number];

function CountUpItem({ item }: { item: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(item.value);
      return;
    }
    let start: number | null = null;
    let raf = 0;
    const duration = 2000;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setValue((1 - Math.pow(1 - p, 4)) * item.value);
      if (p < 1) raf = requestAnimationFrame(step);
      else setValue(item.value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, item.value]);

  return (
    <div ref={ref} className="flex flex-col justify-between p-6 sm:p-8 border border-on-ink/15 rounded-sm bg-ink">
      <div>
        <div className="text-[10px] font-mono tracking-widest text-on-ink/60 uppercase mb-4">Data {item.year}</div>
        <div className="font-geist text-4xl sm:text-5xl font-bold tracking-tight text-on-ink font-tabular mb-3">
          {value.toLocaleString("id-ID", { minimumFractionDigits: item.decimals, maximumFractionDigits: item.decimals })}
          <span className="text-xl sm:text-2xl font-light text-secondary ml-1">{item.unit}</span>
        </div>
        <h3 className="text-xs uppercase tracking-label font-bold text-on-ink mb-2">{item.label}</h3>
        <p className="text-xs text-on-ink/75 leading-relaxed mb-6">{item.desc}</p>
      </div>
      <a
        href={item.source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hairline-t pt-3 text-[10px] text-on-ink/60 hover:text-secondary uppercase tracking-widest font-mono underline-offset-4 hover:underline"
      >
        Sumber: {item.source.label.split(" — ")[0]}
      </a>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="data" className="relative w-full bg-ink-soft text-on-ink py-28 sm:py-36 px-6 sm:px-12 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between hairline-b pb-8 mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight">
              FAKTA, BUKAN KIRA-KIRA<span className="text-alert">.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs text-on-ink/75 leading-relaxed">
            Setiap angka memuat tahun dan tautan sumber. Angka luas dan karbon gambut berbeda antar peta dan metode,
            jadi perlakukan sebagai perkiraan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((item) => (
            <CountUpItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
