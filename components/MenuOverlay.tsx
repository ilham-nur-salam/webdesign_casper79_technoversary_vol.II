"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NAV_ITEMS = [
  { index: "01", label: "BERANDA", href: "/", desc: "Perjalanan scrollytelling" },
  { index: "02", label: "PAHAMI", href: "/konten/pahami", desc: "Penyebab & cara kerja karhutla" },
  { index: "03", label: "CEGAH", href: "/konten/cegah", desc: "Pencegahan & kebiasaan" },
  { index: "04", label: "JIKA MELIHAT API", href: "/konten/darurat", desc: "Tindakan saat darurat" },
  { index: "05", label: "PULIHKAN", href: "/konten/pulihkan", desc: "Restorasi & partisipasi" },
  { index: "06", label: "KONTEN", href: "/konten", desc: "Artikel & galeri" },
  { index: "07", label: "UJI DIRI", href: "/interaktif", desc: "Cek risiko & kuis" },
  { index: "08", label: "TENTANG", href: "/tentang", desc: "Misi & sumber data" },
  { index: "09", label: "KONTAK", href: "/kontak", desc: "Kirim pertanyaan" },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Esc to close + Tab focus trap
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!menuRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen, onClose]);

  // Move focus in on open, restore on close
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => {
      menuRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 50);
    return () => {
      window.clearTimeout(t);
      previous?.focus?.();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          data-lenis-prevent
          className="fixed inset-0 z-50 bg-ink text-on-ink flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto"
        >
          <div className="flex items-center justify-between hairline-b pb-6">
            <div className="flex items-center gap-2 text-xs tracking-label uppercase text-on-ink/60">
              <span className="w-1.5 h-1.5 rounded-full bg-alert" />
              <span className="font-semibold text-on-ink">FORESTWATCH</span>
              <span className="text-on-ink/40">/ DIREKTORI</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Tutup menu"
              className="flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-label font-bold border border-on-ink/20 hover:border-on-ink hover:bg-on-ink hover:text-ink transition-colors rounded-sm"
            >
              <span>TUTUP</span>
              <span className="text-[10px] text-on-ink/60">[ESC]</span>
              <X className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto">
            <nav aria-label="Menu utama" className="lg:col-span-8 flex flex-col space-y-1 sm:space-y-2">
              {NAV_ITEMS.map((item, idx) => {
                const dimmed = hoveredIdx !== null && hoveredIdx !== idx;
                const current = pathname === item.href;
                return (
                  <div key={item.index} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.45, delay: 0.04 + idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={current ? "page" : undefined}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        className={`group flex items-center gap-4 w-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary ${
                          dimmed ? "opacity-30" : "opacity-100"
                        } ${hoveredIdx === idx ? "translate-x-3" : ""}`}
                      >
                        <span className="font-geist text-xs sm:text-sm text-secondary font-mono tracking-widest w-8">
                          {item.index}
                        </span>
                        <span
                          className={`text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight transition-colors group-hover:text-secondary ${
                            current ? "text-secondary" : "text-on-ink"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="hidden xl:inline text-xs text-on-ink/50 tracking-wider uppercase ml-4">
                          — {item.desc}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            <div className="lg:col-span-4 flex flex-col justify-between hairline-t lg:hairline-t-0 lg:hairline-l pt-8 lg:pt-0 lg:pl-8 space-y-8">
              <div>
                <h4 className="text-xs uppercase tracking-label text-on-ink/60 mb-3">Catatan keselamatan</h4>
                <p className="text-xs text-on-ink/80 leading-relaxed">
                  FORESTWATCH adalah platform edukasi, bukan layanan darurat. Bila melihat kebakaran aktif, jauhi lokasi
                  dan hubungi <strong className="text-on-ink">112</strong> atau BPBD dan pemadam kebakaran setempat.
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-label text-on-ink/60 mb-3">Sumber resmi</h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <a className="text-on-ink/80 hover:text-secondary underline underline-offset-4" href="https://sipongi.menlhk.go.id" target="_blank" rel="noopener noreferrer">
                      SiPongi — Pemantauan Karhutla (KLHK)
                    </a>
                  </li>
                  <li>
                    <a className="text-on-ink/80 hover:text-secondary underline underline-offset-4" href="https://firms.modaps.eosdis.nasa.gov" target="_blank" rel="noopener noreferrer">
                      NASA FIRMS — Titik panas satelit
                    </a>
                  </li>
                  <li>
                    <a className="text-on-ink/80 hover:text-secondary underline underline-offset-4" href="https://www.bmkg.go.id" target="_blank" rel="noopener noreferrer">
                      BMKG — Cuaca & kualitas udara
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 hairline-t pt-6 text-xs text-on-ink/60 uppercase tracking-label">
            <div>EDUKASI KARHUTLA INDONESIA</div>
            <div className="text-[11px] text-secondary">PAHAMI • CEGAH • PULIHKAN</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
