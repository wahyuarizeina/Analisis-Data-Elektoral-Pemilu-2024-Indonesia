import { Tabs, type TabDef } from "@/components/Tabs";
import { Chart, ChartGrid } from "@/components/Chart";
import { InsightCard } from "@/components/InsightCard";
import { DataTable } from "@/components/DataTable";
import { DatasetPanel } from "@/components/DatasetPanel";
import { MetodologiPanel } from "@/components/MetodologiPanel";
import { provinsi, metrik, pilpresNasional } from "@/lib/data";
import { datasets } from "@/lib/datasets";
import { models } from "@/lib/metodologi";

const V = (name: string) => `/viz/viz_${name}.png`;

function KPI({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card p-5">
      <div className="text-[11px] font-semibold uppercase tracking-widest lead">{label}</div>
      <div className="mt-1.5 mono text-2xl font-extrabold text-merah">{value}</div>
      {sub && <div className="text-xs lead mt-1">{sub}</div>}
    </div>
  );
}

function Section({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-navy dark:text-slate-100 mb-1">
        {title}
      </h2>
      {lead && <p className="lead mb-4">{lead}</p>}
      {children}
    </section>
  );
}

const insights = [
  { warna: "merah" as const, tag: "Temuan 1", title: "Prabowo-Gibran menang mayoritas",
    body: "~58% nasional. Dominasi di 33 dari 38 provinsi. Anies unggul di Aceh & Sumbar; Ganjar hanya kuat di Jateng & Bali." },
  { warna: "emas" as const, tag: "Temuan 2", title: "Battleground < 15% margin",
    body: "Aceh, Sumbar, Jateng, DIY, Bali menjadi 5 provinsi dengan margin tertipis — target ROI kampanye tertinggi." },
  { warna: "hijau" as const, tag: "Temuan 3", title: "Gap partisipasi Papua",
    body: "6 provinsi Papua < 76% partisipasi. Korelasi partisipasi ↔ penetrasi internet r=+0,45." },
  { warna: "biru" as const, tag: "Temuan 4", title: "Sentimen negatif: korupsi & harga",
    body: "Rata-rata sentimen negatif 60%+ untuk isu korupsi & kenaikan harga pangan. Bansos & pendidikan positif konsisten." },
  { warna: "merah" as const, tag: "Temuan 5", title: "Segmentasi 4 cluster",
    body: "Urban Progressive, Rural Traditional, Swing Moderate, Emerging Region — strategi kampanye wajib disesuaikan per cluster." },
  { warna: "emas" as const, tag: "Model", title: "Prediktor partisipasi teratas",
    body: `Penetrasi internet, IPM, urbanisasi. Gradient Boosting R² ${metrik.r2_gb} · MAE ${metrik.mae_gb}%.` },
];

