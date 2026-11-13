"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { TOTAL_FRAMES, frameImages, frameLoadedState, loadFrame, getNearestLoadedFrame, onFrameLoaded } from "@/lib/frameCache";
import MagneticButton from "./MagneticButton";
import { useLenisScroll } from "./LenisProvider";

interface SequenceScrollProps {
  isPreloaded?: boolean;
}

export default function SequenceScroll({ isPreloaded = true }: SequenceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollTo } = useLenisScroll();

  const [currentStage, setCurrentStage] = useState<"healthy" | "smoke" | "aftermath">("healthy");
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [firstFrameDrawn, setFirstFrameDrawn] = useState(false);

  // Motion scroll progress mapping 0 to 1
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth interpolation spring
  // Following sections overlap the last 100vh of this container (-mt-[100vh]),
  // so the sequence must finish at 80% of the raw scroll progress.
  const rawProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1], { clamp: true });
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
    restDelta: 0.0001,
  });

  // Text overlay transforms
  // 0% - Healthy Forest
  const opacity0 = useTransform(smoothProgress, [0, 0.1, 0.18], [1, 1, 0]);
  const y0 = useTransform(smoothProgress, [0, 0.18], [0, -40]);

  // 30% - The Spark
  const opacity30 = useTransform(smoothProgress, [0.18, 0.25, 0.38, 0.45], [0, 1, 1, 0]);
  const y30 = useTransform(smoothProgress, [0.18, 0.26, 0.45], [40, 0, -40]);

  // 60% - Peat Fire Below
  const opacity60 = useTransform(smoothProgress, [0.46, 0.53, 0.65, 0.71], [0, 1, 1, 0]);
  const y60 = useTransform(smoothProgress, [0.46, 0.54, 0.71], [40, 0, -40]);

  // 90% - Aftermath CTA (Peak around 0.76 - 0.84 before the -mt-[100vh] curtain rises)
  const opacity90 = useTransform(smoothProgress, [0.72, 0.78, 0.90], [0, 1, 1]);
  const y90 = useTransform(smoothProgress, [0.72, 0.78], [40, 0]);

  // Check reduced motion on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Canvas drawing routine with cover-fit and frame blending
  const drawFrames = useCallback(
    (frameProgress: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Handle reduced motion: show final aftermath frame (189)
      const targetFrame = isReducedMotion
        ? TOTAL_FRAMES
        : 1 + frameProgress * (TOTAL_FRAMES - 1);

      const frameFloor = Math.floor(targetFrame);
      const fraction = targetFrame - frameFloor;
      const frameNext = Math.min(TOTAL_FRAMES, frameFloor + 1);

      // Retrieve primary and secondary frames from cache
      let img1 = frameImages[frameFloor] && frameLoadedState[frameFloor] ? frameImages[frameFloor] : null;
      if (!img1) img1 = getNearestLoadedFrame(frameFloor);

      let img2 = frameImages[frameNext] && frameLoadedState[frameNext] ? frameImages[frameNext] : null;
      if (!img2) img2 = getNearestLoadedFrame(frameNext);

      if (!img1) return; // Wait until initial frame is ready

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img1.naturalWidth || 1024;
      const ih = img1.naturalHeight || 576;

      const canvasAspect = cw / ch;
      const imgAspect = iw / ih;

      let renderWidth = cw;
      let renderHeight = ch;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        renderWidth = cw;
        renderHeight = cw / imgAspect;
        offsetY = (ch - renderHeight) / 2;
      } else {
        renderHeight = ch;
        renderWidth = ch * imgAspect;
        offsetX = (cw - renderWidth) / 2;
      }

      // Draw primary base frame
      ctx.globalAlpha = 1.0;
      ctx.drawImage(img1, offsetX, offsetY, renderWidth, renderHeight);

      // Crossfade blend next frame if fraction > 0.01 to prevent micro-stutter
      if (fraction > 0.01 && img2 && img2 !== img1 && !isReducedMotion) {
        ctx.globalAlpha = fraction;
        ctx.drawImage(img2, offsetX, offsetY, renderWidth, renderHeight);
        ctx.globalAlpha = 1.0;
      }

      if (!firstFrameDrawn) {
        setFirstFrameDrawn(true);
      }
    },
    [isReducedMotion, firstFrameDrawn]
  );

  // Resize listener capping dpr at 1.5
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Redraw immediately after resize
      drawFrames(smoothProgress.get());
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrames, smoothProgress]);

  // Scroll ticker: render on change via rAF
  useEffect(() => {
    let animationFrameId: number;
    let lastRenderedProgress = -1;

    const tick = () => {
      const currentProgress = smoothProgress.get();

      // Only redraw if value changed noticeably
      if (Math.abs(currentProgress - lastRenderedProgress) > 0.0002) {
        drawFrames(currentProgress);
        lastRenderedProgress = currentProgress;

        // Update stage state
        // Stage 1: Healthy (0 - ~12%)
        // Stage 2: Smoke (~12% - ~85%)
        // Stage 3: Aftermath (~85% - 100%)
        if (currentProgress < 0.12) {
          setCurrentStage("healthy");
        } else if (currentProgress < 0.72) {
          setCurrentStage("smoke");
        } else {
          setCurrentStage("aftermath");
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [smoothProgress, drawFrames]);

  // Initial draw when preloader completes
  useEffect(() => {
    loadFrame(1).then(() => {
      drawFrames(0);
    });
  }, [drawFrames]);

  // Re-render immediately whenever any new frame finishes streaming in
  useEffect(() => {
    return onFrameLoaded(() => {
      drawFrames(smoothProgress.get());
    });
  }, [drawFrames, smoothProgress]);

  // Stage click navigation
  const handleStageClick = (targetFraction: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const targetY = containerTop + targetFraction * 0.8 * scrollableDistance;

    scrollTo(targetY);
  };

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[600vh] bg-ink select-none"
    >
      {/* Sticky Fullscreen Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Kalimantan peat forest scrollytelling sequence transitioning from healthy lush canopy to raging underground peat fire and burned aftermath"
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            firstFrameDrawn ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Top Gradient Blend into Ink */}
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-ink via-ink/60 to-transparent pointer-events-none z-10" />

        {/* Bottom Gradient Blend into Ink */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-ink via-ink/80 to-transparent pointer-events-none z-10" />

        {/* =========================================================================
            STAGE INDICATORS
            Desktop right indicator / Mobile top progress bar
           ========================================================================= */}
        {/* Mobile top progress bar */}
        <div className="sm:hidden absolute top-20 left-6 right-6 z-20 flex flex-col gap-1 pointer-events-none">
          <div className="flex justify-between text-[10px] tracking-label uppercase text-on-ink/70">
            <span>
              {currentStage === "healthy"
                ? "01 HEALTHY"
                : currentStage === "smoke"
                ? "02 SMOKE & FIRE"
                : "03 AFTERMATH"}
            </span>
            <span className="font-geist">PROGRESS</span>
          </div>
          <div className="h-[2px] w-full bg-on-ink/15 overflow-hidden">
            <motion.div
              className="h-full bg-secondary"
              style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
            />
          </div>
        </div>

        {/* Desktop right vertical stage navigator */}
        <div className="hidden sm:flex fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 flex-col space-y-6 text-right">
          {[
            { id: "healthy", num: "01", label: "HEALTHY", target: 0.0 },
            { id: "smoke", num: "02", label: "SMOKE", target: 0.32 },
            { id: "aftermath", num: "03", label: "AFTERMATH", target: 0.78 },
          ].map((s) => {
            const isActive = currentStage === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleStageClick(s.target)}
                className="group flex items-center justify-end gap-3 text-right cursor-pointer focus:outline-none"
                aria-label={`Scroll to stage ${s.label}`}
              >
                <div className="flex flex-col items-end">
                  <span
                    className={`text-[10px] tracking-label uppercase font-mono transition-colors duration-300 ${
                      isActive ? "text-secondary font-bold" : "text-on-ink/40 group-hover:text-on-ink/70"
                    }`}
                  >
                    {s.num}
                  </span>
                  <span
                    className={`text-xs uppercase tracking-tight font-extrabold transition-colors duration-300 ${
                      isActive ? "text-on-ink" : "text-on-ink/40 group-hover:text-on-ink/70"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                <div
                  className={`w-1 transition-all duration-300 ${
                    isActive
                      ? "h-8 bg-secondary"
                      : "h-3 bg-on-ink/20 group-hover:h-5 group-hover:bg-on-ink/50"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TEXT OVERLAYS (THE STORY)
           ========================================================================= */}

        {/* --- 0% SCROLL: CENTERED HERO --- */}
        <motion.div
          style={{ opacity: isReducedMotion ? 1 : opacity0, y: isReducedMotion ? 0 : y0 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <div className="max-w-4xl flex flex-col items-center">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold uppercase tracking-tight text-on-ink leading-[0.95] mb-6">
              THE FOREST IS ALIVE<span className="text-secondary">.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-on-ink/90 max-w-2xl font-normal leading-relaxed mb-10">
              Hutan gambut dan hutan hujan Indonesia menyimpan karbon selama ratusan tahun.
            </p>

            {/* Scroll cue */}
            <div className="flex flex-col items-center gap-2 text-on-ink/50">
              <span className="text-[10px] uppercase tracking-widest">Scroll to begin</span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-on-ink/50 to-transparent animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* --- 30% SCROLL: LEFT ALIGNED --- */}
        <motion.div
          style={{ opacity: isReducedMotion ? 1 : opacity30, y: isReducedMotion ? 0 : y30 }}
          className="absolute inset-0 z-20 flex items-center justify-start px-6 sm:px-16 md:px-24 pointer-events-none"
        >
          <div className="max-w-xl text-left">
            <div className="text-xs uppercase tracking-label text-alert font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-alert animate-ping" />
              <span>Titik Awal Kebakaran</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-on-ink leading-[0.95] mb-6">
              ONE SPARK IS ENOUGH<span className="text-alert">.</span>
            </h2>
            <p className="text-base sm:text-lg text-on-ink/85 font-normal leading-relaxed hairline-l pl-4 border-alert/50">
              Api kecil di lahan kering bisa menyebar jauh sebelum terlihat dari atas.
            </p>
          </div>
        </motion.div>

        {/* --- 60% SCROLL: RIGHT ALIGNED --- */}
        <motion.div
          style={{ opacity: isReducedMotion ? 1 : opacity60, y: isReducedMotion ? 0 : y60 }}
          className="absolute inset-0 z-20 flex items-center justify-end px-6 sm:px-16 md:px-24 pointer-events-none"
        >
          <div className="max-w-xl text-right flex flex-col items-end">
            <div className="text-xs uppercase tracking-label text-warning font-bold mb-3 flex items-center gap-2">
              <span>Anatomi Api Bawah Tanah</span>
              <span className="w-2 h-2 rounded-none bg-warning" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-on-ink leading-[0.95] mb-6">
              IT BURNS BELOW THE SURFACE<span className="text-warning">.</span>
            </h2>
            <p className="text-base sm:text-lg text-on-ink/85 font-normal leading-relaxed hairline-r pr-4 border-warning/50">
              Pada lahan gambut, api bisa menyebar di bawah permukaan tanah dan sulit dipadamkan.
            </p>
          </div>
        </motion.div>

        {/* --- 90% SCROLL: CENTERED CTA --- */}
        <motion.div
          style={{ opacity: isReducedMotion ? 1 : opacity90, y: isReducedMotion ? 0 : y90 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <div className="max-w-3xl flex flex-col items-center pointer-events-auto">
            <div className="text-xs uppercase tracking-label text-secondary font-semibold mb-4">
              Konsekuensi Ekologis & Panggilan Bertindak
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-on-ink leading-[0.95] mb-6">
              WHEN FORESTS BURN, WE ALL LOSE<span className="text-alert">.</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-on-ink/85 max-w-2xl font-normal leading-relaxed mb-8">
              Pelajari penyebabnya, cegah dari sekarang, dan ketahui apa yang harus dilakukan.
            </p>

            <MagneticButton href="/konten/pahami">
              Start learning
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
