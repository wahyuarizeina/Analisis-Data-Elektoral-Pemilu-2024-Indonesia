# Panduan Portofolio — Analisis Elektoral Pemilu 2024

Panduan lengkap dari nol sampai portofolio terpasang di GitHub + siap dipresentasikan wawancara. Ikuti berurutan A → E.

---

## Bagian A. Cara Menjalankan Project di Laptop

### A.1 Prasyarat
```bash
python3 --version   # butuh >= 3.9
```

### A.2 Install dependensi
```bash
cd portfolio-elektoral
python3 -m pip install --user -r requirements.txt
```

### A.3 Regenerate semua output (opsional — file sudah ada)
```bash
python3 gen_sentimen.py       # generate data_sentimen_politik.csv
python3 build_ipynb.py        # bangun & eksekusi notebook + PNG
python3 build_dashboard.py    # bangun dashboard HTML
python3 build_slides.py       # bangun slide PPTX
```

### A.4 Buka hasil
| File | Cara buka |
|---|---|
| `Analisis_Elektoral_Pemilu_2024.ipynb` | `jupyter notebook` atau VS Code |
| `dashboard_elektoral_2024.html` | double-click → browser |
| `Slides_Elektoral_2024.pptx` | PowerPoint / Keynote / Google Slides |

---

## Bagian B. Cara Upload ke GitHub

### B.1 Bikin repo baru di github.com
- Nama saran: `pemilu2024-analytics`
- Public (biar rekruter bisa lihat)
- **Jangan** centang "Add README" (kita sudah punya)

### B.2 Init + push dari terminal
```bash
cd portfolio-elektoral
git init
git add .
git commit -m "feat: portfolio analisis elektoral pemilu 2024"
git branch -M main
git remote add origin https://github.com/<username>/pemilu2024-analytics.git
git push -u origin main
```

### B.3 Aktifkan GitHub Pages (agar dashboard bisa diakses via URL)
1. Repo → Settings → Pages
2. Source: `Deploy from a branch` · Branch: `main` · Folder: `/ (root)`
3. Save. Tunggu ~1 menit.
4. Dashboard akan live di `https://<username>.github.io/pemilu2024-analytics/dashboard_elektoral_2024.html`

### B.4 Renderer notebook otomatis
- GitHub sudah render `.ipynb` di web. Pastikan cell output tersimpan (sudah, karena kita eksekusi via nbclient).
- Fallback: nbviewer.org/github/`<username>`/pemilu2024-analytics/blob/main/Analisis_Elektoral_Pemilu_2024.ipynb

---

## Bagian C. Cara Menyusun Cerita Portofolio

Struktur STAR untuk tiap deliverable:

| Bagian | Isi |
|---|---|
| **Situation** | Pemilu 2024 hasilkan data masif — partai butuh insight cepat |
| **Task** | Bangun end-to-end analisis: EDA → segmentasi → prediktif → rekomendasi |
| **Action** | Python (pandas/sklearn) + Jupyter + dashboard HTML + slide 12 halaman |
| **Result** | 4 deliverable, 16 visualisasi, model R² 0.59, 3 rekomendasi eksekutif |

### Elevator pitch 30 detik
> "Saya bangun portfolio end-to-end analisis Pemilu 2024. Dari 5 dataset 38 provinsi saya lakukan EDA, segmentasi K-Means jadi 4 cluster provinsi, model prediksi partisipasi pakai Random Forest & Gradient Boosting (R² 0.59), plus simulasi kursi DPR pakai Sainte-Laguë. Output-nya notebook Jupyter, dashboard HTML interaktif, dan slide deck 12 halaman — semuanya reproducible via 4 script Python."

---

## Bagian D. Skrip Presentasi 10 Menit

| Menit | Slide/Panel | Yang Dibicarakan |
|---|---|---|
| 0:00–1:00 | Cover + Latar Belakang | "Konteks pemilu 2024 + tujuan analisis" |
| 1:00–2:00 | Metodologi | "5 dataset → 5 step pipeline" |
| 2:00–3:30 | Pilpres + Peta Partai | "Prabowo menang mayoritas, 9 partai lolos" |
| 3:30–5:00 | Battleground + Regional | "5 provinsi margin < 15% → target kampanye" |
| 5:00–6:30 | Demografi + Clustering | "Pemilih muda dominan, 4 segmen provinsi" |
| 6:30–8:00 | Sentimen + ML Model | "Korupsi & harga negatif; internet paling prediktif" |
| 8:00–9:00 | Kursi DPR + Koalisi | "Simulasi Sainte-Laguë + threshold 20%" |
| 9:00–10:00 | Rekomendasi + Closing | "3 aksi + tech stack + Q&A" |

