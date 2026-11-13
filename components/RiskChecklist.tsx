"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CHECKLIST } from "@/lib/content";

function level(score: number, max: number) {
  const r = score / max;
  if (r < 0.25) return { name: "Rendah", color: "text-success", tip: "Pertahankan kebiasaan baik dan tetap pantau informasi cuaca dan peringatan dari BMKG." };
  if (r < 0.55) return { name: "Sedang", color: "text-warning", tip: "Ada beberapa faktor yang perlu diperhatikan. Pelajari cara pencegahan dan ketahui nomor darurat setempat." };
  return { name: "Tinggi", color: "text-alert", tip: "Beberapa faktor risiko ada di sekitarmu. Bicarakan dengan pemerintah desa atau BPBD, dan pelajari langkah saat melihat api." };
}

export default function RiskChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const max = CHECKLIST.reduce((a, c) => a + c.weight, 0);
  const score = CHECKLIST.reduce((a, c) => a + (checked[c.id] ? c.weight : 0), 0);
  const count = Object.values(checked).filter(Boolean).length;
  const l = level(score, max);

  return (
    <div>
      <fieldset>
        <legend className="text-sm text-on-ink/80 mb-4">Centang pernyataan yang sesuai dengan kondisi di sekitarmu.</legend>
        <ul className="space-y-3">
          {CHECKLIST.map((c) => (
            <li key={c.id}>
              <label className="flex items-start gap-4 p-4 border border-on-ink/15 hover:border-on-ink/50 rounded-sm cursor-pointer has-[:checked]:border-secondary has-[:checked]:bg-primary/20">
                <input
                  type="checkbox"
                  checked={!!checked[c.id]}
                  onChange={(e) => setChecked((s) => ({ ...s, [c.id]: e.target.checked }))}
                  className="mt-1 w-4 h-4 accent-[#85A98F]"
                />
                <span className="text-sm sm:text-base leading-relaxed">{c.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="mt-8 p-6 border border-on-ink/20 rounded-sm" role="status" aria-live="polite">
        <div className="text-xs uppercase tracking-label text-on-ink/70 mb-2">Hasil ({count} dari {CHECKLIST.length} dicentang)</div>
        {count === 0 ? (
          <p className="text-sm text-on-ink/80">Centang minimal satu pernyataan untuk melihat hasil.</p>
        ) : (
          <>
            <div className={`text-3xl font-extrabold uppercase ${l.color}`}>Risiko {l.name}</div>
            <p className="text-sm text-on-ink/90 mt-2 leading-relaxed">{l.tip}</p>
            <p className="text-xs text-on-ink/60 mt-3">Ini alat refleksi sederhana, bukan penilaian resmi. Untuk informasi resmi, lihat BMKG dan SiPongi.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/konten/cegah" className="px-4 py-2 text-xs uppercase tracking-label font-bold border border-on-ink/30 hover:bg-on-ink hover:text-ink rounded-sm">Cara mencegah</Link>
              <Link href="/konten/darurat" className="px-4 py-2 text-xs uppercase tracking-label font-bold border border-on-ink/30 hover:bg-on-ink hover:text-ink rounded-sm">Jika melihat api</Link>
            </div>
          </>
        )}
      </div>
      <button onClick={() => setChecked({})} className="mt-4 text-xs uppercase tracking-label underline underline-offset-4 text-on-ink/70 hover:text-on-ink">
        Reset
      </button>
    </div>
  );
}
