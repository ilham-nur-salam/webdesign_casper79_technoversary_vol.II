"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLenisScroll } from "./LenisProvider";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
  const { isMenuOpen, setIsMenuOpen } = useLenisScroll();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [contentReached, setContentReached] = useState(false);
  const [hasContentSection, setHasContentSection] = useState(false);

  useEffect(() => {
    const contentSection = document.getElementById("perspektif");
    setHasContentSection(Boolean(contentSection));

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (contentSection) {
        const headerHeight = window.innerWidth >= 640 ? 80 : 64;
        setContentReached(contentSection.getBoundingClientRect().top <= headerHeight);
      } else {
        setContentReached(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const isSolid = hasContentSection ? contentReached : scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isSolid
            ? "bg-ink/95 backdrop-blur-md hairline-b"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-10 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="min-w-0 flex items-center" aria-label="FORESTWATCH, ke beranda">
            <Image
              src="/logo/logo-horizontal.png"
              alt="FORESTWATCH"
              width={900}
              height={145}
              priority
              className="h-7 sm:h-9 w-auto max-w-[calc(100vw-120px)]"
            />
          </Link>

          <button
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-haspopup="dialog"
            aria-label="Buka menu navigasi"
            className="shrink-0 flex items-center gap-2 px-3 py-2 sm:px-4 text-[10px] sm:text-xs uppercase tracking-label font-bold text-on-ink border border-on-ink/30 hover:border-on-ink hover:bg-on-ink hover:text-ink transition-all rounded-sm cursor-pointer"
          >
            <span>MENU</span>
            <span className="w-1.5 h-1.5 bg-on-ink inline-block shrink-0" />
          </button>
        </div>
      </header>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
