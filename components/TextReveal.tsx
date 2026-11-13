"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface TextRevealProps {
  text?: string;
}

const DEFAULT_TEXT =
  "Karhutla bukan hanya soal api. Ini soal air, tanah, kebiasaan, dan keputusan bersama. FORESTWATCH membantu kamu memahaminya, mencegahnya, dan ikut memulihkan.";

function Character({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block transition-colors">
      {char}
    </motion.span>
  );
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const characters = word.split("");
  const amount = range[1] - range[0];
  const step = amount / characters.length;

  return (
    <span className="inline-block whitespace-nowrap mr-[0.25em]">
      {characters.map((char, i) => {
        const charStart = range[0] + i * step;
        const charEnd = charStart + step;
        return (
          <Character
            key={i}
            char={char}
            progress={progress}
            range={[charStart, charEnd]}
          />
        );
      })}
    </span>
  );
}

export default function TextReveal({ text = DEFAULT_TEXT }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end end"],
  });

  const words = text.split(" ");

  return (
    <section
      ref={containerRef}
      id="perspektif"
      className="relative w-full bg-background text-primary py-24 sm:py-36 md:py-48 px-6 sm:px-12 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between hairline-b-light pb-6 mb-16 md:mb-24 gap-4">
          <div className="text-[11px] font-mono tracking-widest text-primary uppercase">
            EKOSISTEM GAMBUT TROPIS
          </div>
        </div>

        {/* Big Reveal Paragraph */}
        <div className="mb-20">
          <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.08] text-primary flex flex-wrap">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word
                  key={i}
                  word={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </p>
        </div>

        {/* Documentary Sub-grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 hairline-t-light pt-12">
          <div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-primary mb-3">
              Keseimbangan Air Gambut
            </h3>
            <p className="text-sm text-primary/90 leading-relaxed font-normal">
              Gambut alami adalah spons basah raksasa. Pengeringan lewat kanal menghilangkan daya tahan alaminya sehingga mudah terbakar ketika kemarau tiba.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-primary mb-3">
              Api Di Bawah Tanah
            </h3>
            <p className="text-sm text-primary/90 leading-relaxed font-normal">
              Kebakaran gambut bisa menjalar di bawah permukaan tanpa nyala besar, sehingga sulit dilihat dan dipadamkan, dan menghasilkan asap yang bertahan lama.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-primary mb-3">
              Restorasi 3R
            </h3>
            <p className="text-sm text-primary/90 leading-relaxed font-normal">
              Pemulihan memerlukan pendekatan holistik: pembasahan kembali (Rewetting), penanaman kembali flora endemik (Revegetation), dan penguatan ekonomi warga (Revitalization).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

