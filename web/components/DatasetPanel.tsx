import type { DatasetInfo } from "@/lib/datasets";

export function DatasetPanel({ items }: { items: DatasetInfo[] }) {
  return (
    <div className="space-y-4">
      <div className="card p-4 bg-navy text-white border-navy">
        <div className="text-sm font-semibold">Semua dataset tersedia di folder `public/data/` — download langsung dari link tiap kartu.</div>
        <div className="text-xs opacity-80 mt-1">
          Format: CSV UTF-8, comma-separated. Total: 5 file, ~35 KB.
        </div>
      </div>
      {items.map((d) => (
        <details key={d.slug} className="card p-5 group" open>
          <summary className="cursor-pointer list-none flex flex-wrap items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-widest text-merah">
                {d.dimensi} · {d.ukuran}
              </div>
              <h3 className="text-lg font-bold mt-0.5">{d.nama}</h3>
              <p className="lead text-sm mt-1">{d.deskripsi}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <a
                href={`/data/${d.file}`}
                download
                className="text-xs px-3 py-1.5 rounded-full bg-merah text-white font-semibold hover:bg-merah/90 transition"
              >
                ↓ Download CSV
              </a>
              <a
                href={`/data/${d.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full border border-navy dark:border-slate-500 hover:bg-navy hover:text-white transition"
              >
                Preview
              </a>
            </div>
          </summary>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest lead mb-2">Kolom</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left border-b border-[#E5E1D8] dark:border-[#1F2A44]">
                      <th className="py-1.5 pr-3 font-semibold">Nama</th>
                      <th className="py-1.5 pr-3 font-semibold">Tipe</th>
                      <th className="py-1.5 font-semibold">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.kolom.map((k) => (
                      <tr key={k.nama} className="border-b border-[#E5E1D8]/50 dark:border-[#1F2A44]/50">
                        <td className="py-1.5 pr-3 mono text-merah">{k.nama}</td>
                        <td className="py-1.5 pr-3 mono lead">{k.tipe}</td>
                        <td className="py-1.5 lead">{k.keterangan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest lead mb-2">Contoh baris</h4>
              <pre className="text-[11px] mono bg-[#0B1220] text-slate-100 p-3 rounded-lg overflow-x-auto">
                {d.contoh}
              </pre>
              <div className="mt-3 text-xs">
                <span className="lead">Sumber: </span>
                <span className="font-semibold">{d.sumber}</span>
              </div>
            </div>
          </div>
        </details>
      ))}

      <div className="card p-4">
        <h4 className="text-sm font-bold mb-2">Cara pakai di Python</h4>
        <pre className="text-xs mono bg-[#0B1220] text-slate-100 p-3 rounded-lg overflow-x-auto">
{`import pandas as pd

BASE = "https://raw.githubusercontent.com/wahyuarizeina/Analisis-Data-Elektoral-Pemilu-2024-Indonesia/main"

df_partai   = pd.read_csv(f"{BASE}/data_suara_partai_per_provinsi.csv")
df_pilpres  = pd.read_csv(f"{BASE}/data_pilpres_per_provinsi.csv")
df_demo     = pd.read_csv(f"{BASE}/data_demografi_provinsi.csv")
df_sentimen = pd.read_csv(f"{BASE}/data_sentimen_politik.csv")
df_historis = pd.read_csv(f"{BASE}/data_historis_partai.csv")

print(df_partai.head())`}
        </pre>
      </div>
    </div>
  );
}
