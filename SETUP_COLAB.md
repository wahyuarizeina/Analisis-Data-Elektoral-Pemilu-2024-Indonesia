# Setup Project di Google Colab — Panduan Lengkap

Panduan langkah demi langkah menjalankan project di **Google Colab** — cloud notebook Jupyter gratis dari Google. Tidak perlu install Python lokal.

---

## Kenapa Google Colab?

- **Gratis** — tidak perlu bayar
- **GPU/TPU gratis** (opsional) — untuk model besar
- **Pre-installed** — pandas, numpy, sklearn, matplotlib, seaborn sudah ada
- **Share mudah** — link Google Drive
- **Reproducible** — bisa dijalankan siapapun tanpa setup lokal

---

## File yang Perlu Di-upload ke Colab

### Minimum (untuk buka notebook & lihat hasil)

| File | Wajib? | Kegunaan |
|---|---|---|
| `Analisis_Elektoral_Pemilu_2024.ipynb` | ✅ WAJIB | Notebook utama |
| `data_suara_partai_per_provinsi.csv` | ✅ WAJIB | Data suara partai |
| `data_pilpres_per_provinsi.csv` | ✅ WAJIB | Data pilpres |
| `data_demografi_provinsi.csv` | ✅ WAJIB | Data demografi |
| `data_sentimen_politik.csv` | ✅ WAJIB | Data sentimen |
| `data_historis_partai.csv` | ✅ WAJIB | Data historis |

**Total 6 file** — cukup untuk jalankan seluruh analisis.

### Opsional (untuk regenerate dari nol)

| File | Kegunaan |
|---|---|
| `gen_sentimen.py` | Regenerate CSV sentimen dari scratch |
| `build_ipynb.py` | Rebuild notebook dari template |
| `requirements.txt` | List dependencies (Colab sudah punya sebagian besar) |

### Yang **tidak perlu** di-upload
- `dashboard_elektoral_2024.html` (viewer offline — tidak jalan di Colab)
- `Slides_Elektoral_2024.pptx` (PowerPoint file)
- Folder `web/` (Next.js — Colab tidak untuk web dev)
- File `viz_*.png` (akan di-generate ulang oleh notebook)

---

## Metode 1 (Rekomendasi): Clone Langsung dari GitHub

**Kelebihan:** Tidak upload manual, selalu dapat versi terbaru.

### Langkah:

1. Buka https://colab.research.google.com/
2. Klik **File → New Notebook**
3. Di cell pertama, ketik:

```python
# Clone repo dari GitHub
!git clone https://github.com/wahyuarizeina/Analisis-Data-Elektoral-Pemilu-2024-Indonesia.git

# Masuk ke folder project
%cd Analisis-Data-Elektoral-Pemilu-2024-Indonesia

# Cek file yang ada
!ls
```

4. Jalankan cell (Shift+Enter)
5. Setelah selesai, di cell kedua:

```python
# Install dependencies (Colab sudah punya sebagian besar)
!pip install -q python-pptx nbclient nbformat
```

6. Sekarang buka file notebook. Di sidebar kiri Colab:
   - Klik ikon **folder** (📁)
   - Buka `Analisis-Data-Elektoral-Pemilu-2024-Indonesia/`
   - Double-click `Analisis_Elektoral_Pemilu_2024.ipynb`
   - Notebook terbuka di tab baru

7. Klik **Runtime → Run all** untuk eksekusi semua cell

---

## Metode 2: Upload Manual

**Kelebihan:** Bisa modifikasi file sebelum upload.

### Langkah:

1. Buka https://colab.research.google.com/
2. Klik **File → Upload notebook** → pilih `Analisis_Elektoral_Pemilu_2024.ipynb`
3. Setelah notebook terbuka, di sidebar kiri klik ikon **folder** (📁)
4. Klik ikon **upload** (⬆️ pada bar atas panel folder)
5. Upload 5 CSV sekaligus:
   - `data_suara_partai_per_provinsi.csv`
   - `data_pilpres_per_provinsi.csv`
   - `data_demografi_provinsi.csv`
   - `data_sentimen_politik.csv`
   - `data_historis_partai.csv`
6. Install dependencies tambahan (jalankan cell baru di atas):

```python
!pip install -q python-pptx nbclient nbformat
```

7. **Runtime → Run all**