const tabs: TabDef[] = [
  {
    id: "exec",
    label: "Ringkasan Eksekutif",
    content: (
      <Section
        title="Ringkasan Eksekutif"
        lead="5 temuan utama dari analisis 38 provinsi, 15 partai, 3 paslon, 10 topik sentimen, dan 8 partai lintas 4 pemilu (2009–2024)."
      >
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((it) => (
            <InsightCard key={it.tag + it.title} {...it} />
          ))}
        </div>
        <h3 className="mt-8 mb-3 text-lg font-semibold">3 Rekomendasi Strategis</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "1. Fokus 5 battleground → uji A/B pesan kampanye",
            "2. Segmentasi konten per cluster (video pendek untuk Urban; door-to-door untuk Emerging)",
            "3. Serangan isu korupsi + program stabilisasi harga → merebut voter skeptis",
          ].map((r) => (
            <div key={r} className="card px-3 py-2 text-sm">{r}</div>
          ))}
        </div>
      </Section>
    ),
  },
  {
    id: "pilpres",
    label: "Pilpres",
    content: (
      <Section
        title="Hasil Pilpres 2024"
        lead="Prabowo-Gibran unggul mayoritas nasional. Anies-Cak Imin kuat di Aceh & Sumatera Barat, Ganjar-Mahfud kompetitif di Jateng & Bali."
      >
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {pilpresNasional.map((p) => (
            <div key={p.paslon} className="card p-4">
              <div className="text-xs lead">{p.paslon}</div>
              <div className="mono text-xl font-extrabold text-merah mt-1">{p.pct}%</div>
              <div className="text-xs lead">{(p.suara / 1e6).toFixed(1)} juta suara</div>
            </div>
          ))}
        </div>
        <Chart src={V("pilpres")} alt="Pilpres" />
      </Section>
    ),
  },
  {
    id: "partai",
    label: "Peta Partai",
    content: (
      <Section
        title="Peta Perolehan Partai"
        lead={`${metrik.lolos_threshold} partai lolos ambang parlementer 4%. Heatmap di bawah menampilkan sebaran per provinsi untuk 8 partai teratas.`}
      >
        <Chart src={V("partai_nasional")} alt="Partai Nasional" />
        <div className="mt-4">
          <Chart src={V("heatmap_partai")} alt="Heatmap Partai" />
        </div>
      </Section>
    ),
  },
  {
    id: "battle",
    label: "Battleground",
    content: (
      <Section
        title="Battleground vs Safe Seat"
        lead="Klasifikasi provinsi berdasarkan margin kemenangan Pilpres — kunci alokasi budget kampanye."
      >
        <Chart src={V("battleground")} alt="Battleground" />
      </Section>
    ),
  },
  {
    id: "regional",
    label: "Regional",
    content: (
      <Section
        title="Analisis Regional"
        lead="Jawa-Bali vs Sumatera vs Kalimantan vs Sulawesi vs Papua-Maluku-NTT-NTB — pola paslon & partai berbeda tajam."
      >
        <Chart src={V("regional")} alt="Regional" />
      </Section>
    ),
  },
  {
    id: "demografi",
    label: "Demografi",
    content: (
      <Section
        title="Partisipasi & Pemilih Muda"
        lead="Korelasi urbanisasi/internet ↔ partisipasi, plus proporsi Gen Z + Milenial per provinsi."
      >
        <ChartGrid>
          <Chart src={V("partisipasi")} alt="Partisipasi" />
          <Chart src={V("korelasi")} alt="Korelasi" />
        </ChartGrid>
        <div className="mt-4">
          <Chart src={V("pemilih_muda")} alt="Pemilih Muda" />
        </div>
      </Section>
    ),
  },
  {
    id: "clustering",
    label: "Clustering",
    content: (
      <Section
        title="Segmentasi 4 Cluster Provinsi"
        lead="K-Means atas urbanisasi, penetrasi internet, partisipasi, IPM. Empat segmen: Urban Progressive, Rural Traditional, Swing Moderate, Emerging Region."
      >
        <Chart src={V("clustering")} alt="Clustering" />
        <div className="mt-4">
          <Chart src={V("cluster_profile")} alt="Cluster Profile" />
        </div>
      </Section>
    ),
  },
  {
    id: "sentimen",
    label: "Sentimen",
    content: (
      <Section
        title="Sentimen Publik Jan–Jun 2024"
        lead="Korupsi & kenaikan harga pangan dominan negatif. Bansos & pendidikan konsisten positif."
      >
        <Chart src={V("sentimen")} alt="Sentimen" />
      </Section>
    ),
  },
  {
    id: "ml",
    label: "ML Model",
    content: (
      <Section
        title="Model Prediktif Partisipasi"
        lead="Random Forest & Gradient Boosting memprediksi partisipasi pemilih."
      >
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="card px-4 py-2 text-sm">
            RF: R² <b className="mono text-merah">{metrik.r2_rf}</b> · MAE{" "}
            <b className="mono text-merah">{metrik.mae_rf}%</b>
          </div>
          <div className="card px-4 py-2 text-sm">
            GB: R² <b className="mono text-merah">{metrik.r2_gb}</b> · MAE{" "}
            <b className="mono text-merah">{metrik.mae_gb}%</b>
          </div>
        </div>
        <ChartGrid>
          <Chart src={V("feature_importance")} alt="Feature Importance" />
          <Chart src={V("prediction")} alt="Prediction" />
        </ChartGrid>
      </Section>
    ),
  },
  {
    id: "kursi",
    label: "Kursi & Koalisi",
    content: (
      <Section
        title="Estimasi Kursi DPR & Skenario Koalisi"
        lead="Alokasi 580 kursi via metode Sainte-Laguë disederhanakan, plus 4 skenario koalisi vs threshold capres 20%."
      >
        <Chart src={V("kursi_dpr")} alt="Kursi DPR" />
        <div className="mt-4">
          <Chart src={V("koalisi")} alt="Koalisi" />
        </div>
      </Section>
    ),
  },
  {
    id: "historis",
    label: "Historis",
    content: (
      <Section
        title="Tren Historis Partai 2009–2024"
        lead="Demokrat turun tajam, Gerindra meroket, PDIP stabil sebagai partai pemenang."
      >
        <Chart src={V("historis")} alt="Historis" />
      </Section>
    ),
  },
  {
    id: "dataset",
    label: "Dataset",
    content: (
      <Section
        title="Dataset Lengkap"
        lead="5 dataset CSV yang dipakai project ini — bisa didownload langsung, cocok untuk reproduksi analisis atau riset lanjutan."
      >
        <DatasetPanel items={datasets} />
      </Section>
    ),
  },
  {
    id: "metodologi",
    label: "Metodologi AI",
    content: (
      <Section
        title="Metodologi AI, ML, & Sentimen"
        lead="Detail teknis setiap model: hyperparameter, kode Python, metrik, dan interpretasi. Transparansi penuh — semua reproducible."
      >
        <MetodologiPanel items={models} />
      </Section>
    ),
  },
  {
    id: "data",
    label: "Data Provinsi",
    content: (
      <Section title="Data Provinsi" lead="Klik header untuk sort. Cari via kotak di atas tabel.">
        <DataTable data={provinsi} />
      </Section>
    ),
  },
];

