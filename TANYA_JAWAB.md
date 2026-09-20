# Tanya-Jawab Lengkap — Portfolio Analisis Elektoral Pemilu 2024

Panduan referensi menyeluruh: setiap komponen project dijelaskan dari sisi **apa itu**, **fungsinya**, **cara pakai**, dan **jawaban wawancara**. Cocok dibaca sebelum interview / demo.

---

## Daftar Isi

- [1. Overview Project](#1-overview-project)
- [2. Struktur Folder & File](#2-struktur-folder--file)
- [3. Dataset (5 CSV)](#3-dataset-5-csv)
- [4. Deliverable Utama (4 Output)](#4-deliverable-utama-4-output)
- [5. Script Python Builder](#5-script-python-builder)
- [6. Visualisasi (16 PNG)](#6-visualisasi-16-png)
- [7. Model AI / ML / NLP](#7-model-ai--ml--nlp)
- [8. Website Next.js — Tab per Tab](#8-website-nextjs--tab-per-tab)
- [9. Cara Pakai (End-to-End)](#9-cara-pakai-end-to-end)
- [10. Q&A Wawancara](#10-qa-wawancara)
- [11. Troubleshooting](#11-troubleshooting)

---

## 1. Overview Project

### Apa ini?
Portfolio **AI & Data Analyst** yang menganalisis Pemilu 2024 Indonesia dari 5 dataset (38 provinsi, 15 partai, 3 paslon, 10 topik sentimen, tren 4 pemilu).

### Maksudnya apa?
Menunjukkan kemampuan end-to-end:
1. **Data engineering** (loading, cleaning, quality check)
2. **EDA** (statistik deskriptif, korelasi, visualisasi)
3. **AI/ML** (K-Means clustering, Random Forest, Gradient Boosting)
4. **NLP** (analisis sentimen)
5. **Simulasi** (kursi DPR pakai Sainte-Laguë)
6. **Storytelling** (dashboard, slide, laporan, website)

### Kenapa penting?
Rekruter partai politik / lembaga survei / konsultan kampanye butuh analis yang bisa:
- Menerjemahkan data mentah → insight strategis
- Menyajikan hasil di format multi-audience (technical + eksekutif)
- Reproducible (kode + dokumentasi jelas)

### Bagaimana dipakai?
Dibawa ke interview sebagai portfolio: link GitHub + link website Vercel + slide deck di laptop.

---

## 2. Struktur Folder & File

```
portfolio-elektoral/
│
├── DATASET (5 file, ~35 KB)
│   ├── data_suara_partai_per_provinsi.csv
│   ├── data_pilpres_per_provinsi.csv
│   ├── data_demografi_provinsi.csv
│   ├── data_sentimen_politik.csv
│   └── data_historis_partai.csv
│
├── DELIVERABLE UTAMA
│   ├── Analisis_Elektoral_Pemilu_2024.ipynb  (notebook Jupyter, 19 bagian)
│   ├── dashboard_elektoral_2024.html         (dashboard HTML self-contained)
│   ├── Slides_Elektoral_2024.pptx            (slide deck 14 halaman)
│   └── web/                                  (website Next.js 14, siap Vercel)
│
├── DOKUMEN
│   ├── README.md                (landing repo GitHub)
│   ├── INSIGHTS.md              (laporan analis mendalam)
│   ├── PANDUAN_PORTOFOLIO.md    (panduan A-G presentasi)
│   ├── TANYA_JAWAB.md           (dokumen ini)
│   └── requirements.txt         (dependensi Python)
│
├── SCRIPT BUILDER
│   ├── gen_sentimen.py          (generate CSV sentimen)
│   ├── gen_web_data.py          (generate data TypeScript untuk web)
│   ├── build_ipynb.py           (bangun & eksekusi notebook)
│   ├── build_dashboard.py       (bangun dashboard HTML)
│   └── build_slides.py          (bangun slide PPTX)
│
├── OUTPUT ANTARA
│   ├── metrik.json              (KPI + skor model)
│   └── viz_*.png                (16 visualisasi)
│
└── .gitignore
```

---

## 3. Dataset (5 CSV)

### 3.1 `data_suara_partai_per_provinsi.csv`

**Apa:** Perolehan suara 15 partai politik peserta Pileg 2024 di 38 provinsi.

**Maksudnya:** Basis analisis peta kekuatan partai — untuk tahu partai mana kuat di provinsi mana.

**Kolom:**
| Kolom | Tipe | Arti |
|---|---|---|
| `provinsi` | string | Nama provinsi (38 nilai) |
| `partai` | string | Nama partai (15 nilai) |
| `persentase_suara` | float | % suara di provinsi tsb |
| `jumlah_suara` | int | Total suara absolut |
| `total_suara_sah` | int | Total suara sah provinsi |

**Dimensi:** 570 baris (38 × 15) × 5 kolom.

**Cara pakai:**
```python
import pandas as pd
df = pd.read_csv("data_suara_partai_per_provinsi.csv")

# Agregasi nasional per partai
nasional = df.groupby("partai")["jumlah_suara"].sum().sort_values(ascending=False)

# Pivot untuk heatmap
peta = df.pivot(index="provinsi", columns="partai", values="persentase_suara")
```

---

### 3.2 `data_pilpres_per_provinsi.csv`

**Apa:** Hasil Pilpres 2024 per provinsi × 3 paslon (Anies-Cak Imin, Prabowo-Gibran, Ganjar-Mahfud).

**Maksudnya:** Basis analisis pemenang Pilpres — memetakan basis dukungan tiap paslon.

**Kolom sama seperti #3.1** tapi `partai` diganti `paslon`.

**Dimensi:** 114 baris (38 × 3).

**Cara pakai:**
```python
df = pd.read_csv("data_pilpres_per_provinsi.csv")

# Pemenang tiap provinsi
pivot = df.pivot(index="provinsi", columns="paslon", values="persentase_suara")
pemenang = pivot.idxmax(axis=1)
margin = pivot.max(axis=1) - pivot.apply(lambda r: r.drop(r.idxmax()).max(), axis=1)
```

---

### 3.3 `data_demografi_provinsi.csv`

**Apa:** Profil demografi + sosioekonomi 38 provinsi.

**Maksudnya:** Fitur input untuk clustering dan model prediktif partisipasi.

**Kolom:**
| Kolom | Arti |
|---|---|
| `populasi` | Total penduduk |
| `dpt` | Daftar Pemilih Tetap |
| `tingkat_partisipasi` | Rasio partisipasi (0–1) |
| `urbanisasi_pct` | % penduduk urban |
| `gen_z_pct` / `milenial_pct` / `gen_x_pct` / `boomer_plus_pct` | % per generasi |
| `ipm` | Indeks Pembangunan Manusia |
| `tingkat_kemiskinan` | % penduduk miskin |
| `penetrasi_internet_pct` | % pengguna internet |

**Dimensi:** 38 baris × 12 kolom.

**Cara pakai:**
```python
df = pd.read_csv("data_demografi_provinsi.csv")

# Korelasi dengan partisipasi
corr = df[["tingkat_partisipasi","urbanisasi_pct","ipm","penetrasi_internet_pct"]].corr()
```

---

### 3.4 `data_sentimen_politik.csv`

**Apa:** Distribusi sentimen publik untuk 10 topik politik × 6 bulan (Jan–Jun 2024).

**Maksudnya:** Basis analisis sentimen — mana isu populer, mana isu berbahaya.

**Kolom:**
| Kolom | Arti |
|---|---|
| `topik` | 1 dari 10 topik (Pilpres, Korupsi, Bansos, dst.) |
| `bulan` / `bulan_num` | Nama & nomor bulan |
| `positif_pct` / `netral_pct` / `negatif_pct` | Distribusi sentimen (%) |
| `volume_percakapan` | Jumlah mentions/percakapan |

**Dimensi:** 60 baris (10 × 6).

**Catatan:** Data ini **simulasi** berbasis pola percakapan media sosial. Untuk production pakai IndoBERT (lihat bagian 7.5).

**Cara pakai:**
```python
df = pd.read_csv("data_sentimen_politik.csv")

# Sentimen rata-rata per topik
rata = df.groupby("topik")[["positif_pct","netral_pct","negatif_pct"]].mean()

# Tren nasional bulanan
tren = df.groupby("bulan_num")[["positif_pct","negatif_pct"]].mean()
```

---

### 3.5 `data_historis_partai.csv`

**Apa:** Perolehan suara nasional 8 partai utama lintas 4 pemilu (2009, 2014, 2019, 2024).

**Maksudnya:** Basis analisis tren — melihat partai naik/turun sepanjang 15 tahun.

**Kolom:** `partai`, `tahun_pemilu`, `persentase_suara`.

**Dimensi:** 32 baris (8 × 4).

**Cara pakai:**
```python
df = pd.read_csv("data_historis_partai.csv")

# Perubahan 2009 vs 2024
pivot = df.pivot(index="partai", columns="tahun_pemilu", values="persentase_suara")
pivot["delta"] = pivot[2024] - pivot[2009]
```

---

## 4. Deliverable Utama (4 Output)

### 4.1 `Analisis_Elektoral_Pemilu_2024.ipynb` — Notebook Jupyter

**Apa:** Notebook Python 19 bagian, sudah dieksekusi lengkap (output visible).

**Maksudnya:** Bukti reproducibility — semua analisis bisa direplikasi, kode transparan.

**Isi 19 bagian:**
1. Import & Data Loading
2. Data Quality Check
3. Analisis Pilpres
4. Analisis Partai Nasional
5. Heatmap Partai per Provinsi
6. Analisis Partisipasi Pemilih
7. Korelasi Faktor Sosiodemografi
8. Analisis Pemilih Muda
9. Analisis Sentimen Publik
10. K-Means Clustering Provinsi
11. Tren Historis Partai
12. Model Prediktif — Feature Importance
13. Model Prediktif — Akurasi
14. Analisis Regional
15. Battleground vs Safe Seat
16. Cluster Profile Deep Dive
17. Simulasi Kursi DPR (Sainte-Laguë)
18. Skenario Koalisi
19. Rekomendasi Strategis

**Cara pakai:**
```bash
pip install jupyter
jupyter notebook Analisis_Elektoral_Pemilu_2024.ipynb
```

Atau buka di **VS Code** (extension Jupyter) — lebih ringan.

Atau buka **di GitHub** langsung — GitHub render `.ipynb` otomatis.

**Kapan dipakai:**
- Interview technical: buka & scroll bagian yang ditanya
- Untuk audit reviewer: mereka bisa cek setiap cell

---

### 4.2 `dashboard_elektoral_2024.html` — Dashboard Statis

**Apa:** Dashboard interaktif 1-file HTML (3 MB, semua PNG di-embed base64).

**Maksudnya:** Portable — bisa dibuka offline tanpa server, tanpa dependensi.

**Fitur:**
- 12 tab (Ringkasan Eksekutif, Pilpres, Peta Partai, Battleground, dst.)
- 4 KPI card di header
- 6 insight card di tab pertama
- Tabel provinsi bisa di-sort (klik header)
- Dark mode otomatis (ikut tema OS)
- Responsive (mobile-friendly)

**Cara pakai:**
```bash
open dashboard_elektoral_2024.html          # macOS
xdg-open dashboard_elektoral_2024.html      # Linux
start dashboard_elektoral_2024.html         # Windows
```

Atau upload ke GitHub Pages → hasilnya live URL (lihat PANDUAN_PORTOFOLIO.md § B.3).

**Kapan dipakai:**
- Demo cepat di laptop tanpa internet
- Kirim via email/chat sebagai attachment tunggal

---

### 4.3 `Slides_Elektoral_2024.pptx` — Slide Deck

**Apa:** Presentasi PowerPoint 14 halaman (16:9, ~1.3 MB).

**Maksudnya:** Alat presentasi resmi di depan panel wawancara.

**Struktur:**
| Slide | Isi |
|---|---|
| 1 | Cover |
| 2 | Latar Belakang |
| 3 | Metodologi (pipeline 5 step) |
| 4 | Hasil Pilpres |
| 5 | Peta Perolehan Partai |
| 6 | Battleground vs Safe Seat |
| 7 | Partisipasi & Pemilih Muda |
| 8 | Segmentasi 4 Cluster |
| 9 | Sentimen Publik |
| 10 | Model Prediktif ML |
| 11 | Estimasi Kursi DPR & Koalisi |
| 12 | Tren Historis 2009–2024 |
| 13 | Rekomendasi Strategis |
| 14 | Terima Kasih (kontak) |

**Cara pakai:**
- PowerPoint / Keynote / LibreOffice Impress
- Atau upload ke Google Slides → File → Import
- Atau upload ke Canva → import PPTX

**Kapan dipakai:**
- Presentasi resmi 10 menit di depan interviewer
- Video pitching untuk aplikasi remote

---

### 4.4 `web/` — Website Next.js

**Apa:** Web app Next.js 14 + Tailwind + TypeScript, siap deploy Vercel.

**Maksudnya:** Bukti kemampuan full-stack ringan — analis modern tidak cuma bikin Excel.

**Struktur:**
```
web/
├── app/page.tsx           # halaman utama
├── components/            # Tabs, DataTable, DatasetPanel, MetodologiPanel
├── lib/                   # data.ts (auto-gen), datasets.ts, metodologi.ts
├── public/
│   ├── viz/*.png          # 16 chart
│   ├── data/*.csv         # 5 dataset downloadable
│   └── *.ipynb / *.pptx   # notebook & slide bisa didownload
└── package.json
```

**14 tab website:**
1. Ringkasan Eksekutif
2. Pilpres
3. Peta Partai
4. Battleground
5. Regional
6. Demografi
7. Clustering
8. Sentimen
9. ML Model
10. Kursi & Koalisi
11. Historis
12. Dataset (baru — semua CSV downloadable)
13. Metodologi AI (baru — detail 6 model)
14. Data Provinsi (tabel sortable + search)

**Cara pakai lokal:**
```bash
cd web
npm install
npm run dev
# buka http://localhost:3000
```

**Cara deploy Vercel:**
1. Vercel.com/new → Import repo GitHub
2. **Root Directory:** `web` (wajib)
3. Framework: Next.js (auto-detect)
4. Deploy

---

## 5. Script Python Builder

Semua script bersifat **idempotent** — bisa dijalankan berulang tanpa merusak state.

### 5.1 `gen_sentimen.py`
**Apa:** Generate `data_sentimen_politik.csv` (karena file ini simulasi, dibangkitkan pakai `random_state=42`).

**Kapan dijalankan:** Pertama kali setup, atau kalau mau regenerate dengan seed berbeda.

```bash
python3 gen_sentimen.py
```

### 5.2 `build_ipynb.py`
**Apa:** Bangun notebook `.ipynb` dari template + eksekusi via `nbclient` + save PNG viz.

**Kapan dijalankan:** Setelah CSV diupdate — regenerate notebook + 16 PNG + metrik.json.

```bash
python3 build_ipynb.py
```

### 5.3 `build_dashboard.py`
**Apa:** Baca `metrik.json` + semua `viz_*.png` → generate `dashboard_elektoral_2024.html` (base64 embed).

**Kapan dijalankan:** Setelah PNG berubah.

```bash
python3 build_dashboard.py
```

### 5.4 `build_slides.py`
**Apa:** Bangun `Slides_Elektoral_2024.pptx` pakai `python-pptx`.

**Kapan dijalankan:** Setelah PNG berubah atau desain slide diubah.

```bash
python3 build_slides.py
```

### 5.5 `gen_web_data.py`
**Apa:** Konversi CSV → TypeScript file (`web/lib/data.ts`) supaya website bisa import langsung.

**Kapan dijalankan:** Setelah CSV berubah, sebelum build website.

```bash
python3 gen_web_data.py
```

**Full pipeline dari nol:**
```bash
python3 gen_sentimen.py         # 1. Buat sentimen CSV
python3 build_ipynb.py          # 2. Notebook + 16 PNG
python3 build_dashboard.py      # 3. Dashboard HTML
python3 build_slides.py         # 4. Slide PPTX
python3 gen_web_data.py         # 5. Data untuk web
cd web && npm run build         # 6. Build web
```

---

## 6. Visualisasi (16 PNG)

Setiap PNG punya "insight utama" — kalimat pembuka saat menjelaskan chart.

| File | Ditampilkan | Insight utama |
|---|---|---|
| `viz_pilpres.png` | Bar horizontal 3 paslon | "Prabowo-Gibran menang 58% nasional" |
| `viz_partai_nasional.png` | Bar 15 partai + garis 4% | "9 partai lolos threshold" |
| `viz_heatmap_partai.png` | Heatmap 8 partai × 38 provinsi | "Setiap partai punya kandang regional" |
| `viz_partisipasi.png` | Scatter 2 subplot (urbanisasi & internet vs partisipasi) | "Internet & urbanisasi berkorelasi positif" |
| `viz_korelasi.png` | Correlation matrix 7 fitur | "Kemiskinan −0.58 vs partisipasi" |
| `viz_pemilih_muda.png` | Stacked bar Gen Z + Milenial per provinsi | "Rata-rata 54% populasi muda" |
| `viz_sentimen.png` | 2 subplot (stacked per topik + tren nasional) | "Korupsi & harga pangan dominan negatif" |
| `viz_clustering.png` | Scatter PCA 4 cluster | "Segmen Urban Progressive di kanan atas" |
| `viz_cluster_profile.png` | Heatmap profil rata-rata cluster | "Karakter jelas per segmen" |
| `viz_historis.png` | Line chart 8 partai × 4 pemilu | "Demokrat turun 66%, Gerindra naik 3x" |
| `viz_feature_importance.png` | Bar RF vs GB | "Internet fitur #1 (~0.35)" |
| `viz_prediction.png` | Scatter actual vs predicted | "R² 0.585 — model layak baseline" |
| `viz_regional.png` | 2 stacked bar (paslon & partai per region) | "Jawa-Bali 60% suara nasional" |
| `viz_battleground.png` | Bar horizontal margin per provinsi | "5 provinsi margin < 15%" |
| `viz_kursi_dpr.png` | Bar estimasi kursi | "PDIP 99, Golkar 91, Gerindra 79" |
| `viz_koalisi.png` | Bar horizontal 4 skenario vs threshold 20% | "Semua skenario koalisi wajar lolos" |

**Cara pakai di presentasi:**
Buka slide/dashboard, tunjuk chart, mulai dengan kalimat insight di atas.

---

## 7. Model AI / ML / NLP

### 7.1 K-Means Clustering
**Apa:** Algoritma unsupervised learning yang mengelompokkan data ke K cluster berdasarkan kemiripan.

**Kenapa dipilih:** Simple, cepat, interpretable — cocok untuk dataset kecil (38 provinsi).

**Cara kerja singkat:**
1. Standardize 4 fitur (urbanisasi, internet, partisipasi, IPM) via `StandardScaler`
2. Inisialisasi 4 centroid random (`n_init=20` untuk pilih terbaik)
3. Iterasi: assign titik ke centroid terdekat → update centroid → ulangi sampai konvergen
4. Output: label 0-3 tiap provinsi

**Output:** 4 segmen provinsi (Urban Progressive, Rural Traditional, Swing Moderate, Emerging Region).

**Kenapa K=4:** Interpretasi politis paling jelas. K=3 terlalu kasar, K=5+ overlap.

---

### 7.2 Random Forest
**Apa:** Ensemble 300 decision tree yang di-train pada subset data acak → voting hasil.

**Kenapa dipilih:** Robust, tidak butuh feature scaling, kasih feature importance.

**Cara kerja singkat:**
1. Bootstrap 300 sample dari data training
2. Latih 1 decision tree per sample (dengan random feature selection)
3. Prediksi: rata-rata prediksi 300 tree

**Output:** Prediksi partisipasi provinsi + ranking fitur paling penting.

**Metrik:** R² 0.537, MAE 2.90%.

---

### 7.3 Gradient Boosting
**Apa:** Ensemble 300 tree yang di-train **sequential** — setiap tree memperbaiki error tree sebelumnya.

**Kenapa dipilih:** Biasanya sedikit lebih akurat dari RF pada dataset kecil.

**Cara kerja singkat:**
1. Latih tree #1 pada data → hitung residual
2. Latih tree #2 pada residual tree #1
3. Ulangi 300x, kombinasi weighted sum

**Output:** Prediksi partisipasi (sedikit lebih akurat).

**Metrik:** R² 0.585, MAE 2.64% (**best model**).

---

### 7.4 PCA (Principal Component Analysis)
**Apa:** Dimensionality reduction — proyeksikan data high-dimensional ke lebih rendah dengan mempertahankan variansi.

**Kenapa dipilih:** Hanya untuk **visualisasi** — clustering 4D susah digambar, PCA 2D bisa di-scatter.

**Cara kerja singkat:** Cari 2 axis baru (PC1, PC2) yang paling banyak menangkap variansi data.

**Output:** Koordinat 2D per provinsi (input untuk scatter plot cluster).

---

### 7.5 Sentimen NLP (Rekomendasi Production)
**Apa:** Klasifikasi teks jadi 3 kategori (positif/netral/negatif) untuk isu politik.

**Kenapa dipilih:** Data yang diship = simulasi. Untuk production disarankan:
- Model: **IndoBERT** (`mdhugol/indonesia-bert-sentiment-classification`) atau RoBERTa-Indonesia
- F1 score > 85% untuk 3-class
- Alternatif ringan: lexicon-based (InSet) — F1 ~70%

**Cara kerja IndoBERT:**
1. Tokenisasi teks (BERT tokenizer bahasa Indonesia)
2. Encoding 768-dim vector per token
3. Fine-tuned classification head → 3 kelas

**Kode contoh** ada di tab Metodologi website.

---

### 7.6 Sainte-Laguë (Simulasi Kursi)
**Apa:** Metode proporsional untuk alokasi kursi parlemen — standar Indonesia sejak 2019.

**Kenapa dipilih:** Fair untuk partai menengah, mengurangi bias pro-partai besar.

**Cara kerja singkat:**
1. Setiap partai punya suara awal & 0 kursi
2. Loop 580 kali (jumlah kursi):
   - Untuk tiap partai, hitung `quotient = suara / (2*kursi_saat_ini + 1)`
   - Partai dengan quotient tertinggi dapat 1 kursi
3. Output: distribusi kursi per partai

**Divisor:** 1, 3, 5, 7, 9, ... (bilangan ganjil).

**Simplifikasi:** Kode ini pakai 1 dapil nasional. Kenyataannya KPU pakai per-dapil (angka bisa beda ±20 kursi/partai).

---

## 8. Website Next.js — Tab per Tab

### Tab 1: Ringkasan Eksekutif
**Isi:** 6 insight card + 3 rekomendasi strategis.
**Untuk siapa:** Eksekutif / decision-maker yang cuma punya 30 detik.

### Tab 2: Pilpres
**Isi:** 3 mini-card (Prabowo/Anies/Ganjar) + chart bar horizontal.
**Insight:** Prabowo menang mayoritas di 33 dari 38 provinsi.

### Tab 3: Peta Partai
**Isi:** Bar chart 15 partai + heatmap 8 partai × 38 provinsi.
**Insight:** 9 partai lolos threshold; PDIP dominan Bali & Jateng.

### Tab 4: Battleground
**Isi:** Bar horizontal margin per provinsi (merah = battleground).
**Insight:** 5 provinsi margin < 15% adalah target ROI tertinggi.

### Tab 5: Regional
**Isi:** 2 stacked bar (paslon + partai per 5 region).
**Insight:** Jawa-Bali menguasai 60% suara nasional.

### Tab 6: Demografi
**Isi:** 3 chart (partisipasi vs faktor + korelasi + pemilih muda).
**Insight:** Internet ↔ partisipasi r=+0.45; Gen Z + Milenial > 54% populasi.

### Tab 7: Clustering
**Isi:** Scatter PCA 4 warna cluster + heatmap profil cluster.
**Insight:** 4 segmen unik — strategi kampanye wajib disesuaikan.

### Tab 8: Sentimen
**Isi:** 2 subplot (per topik + tren bulanan).
**Insight:** Korupsi & harga pangan dominan negatif.

### Tab 9: ML Model
**Isi:** 2 mini-metric (RF, GB) + 2 chart (feature importance + actual vs predicted).
**Insight:** GB R² 0.585 · penetrasi internet fitur #1.

### Tab 10: Kursi & Koalisi
**Isi:** Chart estimasi kursi DPR + chart 4 skenario koalisi.
**Insight:** Semua skenario koalisi wajar lolos threshold 20%.

### Tab 11: Historis
**Isi:** Line chart 8 partai × 4 pemilu.
**Insight:** Demokrat −66%, Gerindra +200% dalam 15 tahun.

### Tab 12: Dataset (baru)
**Isi:** 5 kartu dataset expandable. Tiap kartu:
- Tombol Download CSV & Preview
- Tabel kolom (nama, tipe, keterangan)
- Contoh 3 baris pertama
- Sumber data
- Snippet Python untuk load langsung dari GitHub raw

**Untuk siapa:** Analis lain yang mau riset lanjutan.

### Tab 13: Metodologi AI (baru)
**Isi:** 6 kartu model expandable. Tiap kartu:
- Kategori (AI/ML, NLP, Statistik, Simulasi) + library
- Tujuan
- Input & Output
- Tabel hyperparameters
- Metrik hasil + interpretasi
- Kode Python lengkap
- Link referensi library

**Untuk siapa:** Reviewer technical yang mau audit metodologi.

### Tab 14: Data Provinsi
**Isi:** Tabel 38 provinsi × 9 kolom. Bisa di-sort (klik header) & di-search.
**Untuk siapa:** User yang mau eksplorasi manual data.

---

## 9. Cara Pakai (End-to-End)

### Skenario A: Baru clone dari GitHub
```bash
git clone https://github.com/wahyuarizeina/Analisis-Data-Elektoral-Pemilu-2024-Indonesia.git
cd Analisis-Data-Elektoral-Pemilu-2024-Indonesia

# 1. Install dependensi Python
python3 -m pip install --user -r requirements.txt

# 2. Buka notebook (opsional)
jupyter notebook Analisis_Elektoral_Pemilu_2024.ipynb

# 3. Buka dashboard (langsung)
open dashboard_elektoral_2024.html

# 4. Jalankan website lokal
cd web
npm install
npm run dev
# buka http://localhost:3000
```

### Skenario B: Data CSV diupdate
```bash
python3 build_ipynb.py       # regenerate notebook + 16 PNG + metrik
python3 build_dashboard.py   # regenerate dashboard
python3 build_slides.py      # regenerate slide
python3 gen_web_data.py      # regenerate data web

cd web && npm run build      # verifikasi build web

git add . && git commit -m "chore: update data" && git push
# Vercel auto redeploy
```

### Skenario C: Deploy website Vercel pertama kali
1. Buka https://vercel.com/new
2. Import repo `Analisis-Data-Elektoral-Pemilu-2024-Indonesia`
3. **Root Directory:** `web`
4. Framework Preset: **Next.js** (auto-detect)
5. Deploy → tunggu 1-2 menit
6. Site live di URL yang di-generate Vercel

### Skenario D: Update tampilan website
```bash
cd web
# Edit file di app/ atau components/
npm run dev              # test lokal
npm run build            # pastikan build OK
git add . && git commit -m "feat: update UI" && git push
# Vercel auto redeploy
```

---

## 10. Q&A Wawancara

### 10.1 Pertanyaan Overview

**Q: "Ceritakan tentang project ini singkat."**
> A: "Portfolio analisis end-to-end Pemilu 2024. Dari 5 dataset saya lakukan EDA, segmentasi K-Means jadi 4 cluster provinsi, model prediksi partisipasi pakai Random Forest & Gradient Boosting dengan R² 0.585, plus simulasi kursi DPR pakai Sainte-Laguë. Output: notebook Jupyter 19 bagian, dashboard HTML interaktif, slide deck 14 halaman, dan website Next.js yang deployed di Vercel. Semua reproducible via 5 script Python."

**Q: "Kenapa topik ini?"**
> A: "Karena melamar posisi AI & Data Analyst di partai politik. Project ini mensimulasikan pekerjaan riil: analisis data pemilu, segmentasi voter, model prediktif, dan rekomendasi kampanye. Sekaligus latihan sesuai kebutuhan calon employer."

**Q: "Berapa lama pengerjaan?"**
> A: (Jujur sesuai timeline Anda) "Setup dataset & EDA ~1 hari, modeling & clustering ~1 hari, dashboard + slide + website ~2 hari. Total ~4 hari full-time."

---

### 10.2 Pertanyaan Data & EDA

**Q: "Datanya dari mana?"**
> A: "Simulasi berbasis pola resmi KPU RI dan BPS. Yang saya jual bukan angka absolutnya, tapi metodologi & pipeline — bisa langsung swap dengan data KPU asli saat production. Rasio antar provinsi & proporsi partai sudah realistis."

**Q: "Ada data yang missing/dirty?"**
> A: "Data quality check di bagian 2 notebook menunjukkan 0 missing value dan 0 duplikat — karena data terstruktur dari simulasi. Di production dengan data mentah KPU, langkah pertama pasti cleaning yang lebih intensif."

**Q: "Kenapa 5 dataset, kenapa tidak digabung?"**
> A: "Sengaja dipisah untuk normalisasi. Kalau digabung jadi wide-table 38 baris × 30+ kolom yang sulit di-maintain. Long-format lebih fleksibel untuk pivot & join sesuai kebutuhan analisis."

---

### 10.3 Pertanyaan AI / ML

**Q: "Kenapa K-Means, bukan DBSCAN atau hierarchical?"**
> A: "K-Means paling interpretable untuk 38 titik dengan K=4. DBSCAN sensitif ke `eps` — susah tuning di dataset kecil. Hierarchical bagus untuk visualisasi dendrogram tapi bikin overhead tanpa nilai tambah untuk segmentasi politik."

**Q: "Kenapa K=4?"**
> A: "Kombinasi 3 kriteria: (1) interpretabilitas politis — 4 segmen yang bisa diberi nama jelas (Urban Progressive, Rural Traditional, Swing Moderate, Emerging Region), (2) balance ukuran cluster, (3) selaras dengan pembagian regional Indonesia yang praktis. Untuk validasi formal, bisa tambah silhouette score & elbow method."

**Q: "R² 0.585 bisa dipakai?"**
> A: "Untuk 38 sampel dengan 6 fitur, R² 0.585 sudah cukup baik sebagai baseline, tapi belum production-grade. Improvement path: (1) tambah fitur historis partisipasi pemilu sebelumnya, (2) train per region dengan hierarchical model, (3) time-series jika ada data multi-pemilu, (4) cross-validation lebih ketat dengan k-fold."

**Q: "Kenapa Random Forest + Gradient Boosting, bukan XGBoost/Neural Net?"**
> A: "Dataset kecil (38 baris). RF & GB adalah baseline standar yang cukup dan sudah include di sklearn — tidak butuh dependensi ekstra. XGBoost/LightGBM butuh tuning ekstensif dan risk overfit di data kecil. Neural network butuh 1000+ sampel untuk beneran shine. Prinsip: cocokkan kompleksitas model dengan ukuran data."

**Q: "Feature importance mana yang penting?"**
> A: "Penetrasi internet #1 (~0.35), IPM #2 (~0.25), urbanisasi #3 (~0.18). Interpretasinya: aksesibilitas informasi lebih menentukan partisipasi dibanding demografi usia semata. Ini punya implikasi bisnis: partai harus invest ke kanal digital di provinsi rendah internet untuk boost turnout."

---

### 10.4 Pertanyaan Sentimen / NLP

**Q: "Bagaimana kamu analisis sentimen?"**
> A: "Untuk project ini datanya simulasi baseline. Untuk production disarankan pakai IndoBERT — model BERT fine-tuned untuk sentiment Indonesia, F1 > 85%. Alternatif ringan pakai lexicon-based InSet (F1 ~70%). Kode contoh untuk keduanya ada di tab Metodologi website."

**Q: "Kenapa 10 topik ini?"**
> A: "Kombinasi topik pemilu (Pilpres, Pileg, Kabinet), isu ekonomi rakyat (Harga Pangan, Ekonomi, Bansos), infrastruktur (IKN), dan sektor pemerintahan (Pendidikan, Kesehatan, Korupsi). Cover semua dimensi yang biasa dominan di percakapan publik."

**Q: "Bagaimana handle bahasa gaul / slang?"**
> A: "Untuk production wajib pakai normalisasi Kamus Baku Bahasa Indonesia (kbba). Slang seperti 'gw', 'lu', 'wkwk' harus di-map ke bentuk baku dulu sebelum masuk model. IndoBERT juga sudah cukup robust ke variasi bahasa karena dilatih di data Twitter Indonesia."

---

### 10.5 Pertanyaan Simulasi Kursi

**Q: "Kenapa Sainte-Laguë?"**
> A: "Metode resmi Indonesia sejak Pemilu 2019 (diatur di UU Pemilu). Fair untuk partai menengah — divisor ganjil (1,3,5,...) mengurangi bias pro-partai besar dibanding metode d'Hondt (divisor 1,2,3,...)."

**Q: "Kenapa simplifikasi ke 1 dapil nasional?"**
> A: "Realitasnya KPU membagi 84 dapil dengan BPP (Bilangan Pembagi Pemilih) per-dapil. Untuk simulasi portfolio, cukup nasional untuk demonstrasikan mekanisme. Improvement: bikin simulasi per-dapil yang butuh data suara per dapil (yang belum saya include)."

---

### 10.6 Pertanyaan Delivery & Presentasi

**Q: "Kenapa 4 output (notebook + dashboard + slide + web)?"**
> A: "Multi-audience. Notebook untuk reviewer technical yang mau audit kode. Dashboard HTML untuk portable demo offline. Slide untuk presentasi resmi 10 menit. Website untuk showcase publik yang selalu up-to-date via Vercel."

**Q: "Kenapa Next.js untuk website, bukan Streamlit/Dash?"**
> A: "Streamlit/Dash bagus untuk internal tool tapi kurang polished untuk portfolio public. Next.js kasih kontrol UI penuh, SEO friendly, static export cepat, dan gratis deploy di Vercel. Sekaligus jadi bukti kemampuan modern web development."

**Q: "Kenapa dashboard HTML self-contained (base64 PNG)?"**
> A: "Portable — bisa dibuka offline, cukup 1 file untuk share via email/chat. Trade-off: file jadi 3 MB (masih wajar). Alternatif eksternalisasi PNG bikin ribet distribusi."

---

### 10.7 Pertanyaan Ekstensi

**Q: "Kalau saya jadi partai X, apa first step-mu?"**
> A: "1. Validasi cluster dengan data survey internal partai. 2. A/B test pesan kampanye di 5 provinsi battleground (Aceh, Sumbar, Jateng, DIY, Bali). 3. Build dashboard realtime untuk minggu terakhir kampanye — command center wajib."

**Q: "Data apa yang paling ingin ditambah?"**
> A: "Tiga hal: (1) sentimen per-provinsi (bukan hanya nasional), (2) belanja kampanye per partai (untuk hitung ROI), (3) eksit poll granular per dapil."

**Q: "Bagaimana kalau data-nya real-time?"**
> A: "Migrasi dashboard ke Streamlit atau Retool dengan koneksi ke database (Postgres/BigQuery). Setup ETL harian dari data survey. Untuk sentimen real-time: streaming Twitter/X API + IndoBERT inference batch tiap 1 jam."

---

## 11. Troubleshooting

### Notebook error saat dieksekusi
```bash
# Cek dependensi
python3 -m pip install --user -r requirements.txt

# Jalankan ulang
python3 build_ipynb.py
```

### Website `npm install` gagal
```bash
cd web
rm -rf node_modules package-lock.json
npm install
```

### Vercel build failed
Cek log build di Vercel dashboard. Umumnya:
- **Root Directory** salah — pastikan `web`, bukan root repo
- Import path salah setelah edit — cek `@/` alias di `tsconfig.json`

### Chart tidak muncul di website
Pastikan PNG ada di `web/public/viz/`. Copy ulang:
```bash
cp viz_*.png web/public/viz/
```

### CSV tidak bisa didownload dari website
Pastikan ada di `web/public/data/`:
```bash
cp *.csv metrik.json web/public/data/
```

### Data CSV berubah tapi website tidak update
```bash
python3 gen_web_data.py    # regenerate lib/data.ts
cd web && npm run build    # rebuild
git add . && git commit -m "chore: refresh data" && git push
```

---

## 12. Ringkasan Command Cheat Sheet

| Kebutuhan | Command |
|---|---|
| Install dependensi Python | `pip install --user -r requirements.txt` |
| Regenerate semua notebook + viz | `python3 build_ipynb.py` |
| Regenerate dashboard | `python3 build_dashboard.py` |
| Regenerate slide | `python3 build_slides.py` |
| Refresh data web | `python3 gen_web_data.py` |
| Website dev mode | `cd web && npm run dev` |
| Website build | `cd web && npm run build` |
| Commit + push | `git add . && git commit -m "..." && git push` |
| Buka notebook | `jupyter notebook Analisis_Elektoral_Pemilu_2024.ipynb` |
| Buka dashboard | `open dashboard_elektoral_2024.html` |

---

*Dokumen ini disusun sebagai referensi cepat menjawab pertanyaan tentang project. Update seiring evolusi project.*

*Wahyu Surya · 2024*
