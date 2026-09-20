"use client";
import { useState, ReactNode } from "react";

export type TabDef = { id: string; label: string; content: ReactNode };

export function Tabs({ tabs, initial = 0 }: { tabs: TabDef[]; initial?: number }) {
  const [i, setI] = useState(initial);
  return (
    <div>
      <nav className="flex flex-wrap gap-1 px-8 border-b border-[#E5E1D8] dark:border-[#1F2A44] overflow-x-auto">
        {tabs.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => setI(idx)}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-[3px] transition-colors ${
              idx === i
                ? "text-merah border-merah"
                : "text-[#5D6D7E] dark:text-slate-400 border-transparent hover:text-navy dark:hover:text-slate-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="mx-auto max-w-[1400px] px-8 py-6 pb-10">
        <div key={tabs[i].id} className="animate-fadein">{tabs[i].content}</div>
      </main>
      <style jsx>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: none; }
        }
        :global(.animate-fadein) { animation: fadein 0.35s ease; }
      `}</style>
    </div>
  );
}
