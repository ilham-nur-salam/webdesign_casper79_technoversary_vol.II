import React from "react";
import type { Source } from "@/lib/content";

export default function SourceList({ sources }: { sources: Source[] }) {
  return (
    <aside aria-label="Sumber" className="hairline-t pt-6 mt-14">
      <h2 className="text-xs uppercase tracking-label font-bold text-on-ink/70 mb-3">Sumber</h2>
      <ul className="space-y-2 text-sm">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-on-ink/85 hover:text-secondary underline underline-offset-4">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
