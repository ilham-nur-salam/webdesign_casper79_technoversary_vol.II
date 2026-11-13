"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TOTAL_FRAMES, loadFrame } from "@/lib/frameCache";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [statusText, setStatusText] = useState("MEMUAT ARSIP HUTAN");

  useEffect(() => {
    let isCancelled = false;

    async function loadAllCoarseToFine() {
      // Step 1: Load the first frame + key story transition frames immediately
      setStatusText("MEMUAT FRAME AWAL & TITIK KUNCI");
      const keyStoryFrames = [1, 28, 57, 114, 170, TOTAL_FRAMES];
      await Promise.all(keyStoryFrames.map((idx) => loadFrame(idx)));
      if (isCancelled) return;
      setProgress(15);

      // Step 2: Pass 1 - every 8th frame (coarse backbone ~24 frames)
      setStatusText("KALIBRASI RANGKAIAN (1/4)");
      const pass1: number[] = [];
      for (let i = 1; i <= TOTAL_FRAMES; i += 8) {
        if (!keyStoryFrames.includes(i)) pass1.push(i);
      }
      let loadedPass1 = 0;
      await Promise.all(
        pass1.map(async (idx) => {
          await loadFrame(idx);
          if (isCancelled) return;
          loadedPass1++;
          const p = 10 + Math.round((loadedPass1 / pass1.length) * 35);
          setProgress((prev) => Math.max(prev, p));
        })
      );

      // Step 3: Pass 2 - every 4th frame
      setStatusText("SINKRONISASI RESOLUSI (2/4)");
      const pass2: number[] = [];
      for (let i = 5; i <= TOTAL_FRAMES; i += 8) {
        pass2.push(i);
      }
      let loadedPass2 = 0;
      await Promise.all(
        pass2.map(async (idx) => {
          await loadFrame(idx);
          if (isCancelled) return;
          loadedPass2++;
          const p = 45 + Math.round((loadedPass2 / pass2.length) * 25);
          setProgress((prev) => Math.max(prev, p));
        })
      );

      // Step 4: Pass 3 - every 2nd frame
      setStatusText("MEMPERSIAPKAN KANVAS (3/4)");
      const pass3: number[] = [];
      for (let i = 3; i <= TOTAL_FRAMES; i += 4) {
        pass3.push(i);
      }
      let loadedPass3 = 0;
      await Promise.all(
        pass3.map(async (idx) => {
          await loadFrame(idx);
          if (isCancelled) return;
          loadedPass3++;
          const p = 70 + Math.round((loadedPass3 / pass3.length) * 20);
          setProgress((prev) => Math.max(prev, p));
        })
      );

      // Finish to 100%
      setStatusText("SIAP MEMULAI EKSPEDISI");
      setProgress(100);

      // Small delay at 100% for aesthetic pacing before curtain reveal
      setTimeout(() => {
        if (!isCancelled) {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      }, 400);

      // Load remaining frames in background after initial unlock
      const pass4: number[] = [];
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (i % 2 === 0) pass4.push(i);
      }
      pass4.forEach((idx) => {
        loadFrame(idx);
      });
    }

    loadAllCoarseToFine();

    // Fallback timer: ensure preloader unblocks within 4s under any network hiccup
    const safetyTimeout = setTimeout(() => {
      if (!isCancelled && !isDone) {
        setProgress(100);
        setIsDone(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, 4500);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimeout);
    };
  }, [onComplete, isDone]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="preloader-curtain"
          key="preloader-curtain"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink text-on-ink p-6 md:p-14 select-none pointer-events-auto"
        >
          {/* Top meta */}
          <div className="flex items-center justify-between text-[11px] tracking-label text-on-ink/60 uppercase">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-alert animate-ping" />
              <span>FORESTWATCH DOCUMENTARY ARCHIVE</span>
            </div>
            <div className="hidden sm:block">KALIMANTAN PEATLAND EXPEDITION</div>
            <div>[ 001 // 189 ]</div>
          </div>

          {/* Center Brand & Large Counter */}
          <div className="my-auto py-12 flex flex-col items-start max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-xs tracking-label uppercase text-secondary mb-3"
            >
              Educational Scrollytelling Experience
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-8xl font-extrabold uppercase tracking-tight leading-none mb-8"
            >
              FORESTWATCH<span className="text-alert">.</span>
            </motion.h1>

            {/* Giant Geist Counter */}
            <div className="flex items-baseline gap-3">
              <span className="font-geist text-6xl sm:text-8xl md:text-9xl font-semibold tracking-tighter text-on-ink font-tabular">
                {String(progress).padStart(3, "0")}
              </span>
              <span className="font-geist text-2xl sm:text-4xl text-on-ink/40 font-light">%</span>
            </div>
          </div>

          {/* Bottom Progress Bar & Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs tracking-label uppercase text-on-ink/60">
              <span className="text-secondary">{statusText}</span>
              <span className="font-geist font-tabular">{Math.round((progress / 100) * TOTAL_FRAMES)} / {TOTAL_FRAMES} FRAMES</span>
            </div>

            {/* 1px Hairline Progress Bar */}
            <div className="w-full h-[1px] bg-on-ink/15 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-on-ink"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-on-ink/40 uppercase tracking-widest pt-1">
              <span>MENGOPTIMALKAN PENYIMPANAN FRAME TINGKAT TINGGI</span>
              <span>LENIS V1.1 // MOTION V11</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