⚠️ **Catatan:** File yang di-upload manual akan **hilang** kalau session Colab timeout (~12 jam idle). Gunakan Metode 1 atau Metode 3 untuk persistensi.

---

## Metode 3: Mount Google Drive

**Kelebihan:** File persistent (tidak hilang), bisa share dengan tim.

### Langkah:

1. **Setup di komputer:**
   - Buka Google Drive
   - Bikin folder baru `pemilu2024-portfolio`
   - Upload 5 CSV + notebook ke folder ini

2. **Setup di Colab:**
   - Buka https://colab.research.google.com/
   - New Notebook
   - Cell pertama:

```python
from google.colab import drive
drive.mount('/content/drive')
```

3. Klik **Allow** pada popup permission (login Google account)
4. Cell berikutnya:

```python
# Masuk ke folder project
%cd /content/drive/MyDrive/pemilu2024-portfolio

# Verifikasi file
!ls
```

5. Sekarang notebook & CSV sudah accessible. Buka notebook via sidebar.

---

## Cara Menjalankan Notebook di Colab

### Shortcut Penting

| Shortcut | Fungsi |
|---|---|
| **Shift+Enter** | Jalankan cell saat ini, pindah ke cell berikutnya |
| **Ctrl+Enter** | Jalankan cell saat ini, tetap di cell |
| **Alt+Enter** | Jalankan cell, buat cell baru di bawah |
| **Ctrl+M B** | Tambah cell baru di bawah |
| **Ctrl+M A** | Tambah cell baru di atas |
| **Ctrl+M D D** | Hapus cell |
| **Ctrl+M M** | Ubah cell jadi markdown |
| **Ctrl+M Y** | Ubah cell jadi code |

### Menu

- **Runtime → Run all** — jalankan semua cell
- **Runtime → Restart runtime** — reset kernel (kalau ada error variabel undefined)
- **Runtime → Factory reset runtime** — hapus semua file & install → mulai dari 0
- **Runtime → Change runtime type** — pilih GPU/TPU (tidak perlu untuk project ini)

---

## Verifikasi Semua Berjalan

Setelah **Runtime → Run all**, cek bagian-bagian ini di notebook:

### Bagian 1: Data Loading
Harus muncul preview 5 dataframe (Partai, Pilpres, Demografi, Sentimen, Historis).

### Bagian 2: Data Quality
Tabel 5 baris — `missing_total = 0` dan `duplikat = 0` untuk semua dataset.

### Bagian 3-13: Chart
Harus muncul chart bar, heatmap, scatter, line — 16 visualisasi total.

### Bagian 10: Clustering
Muncul scatter plot 4 warna cluster + tabel provinsi per cluster.

### Bagian 12-13: ML Model
Muncul feature importance bar chart + actual vs predicted scatter. Lihat `R² 0.585, MAE 2.64%` di output.

Kalau semua muncul → **project berhasil dijalankan di Colab**.

---

## Download Hasil dari Colab

### Download 1 file

```python
from google.colab import files
files.download('viz_pilpres.png')
```

### Download semua PNG

```python
from google.colab import files
import glob
for f in glob.glob('viz_*.png'):
    files.download(f)
```

### Zip semua & download

```python
!zip -r hasil.zip viz_*.png metrik.json Analisis_Elektoral_Pemilu_2024.ipynb
from google.colab import files
files.download('hasil.zip')
```

---

## Save Notebook ke Google Drive (Auto-save)

Colab otomatis save copy ke Google Drive kalau kamu:
1. **File → Save a copy in Drive** — copy notebook ke `MyDrive/Colab Notebooks/`

Setiap edit → auto-save (asal masih terkoneksi).

### Save modifikasi ke GitHub

```python
# Setup git config
!git config --global user.email "wahyuarizeina@gmail.com"
!git config --global user.name "Wahyu Surya"

# Commit & push (butuh Personal Access Token GitHub)
!cd Analisis-Data-Elektoral-Pemilu-2024-Indonesia && git add . && git commit -m "update: dari Colab"

# Push (ganti YOUR_TOKEN dengan PAT GitHub)
!cd Analisis-Data-Elektoral-Pemilu-2024-Indonesia && git push https://YOUR_TOKEN@github.com/wahyuarizeina/Analisis-Data-Elektoral-Pemilu-2024-Indonesia.git
```

