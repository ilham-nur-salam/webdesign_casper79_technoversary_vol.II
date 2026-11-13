"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QUIZ } from "@/lib/content";

export default function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZ[i];

  const pick = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
    if (n === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 >= QUIZ.length) setDone(true);
    else {
      setI(i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="p-6 border border-on-ink/20 rounded-sm" role="status">
        <div className="text-xs uppercase tracking-label text-on-ink/70 mb-2">Selesai</div>
        <div className="text-4xl font-extrabold font-geist">{score} / {QUIZ.length}</div>
        <p className="text-sm text-on-ink/85 mt-3">
          {score === QUIZ.length ? "Sempurna. Bagikan yang kamu tahu ke orang di sekitarmu." : "Baca kembali artikelnya untuk memperdalam, lalu coba lagi."}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={restart} className="px-4 py-2 text-xs uppercase tracking-label font-bold bg-on-ink text-ink hover:bg-secondary rounded-sm">Ulangi</button>
          <Link href="/konten" className="px-4 py-2 text-xs uppercase tracking-label font-bold border border-on-ink/30 hover:bg-on-ink hover:text-ink rounded-sm">Baca artikel</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-xs uppercase tracking-label text-on-ink/70 mb-4">
        <span>Pertanyaan {i + 1} dari {QUIZ.length}</span>
        <span>Skor: {score}</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold leading-snug mb-5">{q.q}</h3>
      <ul className="space-y-3">
        {q.options.map((o, n) => {
          const isAnswer = picked !== null && n === q.answer;
          const isWrong = picked === n && n !== q.answer;
          return (
            <li key={o}>
              <button
                onClick={() => pick(n)}
                disabled={picked !== null}
                aria-pressed={picked === n}
                className={`w-full text-left p-4 border rounded-sm text-sm sm:text-base transition-colors ${
                  isAnswer ? "border-success bg-success/10" : isWrong ? "border-alert bg-alert/10" : "border-on-ink/20 hover:border-on-ink/60"
                } disabled:cursor-default`}
              >
                <span className="font-mono text-secondary mr-3">{String.fromCharCode(65 + n)}</span>
                {o}
                {isAnswer && <span className="sr-only"> (jawaban benar)</span>}
                {isWrong && <span className="sr-only"> (jawaban salah)</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <div aria-live="polite" className="mt-5 min-h-[4rem]">
        {picked !== null && (
          <>
            <p className="text-sm text-on-ink/90 leading-relaxed">
              <strong>{picked === q.answer ? "Benar. " : "Belum tepat. "}</strong>
              {q.explain}
            </p>
            <button onClick={next} className="mt-4 px-5 py-2.5 text-xs uppercase tracking-label font-bold bg-on-ink text-ink hover:bg-secondary rounded-sm">
              {i + 1 >= QUIZ.length ? "Lihat hasil" : "Berikutnya"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