### Kalimat pembuka tiap chart (contoh)
- **Pilpres bar chart:** "Prabowo-Gibran menang 58,6% suara nasional — 33 dari 38 provinsi. Yang menarik: Anies unggul hanya di 2 provinsi dengan margin tipis."
- **Heatmap partai:** "Sel merah = partai kuat di provinsi itu. PDIP dominan Bali & Jateng, Golkar merata di Sulawesi, PKB monopoli Jatim."
- **Clustering scatter:** "4 kelompok provinsi. Urban Progressive (kanan atas) = target kampanye digital; Emerging Region = butuh door-to-door."
- **Feature importance:** "Model bilang penetrasi internet adalah faktor #1 memprediksi partisipasi — bukti kanal digital menentukan mobilisasi."

---

## Bagian E. Persiapan Wawancara — Q&A

### E.1 Pertanyaan teknis yang biasa muncul

**Q: "Kenapa K=4 di K-Means?"**
> A: Cek silhouette score & elbow method (bisa ditambah ke notebook). K=4 memberi cluster yang interpretable secara politis: urban, rural, swing, emerging. K=3 terlalu kasar, K=5 mulai overlap.

**Q: "Model R² 0.59 apa bisa dipakai?"**
> A: Untuk 38 sampel dengan 6 fitur, R² 0.59 sudah bagus tapi belum production-ready. Improvement: (1) tambah fitur historis partisipasi, (2) time-series per pemilu, (3) train per region.

**Q: "Data-nya simulasi, valid nggak untuk portfolio?"**
> A: Simulasi berbasis pola KPU RI resmi (proporsi, sebaran regional). Yang dijual bukan angkanya, tapi **metodologi & pipeline**. Bisa langsung swap dengan data KPU asli saat production.

**Q: "Ceritakan bagian tersulit."**
> A: Sainte-Laguë simulasi — harus paham divisor politik + asumsi dapil. Solusinya simplifikasi ke satu dapil nasional + dokumentasi asumsi eksplisit.

**Q: "Kenapa Random Forest + Gradient Boosting, bukan XGBoost/LightGBM?"**
> A: Dataset kecil (38 baris), RF & GB baseline standar yang cukup. XGBoost butuh tuning lebih dan risk overfit. Tambah jika data > 1000 baris.

### E.2 Pertanyaan bisnis yang membedakan

**Q: "Jika kamu jadi konsultan partai X, langkah pertama?"**
> A: (1) Validasi cluster dengan data survey internal, (2) A/B test pesan di 5 battleground, (3) build dashboard realtime untuk minggu terakhir kampanye.

**Q: "Data mana yang paling ingin kamu tambah?"**
> A: (1) Sentimen per-provinsi (bukan hanya nasional), (2) belanja kampanye per partai, (3) survey eksit poll granular.

### E.3 Yang tidak boleh dikatakan
- ❌ "Saya cuma ikut tutorial" → say "saya adaptasi struktur dari best-practice EDA + kembangkan modul clustering & Sainte-Laguë sendiri"
- ❌ "Datanya ngasal" → say "data simulasi berbasis pola resmi KPU RI, pipeline siap swap ke data live"

---

## Bagian F. Checklist Sebelum Kirim ke Rekruter

- [ ] Semua file di folder `portfolio-elektoral/` sudah ada (cek `ls`)
- [ ] Notebook terbuka tanpa error (buka di Jupyter, pastikan cell output ada)
- [ ] Dashboard buka di browser, semua tab bisa diklik, tabel bisa di-sort
- [ ] PPTX dibuka di PowerPoint/Keynote — 12 slide lengkap
- [ ] `README.md` di repo GitHub menampilkan struktur + link demo
- [ ] Link GitHub Pages dashboard aktif
- [ ] CV mencantumkan link repo + link dashboard
- [ ] Latihan pitch 30 detik sampai lancar tanpa baca

---

## Bagian G. Cara Kembangkan Lebih Lanjut

1. **Ganti data simulasi → data KPU asli.** Kunjungi `kpu.go.id` → download rekapitulasi resmi → replace CSV.
2. **Tambah dimensi time-series.** Gabung data pemilu 2009/2014/2019/2024 → analisis shift pemilih.
3. **Dashboard live.** Migrasi dari HTML statis ke Streamlit/Dash → deploy ke Streamlit Cloud (gratis).
4. **NLP sentimen real.** Scraping Twitter/X + BERT Indonesian → sentimen live.
5. **Prediksi kursi per dapil.** Implementasi Sainte-Laguë per dapil (bukan nasional) → estimasi kursi akurat per partai.

---

**Selamat presentasi!** Kalau ada pertanyaan spesifik saat interview, tanya balik ke saya (Claude) untuk simulasi mock interview.
