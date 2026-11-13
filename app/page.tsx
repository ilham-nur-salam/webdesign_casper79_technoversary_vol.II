"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import SequenceScroll from "@/components/SequenceScroll";
import TextReveal from "@/components/TextReveal";
import BentoCards from "@/components/BentoCards";
import Stats from "@/components/Stats";
import KeyMessages from "@/components/KeyMessages";
import CTASection from "@/components/CTASection";

export default function Home() {
  const [isPreloaded, setIsPreloaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIsPreloaded(true)} />
      <SequenceScroll isPreloaded={isPreloaded} />
      <div className="-mt-[100vh] relative z-10 w-full">
        <TextReveal />
        <BentoCards />
        <Stats />
        <KeyMessages />
        <CTASection />
      </div>
    </>
  );
}
