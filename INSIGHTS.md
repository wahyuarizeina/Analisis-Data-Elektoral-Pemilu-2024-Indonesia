# Laporan Analis — Insight Elektoral Pemilu 2024

Ringkasan analisis 38 provinsi · 15 partai · 3 paslon · 10 topik sentimen · tren 2009–2024.
Data: simulasi berbasis pola resmi KPU RI & BPS.

---

## 1. Ringkasan Eksekutif (TL;DR)

- **Prabowo-Gibran menang 58,4% nasional**, mengulangi pola dominasi capres petahana-koalisi.
- **5 provinsi battleground** (margin < 15%): Aceh, Sumbar, Jateng, DIY, Bali. Ini area ROI kampanye tertinggi.
- **9 partai lolos ambang 4%** — PDIP #1 dengan 16,7% suara, Gerindra & Golkar mengejar ketat.
- **Cluster provinsi jadi 4 segmen**: Urban Progressive, Rural Traditional, Swing Moderate, Emerging Region. Strategi kampanye wajib dibedakan per segmen.
- **Sentimen negatif dominan**: korupsi & harga pangan. Kedua isu ini adalah "senjata pisau bermata dua" — bisa dipakai menyerang atau balik menyerang.
- **Prediktor partisipasi**: penetrasi internet paling berpengaruh (Gradient Boosting R² 0,585).
- **Estimasi kursi DPR (Sainte-Laguë nasional simplifikasi)**: PDIP 99, Golkar 91, Gerindra 79, PKB 63.

---

## 2. Analisis per Dimensi

### 2.1 Pilpres
- **Prabowo-Gibran**: 58,4% (100,4 juta suara)
- **Anies-Cak Imin**: 24,9% (42,8 juta suara)
- **Ganjar-Mahfud**: 16,7% (28,7 juta suara)

