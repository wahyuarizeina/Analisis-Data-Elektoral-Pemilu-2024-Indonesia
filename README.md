# Pemilu 2024 Analytics — Portfolio AI & Data Analyst

Analisis data elektoral Pemilu 2024 Indonesia end-to-end: EDA · segmentasi K-Means · model prediktif · simulasi kursi DPR · rekomendasi strategis.

**Author:** Wahyu Surya · **Tahun:** 2024

---

## Live Preview

- **Web (Next.js, deploy Vercel):** [web/](web/) — lihat [web/README.md](web/README.md)
- **Dashboard HTML self-contained:** [dashboard_elektoral_2024.html](dashboard_elektoral_2024.html)
- **Notebook:** [Analisis_Elektoral_Pemilu_2024.ipynb](Analisis_Elektoral_Pemilu_2024.ipynb)
- **Slide deck:** [Slides_Elektoral_2024.pptx](Slides_Elektoral_2024.pptx)
- **Laporan analis:** [INSIGHTS.md](INSIGHTS.md)

### Deploy ke Vercel (1x klik)
1. https://vercel.com/new → import repo ini
2. **Root Directory:** `web`
3. Framework: Next.js (auto-detect) · Deploy

### Deploy dashboard HTML statis via GitHub Pages
Lihat [PANDUAN_PORTOFOLIO.md § B.3](PANDUAN_PORTOFOLIO.md).

---

## Highlight Temuan

- Prabowo-Gibran menang **58,4%** nasional; 5 provinsi battleground (margin < 15%).
- **9 partai** lolos ambang 4%; PDIP #1 dengan 16,7% suara.
- Segmentasi provinsi jadi **4 cluster** (Urban Progressive, Rural Traditional, Swing Moderate, Emerging Region).
- Model prediksi partisipasi Gradient Boosting **R² 0,585** — penetrasi internet fitur #1.
- Sentimen negatif dominan: **korupsi & harga pangan**; positif dominan: **bansos & pendidikan**.
- Estimasi kursi DPR (Sainte-Laguë): PDIP 99 · Golkar 91 · Gerindra 79 · PKB 63.

Detail lengkap → [INSIGHTS.md](INSIGHTS.md).

---

## Struktur Repo

```
portfolio-elektoral/
├── data_suara_partai_per_provinsi.csv     # 15 partai × 38 provinsi
├── data_pilpres_per_provinsi.csv          # 3 paslon × 38 provinsi
├── data_demografi_provinsi.csv            # populasi, DPT, IPM, urbanisasi, dll
├── data_sentimen_politik.csv              # 10 topik × 6 bulan
├── data_historis_partai.csv               # 8 partai × 4 pemilu (2009-2024)
├── Analisis_Elektoral_Pemilu_2024.ipynb   # notebook 19 bagian
├── dashboard_elektoral_2024.html          # dashboard self-contained
├── Slides_Elektoral_2024.pptx             # slide 12 halaman
├── INSIGHTS.md                            # laporan analis
├── PANDUAN_PORTOFOLIO.md                  # panduan A-G
├── metrik.json                            # KPI + hasil model
├── viz_*.png                              # 16 visualisasi
├── gen_sentimen.py                        # generate CSV sentimen
├── gen_web_data.py                        # generate web/lib/data.ts
├── build_ipynb.py                         # bangun & eksekusi notebook
├── build_dashboard.py                     # bangun dashboard
├── build_slides.py                        # bangun slide deck
├── requirements.txt                       # dependensi Python
└── web/                                   # Next.js 14 app (deploy Vercel)
    ├── app/  components/  lib/
    ├── public/viz/*.png                   # 16 chart di-serve statis
    ├── public/*.ipynb  *.pptx             # bisa didownload dari website
    └── package.json + tailwind + tsconfig
```

---

## Tech Stack

- **Python 3.9+** · pandas · numpy · scikit-learn · matplotlib · seaborn
- **Jupyter** via nbclient + nbformat (auto-execute notebook)
- **python-pptx** untuk slide deck
- **HTML/CSS/JS** vanilla untuk dashboard (self-contained, dark-mode auto)
- **Reproducibility**: `random_state=42` di semua model

---

## Quickstart

```bash
git clone https://github.com/<username>/pemilu2024-analytics.git
cd pemilu2024-analytics
python3 -m pip install --user -r requirements.txt

# Regenerate semua output
python3 gen_sentimen.py
python3 build_ipynb.py
python3 build_dashboard.py
python3 build_slides.py

# Buka hasil
jupyter notebook Analisis_Elektoral_Pemilu_2024.ipynb
open dashboard_elektoral_2024.html
```

---

## Metodologi

1. **Data Loading & Quality Check** — validasi missing/duplikat/dtype.
2. **EDA** — distribusi paslon, partai, demografi.
3. **Analisis Regional** — Jawa-Bali vs Sumatera vs Kalimantan vs Sulawesi vs Papua+.
4. **Battleground Classification** — margin < 15% = battleground.
5. **Correlation Analysis** — 7 fitur sosiodemografi.
6. **Segmentation** — K-Means K=4 + PCA visual + profil deep-dive.
7. **Sentiment Analysis** — 10 topik × 6 bulan.
8. **Predictive Modeling** — Random Forest + Gradient Boosting; target partisipasi.
9. **Seat Simulation** — Sainte-Laguë disederhanakan, 580 kursi.
10. **Coalition Scenarios** — 4 skenario vs threshold capres 20%.
11. **Historical Trend** — 8 partai × 4 pemilu.
12. **Strategic Recommendations** — data-driven, per stakeholder.

---

## Cara Pakai untuk Portfolio

Ikuti [PANDUAN_PORTOFOLIO.md](PANDUAN_PORTOFOLIO.md) — panduan langkah demi langkah:
- **Bagian A**: cara menjalankan
- **Bagian B**: upload ke GitHub + GitHub Pages
- **Bagian C**: menyusun cerita STAR
- **Bagian D**: skrip presentasi 10 menit
- **Bagian E**: persiapan Q&A wawancara
- **Bagian F**: checklist sebelum kirim ke rekruter
- **Bagian G**: cara kembangkan lebih lanjut

---

## Lisensi & Disclaimer

- Kode: MIT
- **Data adalah simulasi** berbasis pola resmi KPU RI & BPS — bukan hasil rekapitulasi resmi. Tidak boleh dijadikan referensi hasil pemilu.

---

## Kontak

Wahyu Surya · wahyuarizeina@gmail.com
