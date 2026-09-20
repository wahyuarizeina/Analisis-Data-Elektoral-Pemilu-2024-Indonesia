import type { ModelInfo } from "@/lib/metodologi";

const kategoriWarna: Record<ModelInfo["kategori"], string> = {
  "AI/ML": "bg-merah text-white",
  "NLP": "bg-biru text-white",
  "Statistik": "bg-emas text-navy",
  "Simulasi": "bg-hijau text-white",
};

export function MetodologiPanel({ items }: { items: ModelInfo[] }) {
  return (
    <div className="space-y-4">
      <div className="card p-4 bg-navy text-white border-navy">
        <div className="text-sm font-semibold">
          6 model / metode dipakai — 3 AI/ML, 1 NLP (sentiment), 1 simulasi kursi, 1 dimensionality reduction.
        </div>
        <div className="text-xs opacity-80 mt-1">
          Semua kode reproducible dengan <span className="mono">random_state=42</span>.
        </div>
      </div>

      {items.map((m) => (
        <details key={m.slug} className="card p-5" open>
          <summary className="cursor-pointer list-none">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${kategoriWarna[m.kategori]}`}>
                    {m.kategori}
                  </span>
                  <span className="text-[11px] lead mono">{m.library}</span>
                </div>
                <h3 className="text-lg font-bold mt-1.5">{m.nama}</h3>
                <p className="lead text-sm mt-1">{m.tujuan}</p>
              </div>
            </div>
          </summary>

          <div className="mt-4 grid lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest lead mb-2">Input</h4>
              <ul className="text-sm space-y-1 mb-4">
                {m.input.map((it) => (
                  <li key={it} className="mono">· {it}</li>
                ))}
              </ul>

              <h4 className="text-xs font-bold uppercase tracking-widest lead mb-2">Output</h4>
              <p className="text-sm mb-4">{m.output}</p>

              <h4 className="text-xs font-bold uppercase tracking-widest lead mb-2">Hyperparameters</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <tbody>
                    {m.hyperparams.map((h) => (
                      <tr key={h.nama} className="border-b border-[#E5E1D8]/50 dark:border-[#1F2A44]/50">
                        <td className="py-1.5 pr-3 font-semibold whitespace-nowrap">{h.nama}</td>
                        <td className="py-1.5 pr-3 mono text-merah">{h.nilai}</td>
                        <td className="py-1.5 lead text-[11px]">{h.catatan ?? ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {m.metrik && m.metrik.length > 0 && (
                <>
                  <h4 className="text-xs font-bold uppercase tracking-widest lead mb-2 mt-4">
                    Metrik / Hasil
                  </h4>
                  <div className="grid gap-2">
                    {m.metrik.map((mk) => (
                      <div key={mk.nama} className="border-l-4 border-emas pl-3 py-1">
                        <div className="text-xs font-semibold">
                          {mk.nama}: <span className="mono text-merah">{mk.nilai}</span>
                        </div>
                        <div className="text-xs lead">{mk.interpretasi}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest lead mb-2">Kode Python</h4>
              <pre className="text-[11px] mono bg-[#0B1220] text-slate-100 p-3 rounded-lg overflow-x-auto max-h-96">
                {m.kode}
              </pre>

              <h4 className="text-xs font-bold uppercase tracking-widest lead mb-2 mt-4">
                Interpretasi
              </h4>
              <p className="text-sm">{m.interpretasi}</p>

              {m.referensi && (
                <div className="mt-3 text-xs">
                  <span className="lead">Referensi: </span>
                  <a
                    href={m.referensi.split(" ")[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-biru hover:underline break-all"
                  >
                    {m.referensi}
                  </a>
                </div>
              )}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