⚠️ **Jangan hardcode token di notebook publik.** Pakai `getpass` untuk input manual:

```python
from getpass import getpass
token = getpass("Masukkan GitHub token: ")
!cd Analisis-Data-Elektoral-Pemilu-2024-Indonesia && git push https://{token}@github.com/wahyuarizeina/Analisis-Data-Elektoral-Pemilu-2024-Indonesia.git
```

---

## Troubleshooting Colab

### Error: `ModuleNotFoundError: No module named 'X'`
```python
!pip install -q X
```

### Error: `FileNotFoundError: [Errno 2] No such file or directory: 'data_...csv'`
Cek working directory:
```python
!pwd
!ls
```
Kalau tidak ada CSV, upload ulang atau `%cd` ke folder yang benar.

### Error: `KernelDied` / RAM habis
- **Runtime → Restart runtime**
- Colab free = 12 GB RAM. Kalau kepenuhan, upgrade Colab Pro (Rp 150k/bulan)

### Session timeout / disconnected
Colab free putus setelah ~12 jam aktif atau ~90 menit idle. Fix:
- Jangan tinggalkan tab idle terlalu lama
- Klik "Reconnect" kalau muncul
- Atau upgrade Colab Pro (no timeout)

### Chart tidak muncul (blank)
Tambah magic command di awal cell:
```python
%matplotlib inline
```

### Notebook lambat
- Kurangi `n_estimators` di RF/GB (dari 300 → 100)
- Skip cell yang tidak perlu

---

## Ringkasan Alur Kerja Colab (Metode 1)

```
1. Buka https://colab.research.google.com/
2. New Notebook
3. Cell 1: !git clone <URL repo>
4. Cell 2: %cd Analisis-Data-Elektoral-Pemilu-2024-Indonesia
5. Cell 3: !pip install -q python-pptx nbclient nbformat
6. Buka Analisis_Elektoral_Pemilu_2024.ipynb via sidebar
7. Runtime → Run all
8. Lihat hasil di setiap cell
9. Download hasil (opsional): files.download('viz_pilpres.png')
```

Total waktu: **~5 menit** dari nol sampai semua chart tampil.

---

## Perbedaan Colab vs Jupyter Lokal

| Aspek | Colab | Jupyter Lokal |
|---|---|---|
| Install | Zero setup | Perlu Python + pip |
| Cost | Gratis (free tier) | Gratis |
| RAM | 12 GB (free) | Sesuai laptop |
| GPU | Tersedia (T4 gratis) | Perlu GPU sendiri |
| File persistence | Hilang jika timeout | Persistent di disk |
| Offline | Tidak bisa | Bisa |
| Share | Link Drive | Manual (email/GitHub) |
| Speed | Tergantung internet | Sesuai laptop |

**Kesimpulan:**
- **Colab** — cepat mulai, cocok demo & belajar
- **Jupyter lokal** — cocok production & pengembangan intensif

Untuk portfolio ini, **keduanya bisa**. Colab lebih mudah dishare ke rekruter yang tidak mau install apapun.

---

## Cara Share Notebook Colab ke Orang Lain

1. Buka notebook di Colab
2. Klik **Share** (kanan atas)
3. Pilih **Anyone with the link** → **Viewer** (view only) atau **Editor** (bisa edit)
4. Copy link → kirim

Penerima buka link → notebook langsung tampil di browser mereka.

**Contoh URL yang bisa kamu share:**
```
https://colab.research.google.com/github/wahyuarizeina/Analisis-Data-Elektoral-Pemilu-2024-Indonesia/blob/main/Analisis_Elektoral_Pemilu_2024.ipynb
```

Formula: `https://colab.research.google.com/github/<user>/<repo>/blob/<branch>/<path/to/notebook.ipynb>`

Cukup share URL ini → siapapun bisa buka di Colab tanpa clone manual.

---

## Bonus: Badge "Open in Colab"

Tambahkan badge di README GitHub agar rekruter bisa klik satu tombol:

```markdown
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/wahyuarizeina/Analisis-Data-Elektoral-Pemilu-2024-Indonesia/blob/main/Analisis_Elektoral_Pemilu_2024.ipynb)
```

Hasilnya button biru "Open in Colab" — klik langsung buka di browser mereka.

---

*Wahyu Surya · 2024*
