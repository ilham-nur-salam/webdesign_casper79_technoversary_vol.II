import React from "react";

export default function PageHeader({ kicker, title, lead }: { kicker?: string; title: string; lead?: string }) {
  return (
    <header className="pt-36 sm:pt-44 pb-12 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full">
      {kicker && (
        <div className="flex items-center gap-2 text-xs tracking-label uppercase text-secondary mb-5">
          <span className="w-2 h-2 bg-alert inline-block" />
          <span>{kicker}</span>
        </div>
      )}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.98] max-w-5xl">
        {title}
        <span className="text-alert">.</span>
      </h1>
      {lead && <p className="mt-6 text-base sm:text-lg text-on-ink/85 max-w-2xl leading-relaxed">{lead}</p>}
    </header>
  );
}
