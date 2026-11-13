"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-on-ink focus:text-ink focus:px-4 focus:py-2 text-xs font-bold uppercase tracking-label"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="main" className="relative w-full bg-ink text-on-ink">
        {children}
      </main>
      <Footer />
    </>
  );
}
