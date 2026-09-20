"use client";
import { useMemo, useState } from "react";
import type { Provinsi } from "@/lib/data";

type SortKey = keyof Provinsi;

const kolom: { key: SortKey; label: string; num?: boolean; fmt?: (v: number) => string }[] = [
  { key: "provinsi", label: "Provinsi" },
  { key: "populasi", label: "Populasi", num: true, fmt: (v) => v.toLocaleString("id-ID") },
  { key: "dpt", label: "DPT", num: true, fmt: (v) => v.toLocaleString("id-ID") },
  { key: "partisipasi", label: "Partisipasi", num: true, fmt: (v) => `${v.toFixed(2)}%` },
  { key: "urbanisasi", label: "Urbanisasi", num: true, fmt: (v) => `${v.toFixed(1)}%` },
  { key: "ipm", label: "IPM", num: true, fmt: (v) => v.toFixed(2) },
  { key: "prabowo", label: "Prabowo", num: true, fmt: (v) => `${v.toFixed(1)}%` },
  { key: "anies", label: "Anies", num: true, fmt: (v) => `${v.toFixed(1)}%` },
  { key: "ganjar", label: "Ganjar", num: true, fmt: (v) => `${v.toFixed(1)}%` },
];

export function DataTable({ data }: { data: Provinsi[] }) {
  const [sort, setSort] = useState<{ key: SortKey; asc: boolean }>({
    key: "provinsi",
    asc: true,
  });
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const filtered = q
      ? data.filter((r) => r.provinsi.toLowerCase().includes(q.toLowerCase()))
      : data;
    const dir = sort.asc ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [data, sort, q]);

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cari provinsi…"
        className="mb-3 w-full max-w-xs px-3 py-2 rounded-lg border border-[#E5E1D8] dark:border-[#1F2A44] bg-white dark:bg-[#111C33] focus:outline-none focus:ring-2 focus:ring-merah/40"
      />
      <div className="overflow-x-auto card">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy text-white">
              {kolom.map((k) => (
                <th
                  key={k.key}
                  onClick={() =>
                    setSort((s) => ({ key: k.key, asc: s.key === k.key ? !s.asc : true }))
                  }
                  className="px-3 py-2.5 text-left font-semibold cursor-pointer select-none hover:bg-[#1a3a6b]"
                >
                  {k.label}
                  {sort.key === k.key && (
                    <span className="ml-1 text-emas">{sort.asc ? "↑" : "↓"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.provinsi}
                className="border-t border-[#E5E1D8] dark:border-[#1F2A44] hover:bg-merah/5"
              >
                {kolom.map((k) => {
                  const v = r[k.key];
                  const s = k.fmt && typeof v === "number" ? k.fmt(v) : String(v);
                  return (
                    <td
                      key={k.key}
                      className={`px-3 py-2 ${k.num ? "mono text-right" : ""}`}
                    >
                      {s}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="lead text-xs mt-2">{rows.length} provinsi.</p>
    </div>
  );
}