export default function Home() {
  return (
    <>
      <header className="bg-gradient-to-br from-navy to-[#1a3a6b] text-white px-8 py-8">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Analisis Data Elektoral Pemilu 2024 Indonesia
          </h1>
          <p className="mt-2 opacity-85 text-sm sm:text-base">
            Portfolio AI &amp; Data Analyst · Wahyu Surya · Data: simulasi berbasis pola KPU RI &amp; BPS
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://github.com/wahyuarizeina/Analisis-Data-Elektoral-Pemilu-2024-Indonesia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition"
            >
              GitHub Repo →
            </a>
            <a
              href="/Analisis_Elektoral_Pemilu_2024.ipynb"
              className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition"
            >
              Notebook (.ipynb)
            </a>
            <a
              href="/Slides_Elektoral_2024.pptx"
              className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition"
            >
              Slide Deck (.pptx)
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-8 py-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <KPI
            label="Total Suara Pilpres"
            value={`${(metrik.total_suara_pilpres / 1e6).toFixed(1)} jt`}
            sub="3 paslon, 38 provinsi"
          />
          <KPI
            label="Partisipasi Rata-rata"
            value={`${metrik.partisipasi_rata2.toFixed(2)}%`}
            sub="min 65% (Papua Selatan), max 90% (Jateng)"
          />
          <KPI label="Partai Lolos 4%" value={String(metrik.lolos_threshold)} sub="dari 15 kontestan" />
          <KPI
            label="Model R² (best)"
            value={String(metrik.r2_gb)}
            sub={`Gradient Boosting · MAE ${metrik.mae_gb}%`}
          />
        </div>
      </div>

      <Tabs tabs={tabs} />

      <footer className="text-center px-6 py-6 border-t border-[#E5E1D8] dark:border-[#1F2A44] text-sm lead">
        Analisis Elektoral Pemilu 2024 · Wahyu Surya · Data simulasi pola KPU RI &amp; BPS
      </footer>
    </>
  );
}
