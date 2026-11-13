"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenisScroll } from "./LenisProvider";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
  const { isMenuOpen, setIsMenuOpen } = useLenisScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled ? "bg-ink/85 backdrop-blur-md hairline-b" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="FORESTWATCH, ke beranda">
            <Image
              src="/logo/logo-horizontal.png"
              alt="FORESTWATCH"
              width={900}
              height={145}
              priority
              className="h-8 sm:h-9 w-auto"
            />
          </Link>

          <button
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-haspopup="dialog"
            aria-label="Buka menu navigasi"
            className="flex items-center gap-2.5 px-4 py-2 text-xs uppercase tracking-label font-bold text-on-ink border border-on-ink/30 hover:border-on-ink hover:bg-on-ink hover:text-ink transition-all rounded-sm cursor-pointer"
          >
            <span>MENU</span>
            <span className="w-1.5 h-1.5 bg-on-ink inline-block" />
          </button>
        </div>
      </header>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