**Provinsi rebutan** (margin Prabowo vs #2 < 15%):
| Provinsi | Pemenang | #2 | Margin |
|---|---|---|---|
| Aceh | Prabowo | Anies | ~8% |
| Sumbar | Prabowo | Anies | ~1% |
| Jateng | Prabowo | Ganjar | ~24% (tapi Ganjar > 25% → penting) |
| DIY | Prabowo | Ganjar | ~30% |
| Bali | Prabowo | Ganjar | ~25% |

**Insight bisnis**: Aceh & Sumbar adalah **swing daerah Muslim tradisional** — kunci narasi identitas + koalisi partai Islam.

### 2.2 Peta Partai (Pileg)
Top 5 nasional: **PDIP (16,7%) — Golkar (15,3%) — Gerindra (13,2%) — PKB (10,6%) — NasDem (9,7%)**.

Pola regional:
- **PDIP** dominan Bali (27%) & Jateng (18,7%) — basis nasionalis.
- **Golkar** merata di Sulawesi (>20% di 4 provinsi) & Kalimantan.
- **PKB** monopoli Jatim (20,1%) & Jateng (20,2%) — basis Nahdlatul Ulama.
- **NasDem** kuat di Sulawesi & NTT (10–17%).
- **PKS** di Jabar, DKI, Sumbar — basis Islamis urban.

**Insight bisnis**: setiap partai punya "kandang" — biaya menyerang kandang kompetitor 3-5x lebih mahal daripada memperkuat kandang sendiri.

### 2.3 Battleground vs Safe Seat
- **Battleground** (margin < 15%): 5 provinsi
- **Kompetitif** (15–30%): ~15 provinsi
- **Safe seat** (>30%): ~18 provinsi

**Aksi**: alokasikan 60% budget kampanye ke battleground (5 provinsi), 30% ke kompetitif (15 provinsi), 10% ke safe seat (mobilisasi turnout).

### 2.4 Regional Analysis
- **Jawa-Bali**: 60% suara nasional. Prabowo 55%, Anies 25%, Ganjar 20%.
- **Sumatera**: 20% suara. Prabowo 60%, Anies 25%.
- **Kalimantan**: 5% suara. Prabowo 59%, Anies 25%.
- **Sulawesi**: 10% suara. Prabowo 60%, Anies 25%.
- **Papua-Maluku-NTT-NTB**: 5% suara. Prabowo 57%, Anies 24%.

**Insight bisnis**: Jawa-Bali adalah "must win". Kehilangan 1% di Jawa = kehilangan 3 juta suara.

### 2.5 Demografi & Partisipasi
- **Partisipasi rata-rata**: 80,55%
- **Tertinggi**: Jateng (89,79%), Jatim (89,58%), DIY (88,43%)
- **Terendah**: Papua Selatan (65,07%), Papua Barat (67,58%), Papua Pegunungan (74,19%)

**Korelasi utama** (n=38):
| Fitur | vs Partisipasi | Interpretasi |
|---|---|---|
| Penetrasi internet | +0,45 | Internet ↔ akses info ↔ mobilisasi |
| IPM | +0,32 | Kualitas hidup ↔ engagement |
| Kemiskinan | −0,58 | Kemiskinan tinggi = partisipasi rendah |
| Urbanisasi | +0,20 | Kota ↔ akses TPS lebih mudah |

### 2.6 Pemilih Muda
- **Rata-rata Gen Z + Milenial**: ~54% populasi tiap provinsi
- **Tertinggi**: Sulawesi Selatan, Aceh, Papua Tengah (>60%)

**Insight bisnis**: kampanye yang tidak menyentuh Gen Z + Milenial = melepas > 50% pemilih. Wajib TikTok, Instagram Reels, podcast politik.

### 2.7 Segmentasi 4 Cluster
| Cluster | Provinsi | Karakter | Strategi |
|---|---|---|---|
| **Urban Progressive** | DKI, DIY, Banten, Bali, Kepri | urbanisasi tinggi, internet >80%, IPM tinggi | Digital campaign, isu progresif (iklim, tech, gender) |
| **Rural Traditional** | Jateng, Jatim, NTB | urbanisasi sedang, partisipasi tinggi | Tokoh lokal, kyai, program pertanian |
| **Swing Moderate** | Sumatera & Sulawesi mostly | mixed profile | Isu ekonomi rumah tangga, harga sembako |
| **Emerging Region** | Papua & sekitarnya | urbanisasi rendah, kemiskinan tinggi | Door-to-door, radio komunitas, program pemerataan |

### 2.8 Sentimen Publik (Jan–Jun 2024)
Rangking negatif → positif:
1. **Korupsi** (~70% negatif) ⚠
2. **Kenaikan Harga Pangan** (~60% negatif) ⚠
3. **IKN Nusantara** (~38% negatif)
4. **Ekonomi** (~38% negatif)
5. **Pilpres 2024** (25%)
6. **Bansos** (~55% positif) ✓
7. **Pendidikan** (~48% positif) ✓
8. **Kesehatan** (~44% positif) ✓

**Trend Jan → Jun**: sentimen positif turun tipis, negatif naik tipis. Warning: musim pemilu belum berakhir → risk isu memburuk.

**Insight bisnis**: partai yang bisa **mengalihkan** framing dari isu negatif (korupsi, harga) ke isu positif (bansos, pendidikan) akan menang narasi.

### 2.9 Model Prediktif
- **Target**: tingkat partisipasi pemilih (0–100%)
- **Best model**: Gradient Boosting (R² 0,585, MAE 2,64%)
- **Runner-up**: Random Forest (R² 0,537, MAE 2,90%)

**Fitur paling penting**:
1. Penetrasi internet (importance ~0,35)
2. IPM (~0,25)
3. Urbanisasi (~0,18)
4. Kemiskinan (~0,12)
5. Gen Z & Milenial (~0,10)

**Penggunaan**: prediksi partisipasi provinsi baru (misal pemekaran) atau simulasi "what-if" bila internet naik 10%.

### 2.10 Estimasi Kursi DPR (Sainte-Laguë Nasional)
Asumsi: 580 kursi, satu dapil nasional, hanya partai lolos 4%.

| Partai | Suara | Kursi | % Kursi |
|---|---|---|---|
| PDIP | 16,7% | ~99 | 17,1% |
| Golkar | 15,3% | ~91 | 15,7% |
| Gerindra | 13,2% | ~79 | 13,6% |
| PKB | 10,6% | ~63 | 10,9% |
| NasDem | 9,7% | ~58 | 10,0% |
| PKS | 8,4% | ~50 | 8,6% |
| Demokrat | 7,4% | ~44 | 7,6% |
| PAN | 7,2% | ~43 | 7,4% |
| PPP | 3,9% | (bawah threshold) | – |

*Catatan*: metode disederhanakan tanpa BPP dapil. Angka riil per partai bisa berbeda ±10–20 kursi.

### 2.11 Skenario Koalisi (threshold capres 20% kursi = 116 kursi)
| Skenario | Kursi | % | Lolos 20%? |
|---|---|---|---|
| Gerindra + Golkar + PKB | ~233 | 40,2% | ✓ |
| PDIP + PKS + NasDem | ~207 | 35,7% | ✓ |
| PDIP + Gerindra (grand) | ~178 | 30,7% | ✓ |
| Golkar + Demokrat + PAN | ~178 | 30,7% | ✓ |

**Insight bisnis**: 4 dari 4 skenario koalisi wajar sudah lolos threshold. Kompetisi capres 2029 akan lebih ramai (4-5 pasangan mungkin).

### 2.12 Tren Historis 2009–2024
| Partai | 2009 | 2024 | Perubahan |
|---|---|---|---|
| **PDIP** | 14,03% | 16,72% | +2,7 pt (stabil-naik) |
| **Golkar** | 14,45% | 15,28% | +0,8 pt (stabil) |
| **Gerindra** | 4,46% | 13,22% | **+8,8 pt** (naik 3x) |
| **PKB** | 4,94% | 10,61% | +5,7 pt (naik 2x) |
| **NasDem** | 0 | 9,65% | dari nol → 10% |
| **PKS** | 7,88% | 8,42% | stabil |
| **Demokrat** | 20,85% | 7,43% | **−13,4 pt** (turun 66%) |
| **PAN** | 6,01% | 7,23% | stabil |

**Insight**: pemilih Indonesia semakin dinamis. Partai yang "puas diri" (Demokrat pasca-2009) bisa kehilangan 2/3 basis dalam 15 tahun. Gerindra sebaliknya menunjukkan kaderisasi + rebranding yang berhasil.

---

## 3. Rekomendasi Strategis (Data-Driven)

### 3.1 Untuk partai yang ingin memenangkan Pemilu berikutnya
1. **Petakan cluster provinsi Anda** — jangan pakai strategi seragam.
2. **Investasi digital di Urban Progressive** — ROI tertinggi per rupiah.
3. **Bangun narasi antikorupsi + stabilitas harga** — 2 isu paling negatif = 2 kesempatan paling besar.
4. **Kaderisasi pemilih muda sejak sekarang** — mereka 55%+ populasi.
5. **Jangan abaikan Emerging Region** — 5-10 kursi bisa jadi penentu koalisi.

### 3.2 Untuk konsultan politik / lembaga survei
1. **Segmentasi kampanye berbasis cluster > berbasis provinsi.**
2. **Bangun dashboard realtime** minggu terakhir kampanye — command center wajib.
3. **A/B test pesan di battleground** — 5 provinsi × 3 varian pesan × 2 kanal = 30 eksperimen.

### 3.3 Untuk pemerintah / KPU
1. **Prioritaskan infrastruktur internet Papua** — korelasi terbukti kuat dengan partisipasi.
2. **Sosialisasi khusus** di provinsi < 76% partisipasi (6 provinsi Papua).
3. **Transparansi rekapitulasi** — sentimen "curang" berpotensi menyerang legitimasi hasil.

---

## 4. Keterbatasan Analisis (Full Disclosure)

1. Data adalah simulasi berbasis pola resmi — angka absolut tidak boleh dianggap sebagai hasil KPU.
2. K-Means dengan K=4 dipilih berdasarkan interpretabilitas, bukan optimasi silhouette formal (bisa ditambah).
3. Model prediktif dilatih pada 38 sampel — statistik power terbatas. Perlu cross-validation lebih ketat untuk production.
4. Sentimen berbasis data agregat nasional, belum granular per-provinsi.
5. Sainte-Laguë simplifikasi ke satu dapil nasional — angka riil kursi bisa berbeda ±20 kursi per partai.

---

## 5. Rencana Iterasi Berikutnya

- [ ] Swap data simulasi → data KPU RI resmi 2024
- [ ] Tambah eksit poll granular per dapil
- [ ] Time-series pemilih swing 2019 → 2024
- [ ] NLP sentimen realtime (BERT Indonesian)
- [ ] Dashboard live via Streamlit
- [ ] Sainte-Laguë per dapil (bukan nasional)

---

*Laporan disusun oleh Wahyu Surya · September 2024*
