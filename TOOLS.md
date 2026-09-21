# Tools & Library — Yang Dipakai + Cara Kerjanya

Daftar lengkap semua tools, library, dan platform yang dipakai di project ini. Setiap entri: **apa itu · fungsi di project · cara kerja singkat · versi**.

---

## Daftar Isi

- [1. Python — Bahasa Utama](#1-python--bahasa-utama)
- [2. Data Science Libraries](#2-data-science-libraries)
- [3. Machine Learning — scikit-learn](#3-machine-learning--scikit-learn)
- [4. Visualisasi — Matplotlib & Seaborn](#4-visualisasi--matplotlib--seaborn)
- [5. Notebook — Jupyter](#5-notebook--jupyter)
- [6. Slide Deck — python-pptx](#6-slide-deck--python-pptx)
- [7. Web Frontend — Next.js Stack](#7-web-frontend--nextjs-stack)
- [8. Deployment — Vercel & GitHub](#8-deployment--vercel--github)
- [9. Developer Tools](#9-developer-tools)
- [10. Rangkuman Versi](#10-rangkuman-versi)

---

## 1. Python — Bahasa Utama

### Python 3.9+
**Apa:** Bahasa pemrograman interpreter, general-purpose. De facto standar untuk data science & AI.

**Fungsi di project:** Semua analisis, model ML, generate dashboard/slide/data web.

**Cara kerja:**
- Kode `.py` dijalankan oleh interpreter (`python3 script.py`)
- Package dikelola via `pip` (`pip install nama-package`)
- Dependencies dicatat di `requirements.txt`

**Alternatif:** R (untuk statistik pure), Julia (untuk high-perf). Python menang di ekosistem AI.

**Kenapa dipilih:** Library ML terlengkap + community terbesar.

---

## 2. Data Science Libraries

### pandas (>= 2.0)
**Apa:** Library manipulasi data tabular (DataFrame + Series).

**Fungsi di project:**
- Baca 5 CSV (`pd.read_csv`)
- Agregasi (`groupby`, `pivot`, `merge`)
- Filter, sort, transformasi kolom

**Cara kerja:**
- DataFrame = tabel 2D dengan label baris & kolom
- Backend memakai NumPy array + hash index → operasi vectorized (cepat)
- Chained methods: `df.groupby("provinsi").sum().sort_values(...)`

**Contoh di project:**
```python
df = pd.read_csv("data_pilpres_per_provinsi.csv")
pivot = df.pivot(index="provinsi", columns="paslon", values="persentase_suara")
pemenang = pivot.idxmax(axis=1)
```

**Referensi:** https://pandas.pydata.org/

---

### NumPy (>= 1.24)
**Apa:** Library numerik dasar Python — array N-dimensi + operasi vectorized.

**Fungsi di project:**
- Backend pandas & scikit-learn (dipakai tidak langsung sebagian besar)
- `np.random.seed(42)` untuk reproducibility
- Konversi array ↔ list

**Cara kerja:**
- `ndarray` disimpan sebagai contiguous memory C-style → super cepat
- Operasi element-wise otomatis (broadcasting)
- Tidak ada Python loop → 10-100x lebih cepat dari list Python

**Contoh:**
```python
import numpy as np
np.random.seed(42)                          # reproducibility
X = df[fitur].values                        # DataFrame → NumPy array
X_scaled = (X - X.mean(0)) / X.std(0)       # standardisasi vectorized
```

**Referensi:** https://numpy.org/

---

## 3. Machine Learning — scikit-learn

### scikit-learn (>= 1.3)
**Apa:** Library ML standar Python. Konsisten API: `.fit()` → `.predict()` → `.score()`.

**Fungsi di project:** Semua model ML dan preprocessing.

**Modul yang dipakai:**

#### 3.1 `sklearn.preprocessing.StandardScaler`
**Apa:** Normalisasi Z-score (kurangi mean, bagi std).

**Fungsi:** Standardisasi 4 fitur clustering sebelum K-Means (karena skala berbeda: partisipasi 0-100 vs IPM 60-80).

**Cara kerja:**
```
X_scaled[i] = (X[i] - mean(X)) / std(X)
```
Setiap kolom independen. Setelah scaling: mean=0, std=1.

**Kenapa penting untuk K-Means:** K-Means memakai Euclidean distance — kalau fitur skalanya beda, fitur skala besar akan mendominasi. Standardisasi bikin semua fitur "sama penting".

#### 3.2 `sklearn.cluster.KMeans`
**Apa:** Unsupervised clustering — grup data ke K cluster.

**Fungsi:** Segmentasi 38 provinsi jadi 4 cluster.

**Cara kerja (algoritma Lloyd):**
1. Inisialisasi K centroid random (`n_init=20` = coba 20 initial, ambil terbaik)
2. Assign setiap titik ke centroid terdekat (Euclidean distance)
3. Update centroid = rata-rata titik dalam cluster
4. Ulangi 2-3 sampai centroid tidak berubah (konvergen)

**Hyperparameter kunci:**
- `n_clusters=4` — jumlah cluster
- `n_init=20` — coba 20 inisialisasi berbeda
- `random_state=42` — reproducibility

**Output:** Label integer 0-3 per data point.

#### 3.3 `sklearn.decomposition.PCA`
**Apa:** Principal Component Analysis — dimensionality reduction.

**Fungsi:** Proyeksi 4D → 2D untuk visualisasi cluster scatter plot.

**Cara kerja:**
1. Hitung covariance matrix data
2. Eigen decomposition → eigenvector = arah variansi maksimum
3. Ambil 2 eigenvector dengan eigenvalue terbesar (PC1, PC2)
4. Proyeksi data ke PC1 × PC2

**Metric:** `explained_variance_ratio_` — berapa % variansi tertangkap tiap PC.

#### 3.4 `sklearn.ensemble.RandomForestRegressor`
**Apa:** Ensemble 300 decision tree, prediksi = rata-rata.

**Fungsi:** Prediksi tingkat partisipasi pemilih.

**Cara kerja:**
1. Bootstrap 300 sample dari data training (sampling with replacement)
2. Latih 1 decision tree per sample (dengan random subset fitur di setiap split)
3. Prediksi: rata-rata prediksi 300 tree

**Kenapa bagus:** 
- Robust terhadap outlier
- Tidak butuh feature scaling
- Kasih `feature_importances_` gratis

**Metric project:** R² 0.537, MAE 2.90%.

#### 3.5 `sklearn.ensemble.GradientBoostingRegressor`
**Apa:** Ensemble 300 tree yang **sequential** — tiap tree memperbaiki error tree sebelumnya.

**Fungsi:** Model prediktif alternatif — biasanya sedikit lebih akurat.

**Cara kerja:**
1. Latih tree #1 pada data
2. Hitung residual = actual − predicted
3. Latih tree #2 pada residual (yaitu "perbaiki error tree #1")
4. Ulangi 300x
5. Prediksi akhir = jumlah weighted semua tree

**Vs Random Forest:**
- RF: parallel, weak learner (deep tree)
- GB: sequential, weak learner (shallow tree default `max_depth=3`)

**Metric project:** R² 0.585, MAE 2.64% (**best**).

#### 3.6 `sklearn.model_selection.train_test_split`
**Apa:** Split data jadi training set & test set.

**Fungsi:** Split 38 provinsi → 26 train / 12 test (30% test).

**Cara kerja:** Random shuffle + slice. `random_state=42` untuk reproducibility.

#### 3.7 `sklearn.metrics.r2_score`, `mean_absolute_error`
**Apa:** Metric evaluasi regresi.

**R² (koefisien determinasi):**
- Range: (-∞, 1]. Semakin dekat 1, semakin baik.
- Interpretasi: "berapa % variansi target ter-explain oleh model"
- Rumus: `1 - SS_residual / SS_total`

**MAE (Mean Absolute Error):**
- Rata-rata magnitude error absolut
- Rumus: `mean(|y_actual - y_pred|)`
- Interpretasi: "prediksi meleset rata-rata sekian poin"

**Kenapa keduanya:** R² untuk quality relatif, MAE untuk quality absolut (poin persentase).

**Referensi:** https://scikit-learn.org/

---

## 4. Visualisasi — Matplotlib & Seaborn

### matplotlib (>= 3.7)
**Apa:** Library plotting fundamental Python — object-oriented + procedural (pyplot).

**Fungsi:** Semua chart di project (bar, line, scatter, heatmap).

**Cara kerja:**
- `fig, ax = plt.subplots(figsize=(w, h))` — bikin canvas
- `ax.bar(...)`, `ax.plot(...)`, `ax.scatter(...)` — gambar
- `plt.savefig("nama.png", bbox_inches="tight")` — export PNG

**Konfigurasi project:**
```python
plt.rcParams.update({
    "figure.dpi": 150,          # resolusi tinggi
    "savefig.dpi": 150,
    "axes.titlesize": 16,
    "axes.titleweight": "bold",
})
```

**Referensi:** https://matplotlib.org/

---

### seaborn (>= 0.12)
**Apa:** Wrapper matplotlib untuk statistical viz — API lebih pendek + default cantik.

**Fungsi:** Heatmap (korelasi, cluster profile, peta partai).

**Cara kerja:**
- Panggil `sns.heatmap(matrix, annot=True, cmap="RdBu_r")` → langsung jadi
- Backend tetap matplotlib
- Style default: `whitegrid`, `darkgrid`, `white`, `dark`, `ticks`

**Contoh:**
```python
sns.set_style("whitegrid")
sns.heatmap(korrelasi, annot=True, fmt=".2f", cmap="RdBu_r", center=0)
```

**Kenapa dipilih:** Kombinasi matplotlib + seaborn cukup untuk 95% kasus data viz. Alternatif Plotly (interaktif) lebih berat.

**Referensi:** https://seaborn.pydata.org/

---

## 5. Notebook — Jupyter

### Jupyter Notebook
**Apa:** Interactive computing environment — mix Markdown + code + output.

**Fungsi:** Format deliverable utama (`Analisis_Elektoral_Pemilu_2024.ipynb`).

**Cara kerja:**
- Frontend: web browser
- Backend: kernel Python (server yang eksekusi kode)
- File `.ipynb` = JSON berisi cell (markdown/code) + output

**Alternatif:** Google Colab (Jupyter di cloud), VS Code Jupyter extension.

---

### nbformat (>= 5.9)
**Apa:** Library untuk baca/tulis file `.ipynb` secara programmatic.

**Fungsi di project:** `build_ipynb.py` pakai nbformat untuk generate notebook dari kode Python.

**Cara kerja:**
```python
import nbformat as nbf
nb = nbf.v4.new_notebook()
nb["cells"] = [
    nbf.v4.new_markdown_cell("# Judul"),
    nbf.v4.new_code_cell("import pandas as pd"),
]
with open("output.ipynb", "w") as f:
    nbf.write(nb, f)
```

---

### nbclient (>= 0.9)
**Apa:** Library eksekusi notebook programmatic (headless — tanpa buka browser).

**Fungsi:** `build_ipynb.py` mengeksekusi notebook otomatis setelah generate.

**Cara kerja:**
```python
from nbclient import NotebookClient
client = NotebookClient(nb, timeout=600, kernel_name="python3")
client.execute()   # jalankan semua cell, isi output
```

**Keuntungan:** CI/CD friendly, bisa jadi bagian pipeline.

---

## 6. Slide Deck — python-pptx

### python-pptx (>= 0.6.21)
**Apa:** Library Python untuk baca/tulis file PowerPoint `.pptx`.

**Fungsi:** `build_slides.py` generate slide deck 14 halaman.

**Cara kerja:**
- `.pptx` sebenarnya adalah ZIP berisi XML (Office Open XML format)
- python-pptx manipulasi XML tersebut

**Contoh:**
```python
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

prs = Presentation()
slide = prs.slides.add_slide(prs.slide_layouts[6])   # blank
tb = slide.shapes.add_textbox(Inches(1), Inches(1), Inches(8), Inches(1))
tb.text_frame.text = "Judul Slide"
prs.save("output.pptx")
```

**Referensi:** https://python-pptx.readthedocs.io/

---

## 7. Web Frontend — Next.js Stack

### Next.js 14 (14.2.35)
**Apa:** React framework — SSR/SSG/ISR + file-based routing + optimasi otomatis.

**Fungsi:** Website portfolio (folder `web/`).

**Cara kerja:**
- **App Router** (Next 13+): file di `app/` = route
- `app/page.tsx` → route `/`
- `app/dashboard/page.tsx` → route `/dashboard`
- Server Component by default (rendering di server, no JS bundle)
- Client Component pakai `"use client"` directive

**Kenapa dipilih:**
- Static export cepat (portfolio ≠ perlu backend dinamis)
- SEO friendly
- Deploy Vercel gratis + one-click

**Referensi:** https://nextjs.org/

---

### React 18
**Apa:** Library UI berbasis component.

**Fungsi:** Semua UI website (tabs, table, cards).

**Cara kerja:**
- Component = function yang return JSX
- State via `useState()`, side effect via `useEffect()`
- Virtual DOM: diff → minimal update ke real DOM

**Contoh di project:**
```tsx
"use client";
import { useState } from "react";

export function Tabs({ tabs }) {
  const [i, setI] = useState(0);
  return <div>{tabs[i].content}</div>;
}
```

---

### TypeScript (5.5.3)
**Apa:** Superset JavaScript dengan static typing.

**Fungsi:** Type-safety di semua kode web.

**Cara kerja:**
- Compile: `tsc` transpile `.tsx` → `.js`
- Type checking di build time (bukan runtime)
- Type hints bantu IDE autocomplete & catch bug

**Contoh:**
```ts
export type Provinsi = {
  provinsi: string;
  populasi: number;
  partisipasi: number;
};
```

**Referensi:** https://www.typescriptlang.org/

---

### Tailwind CSS (3.4.6)
**Apa:** Utility-first CSS framework. Bikin styling via class name (`bg-navy`, `p-4`, `flex`).

**Fungsi:** Styling seluruh website.

**Cara kerja:**
- Scan file `.tsx` → deteksi class name yang dipakai
- Generate CSS bundle hanya untuk class yang dipakai (tree-shake)
- Custom warna via `tailwind.config.ts`

**Contoh:**
```tsx
<div className="card p-4 bg-navy text-white rounded-lg shadow">
  Hello
</div>
```

**Kenapa dipilih:** 
- Bundle kecil (unused CSS di-purge)
- Konsistensi design system (spacing, warna terstandar)
- Dark mode built-in (`dark:` prefix)

**Referensi:** https://tailwindcss.com/

---

### PostCSS + Autoprefixer
**Apa:** Tool transformasi CSS.

**Fungsi:** Backend Tailwind. Autoprefixer tambah vendor prefix (`-webkit-`, `-moz-`) otomatis.

**Cara kerja:** Config di `postcss.config.mjs` — dipanggil otomatis oleh Next.js build.

---

## 8. Deployment — Vercel & GitHub

### Git
**Apa:** Version control system distributed.

**Fungsi:** Track semua perubahan kode.

**Command yang sering dipakai:**
```bash
git init                    # inisialisasi repo
git add .                   # stage semua perubahan
git commit -m "pesan"       # commit
git push                    # push ke remote (GitHub)
git pull                    # pull dari remote
git log --oneline           # lihat history
```

---

### GitHub
**Apa:** Platform hosting Git repository.

**Fungsi:** Simpan repo publik → showcase portfolio.

**Fitur yang dipakai:**
- Auto-render `.ipynb` (buka file di web view)
- Auto-render `.md` (README, INSIGHTS)
- **GitHub Pages** (opsional) — hosting HTML statis

**Kenapa dipilih:** De facto standar untuk portfolio developer/analis.

---

### Vercel
**Apa:** Platform-as-a-Service khusus deploy Next.js (buatan tim Next.js sendiri).

**Fungsi:** Hosting website `web/` — live URL public.

**Cara kerja:**
- Connect repo GitHub → Vercel watch push ke `main`
- Setiap push → auto build & deploy
- CDN global (edge network) → cepat di seluruh dunia
- Preview URL per PR (bonus)

**Free tier:** Unlimited static, 100 GB bandwidth/bulan.

**Referensi:** https://vercel.com/

---

## 9. Developer Tools

### VS Code (rekomendasi editor)
**Apa:** Editor kode ringan dari Microsoft.

**Extension yang berguna:**
- **Python** (Microsoft) — Python support
- **Jupyter** — buka `.ipynb` di dalam VS Code
- **Tailwind CSS IntelliSense** — autocomplete class
- **Prettier** — auto-format kode
- **GitLens** — Git enhanced

---

### npm (Node Package Manager)
**Apa:** Package manager untuk JavaScript/Node.js.

**Fungsi:** Install dependencies web (`npm install`), jalankan script (`npm run dev`).

**Cara kerja:**
- Baca `package.json` → download dependencies ke `node_modules/`
- Lock version di `package-lock.json` untuk reproducibility

---

### pip (Python Package Installer)
**Apa:** Package manager untuk Python.

**Fungsi:** Install library Python.

**Command:**
```bash
pip install pandas                        # install satu package
pip install -r requirements.txt           # install semua dari file
pip install --user pandas                 # install ke user local (tanpa sudo)
pip list                                  # lihat semua terpasang
```

---

## 10. Rangkuman Versi

### Python Stack
| Package | Versi Minimum | Fungsi |
|---|---|---|
| Python | 3.9 | Bahasa |
| pandas | 2.0 | DataFrame |
| numpy | 1.24 | Array numerik |
| scikit-learn | 1.3 | ML |
| matplotlib | 3.7 | Plotting |
| seaborn | 0.12 | Statistical viz |
| jupyter | 1.0 | Notebook |
| nbformat | 5.9 | Baca/tulis .ipynb |
| nbclient | 0.9 | Eksekusi .ipynb |
| python-pptx | 0.6.21 | Slide PPTX |

### JavaScript Stack (web/)
| Package | Versi | Fungsi |
|---|---|---|
| Node.js | 18+ | Runtime |
| Next.js | 14.2.35 | React framework |
| React | 18.3.1 | UI library |
| TypeScript | 5.5.3 | Static typing |
| Tailwind CSS | 3.4.6 | Styling |
| PostCSS | 8.4.39 | CSS transform |
| Autoprefixer | 10.4.19 | Vendor prefix |

### Platform / Cloud
| Platform | Fungsi |
|---|---|
| GitHub | Version control + hosting repo |
| Vercel | Hosting web Next.js |
| Google Colab | Notebook di cloud (opsional) |
| GitHub Pages | Hosting HTML statis (opsional) |

---

## Instal Semua Sekaligus

### Python
```bash
# requirements.txt di root project
pip install --user -r requirements.txt
```

### JavaScript (web/)
```bash
cd web
npm install
```

Setelah kedua command di atas, semua tools siap digunakan.

---

## Kapan Pakai Apa?

| Task | Tools |
|---|---|
| Baca CSV | pandas |
| Bikin chart bar/line | matplotlib |
| Bikin heatmap | seaborn |
| Clustering | sklearn.cluster.KMeans |
| Prediksi regresi | sklearn.ensemble.RandomForestRegressor / GradientBoostingRegressor |
| Bikin notebook programmatic | nbformat + nbclient |
| Bikin PPTX programmatic | python-pptx |
| Bikin website portfolio | Next.js + Tailwind |
| Deploy website gratis | Vercel |
| Share notebook publik | GitHub + Google Colab |

---

*Semua tools di atas open-source / free tier. Total biaya operasional project = Rp 0.*

*Wahyu Surya · 2024*
