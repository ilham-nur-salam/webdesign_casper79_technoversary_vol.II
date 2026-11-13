"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/lib/content";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(null);
    triggerRef.current?.focus();
  };
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "Tab" && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button"));
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const item = open === null ? null : GALLERY[open];

  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {GALLERY.map((g, i) => (
          <li key={g.src}>
            <button
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpen(i);
              }}
              className="group relative block w-full aspect-[4/3] overflow-hidden border border-on-ink/15 hover:border-on-ink/60 rounded-sm"
              aria-label={`Perbesar: ${g.title}`}
            >
              <Image src={g.src} alt={`Ilustrasi AI: ${g.title}`} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 text-left text-xs font-bold uppercase tracking-label">
                {g.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {item && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          data-lenis-prevent
          className="fixed inset-0 z-[70] bg-ink/95 flex flex-col items-center justify-center p-4 sm:p-10"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="w-full max-w-5xl flex justify-end mb-3">
            <button onClick={close} aria-label="Tutup" className="flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-label font-bold border border-on-ink/30 hover:bg-on-ink hover:text-ink rounded-sm">
              TUTUP <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="relative w-full max-w-5xl aspect-[16/10] max-h-[70vh]">
            <Image src={item.src} alt={`Ilustrasi AI: ${item.title}`} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="w-full max-w-5xl mt-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold uppercase tracking-label">{item.title}</div>
              <div className="text-xs text-on-ink/75">{item.note} <span className="text-on-ink/50">(Ilustrasi AI)</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => step(-1)} aria-label="Gambar sebelumnya" className="w-10 h-10 border border-on-ink/30 hover:bg-on-ink hover:text-ink flex items-center justify-center rounded-sm"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => step(1)} aria-label="Gambar berikutnya" className="w-10 h-10 border border-on-ink/30 hover:bg-on-ink hover:text-ink flex items-center justify-center rounded-sm"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
