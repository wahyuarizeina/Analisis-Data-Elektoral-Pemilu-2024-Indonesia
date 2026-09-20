export type ModelInfo = {
  slug: string;
  kategori: "AI/ML" | "Statistik" | "NLP" | "Simulasi";
  nama: string;
  tujuan: string;
  input: string[];
  output: string;
  hyperparams: { nama: string; nilai: string; catatan?: string }[];
  metrik?: { nama: string; nilai: string; interpretasi: string }[];
  kode: string;
  interpretasi: string;
  library: string;
  referensi?: string;
};

export const models: ModelInfo[] = [
  {
    slug: "kmeans",
    kategori: "AI/ML",
    nama: "K-Means Clustering — Segmentasi 4 Cluster Provinsi",
    tujuan:
      "Mengelompokkan 38 provinsi menjadi 4 segmen berdasarkan profil sosiodemografi, agar strategi kampanye bisa dipersonalisasi per segmen.",
    input: ["urbanisasi_pct", "penetrasi_internet_pct", "tingkat_partisipasi × 100", "ipm"],
    output:
      "Label cluster per provinsi (0-3) → dinamai Urban Progressive · Rural Traditional · Swing Moderate · Emerging Region.",
    hyperparams: [
      { nama: "K (jumlah cluster)", nilai: "4", catatan: "Dipilih berdasar interpretabilitas politis" },
      { nama: "algorithm", nilai: "lloyd (default)" },
      { nama: "n_init", nilai: "20", catatan: "20x random init, pilih terbaik" },
      { nama: "random_state", nilai: "42", catatan: "Untuk reproducibility" },
      { nama: "scaler", nilai: "StandardScaler", catatan: "Z-normalize 4 fitur sebelum fit" },
    ],
    kode: `from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

fitur = ['urbanisasi_pct','penetrasi_internet_pct','tingkat_partisipasi','ipm']
X = df_demo[fitur].copy()
X['tingkat_partisipasi'] *= 100

scaler = StandardScaler()
Xs = scaler.fit_transform(X)

km = KMeans(n_clusters=4, random_state=42, n_init=20)
label = km.fit_predict(Xs)

# PCA 2D untuk visualisasi
pca = PCA(n_components=2, random_state=42)
Xp = pca.fit_transform(Xs)`,
    interpretasi:
      "Standarisasi wajib karena skala fitur berbeda (partisipasi 0-100 vs IPM 60-80). PCA hanya untuk visualisasi 2D — clustering tetap di ruang 4D. Cluster label diberi nama berdasarkan profil rata-rata (mean fitur) tiap grup.",
    library: "scikit-learn 1.3+",
    referensi: "https://scikit-learn.org/stable/modules/clustering.html#k-means",
  },
  {
    slug: "random-forest",
    kategori: "AI/ML",
    nama: "Random Forest — Prediksi Partisipasi Pemilih",
    tujuan:
      "Memprediksi tingkat partisipasi pemilih (%) di provinsi baru berdasarkan 6 fitur sosiodemografi. Bisa dipakai untuk simulasi 'what-if' (misal internet naik 10%).",
    input: [
      "urbanisasi_pct",
      "gen_z_pct",
      "milenial_pct",
      "ipm",
      "tingkat_kemiskinan",
      "penetrasi_internet_pct",
    ],
    output: "Prediksi tingkat_partisipasi × 100 (0-100 %).",
    hyperparams: [
      { nama: "n_estimators", nilai: "300", catatan: "300 pohon keputusan" },
      { nama: "max_depth", nilai: "None", catatan: "Split sampai leaf pure" },
      { nama: "criterion", nilai: "squared_error" },
      { nama: "random_state", nilai: "42" },
      { nama: "test_size", nilai: "30%", catatan: "26 train / 12 test" },
    ],
    metrik: [
      { nama: "R²", nilai: "0.537", interpretasi: "53,7% variansi partisipasi ter-explain oleh model" },
      { nama: "MAE", nilai: "2.90 %", interpretasi: "Rata-rata prediksi meleset ±2,90 poin persentase" },
    ],
    kode: `from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error

fitur = ['urbanisasi_pct','gen_z_pct','milenial_pct','ipm',
         'tingkat_kemiskinan','penetrasi_internet_pct']
X = df_demo[fitur].values
y = (df_demo['tingkat_partisipasi'] * 100).values
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=42)

rf = RandomForestRegressor(n_estimators=300, random_state=42)
rf.fit(X_tr, y_tr)
pred = rf.predict(X_te)

print('R²:',  r2_score(y_te, pred))
print('MAE:', mean_absolute_error(y_te, pred))
print('Feature importance:', dict(zip(fitur, rf.feature_importances_)))`,
    interpretasi:
      "Fitur paling berpengaruh: penetrasi_internet_pct (~0.35) → IPM (~0.25) → urbanisasi (~0.18). Interpretasi: aksesibilitas informasi lebih menentukan partisipasi dibanding demografi usia semata.",
    library: "scikit-learn 1.3+",
    referensi: "https://scikit-learn.org/stable/modules/ensemble.html#random-forests",
  },
  {
    slug: "gradient-boosting",
    kategori: "AI/ML",
    nama: "Gradient Boosting — Model Prediktif Utama",
    tujuan:
      "Baseline model prediktif alternatif — sequential boosted trees. Biasanya sedikit lebih baik dari Random Forest pada dataset kecil dengan feature interactions non-linear.",
    input: [
      "urbanisasi_pct",
      "gen_z_pct",
      "milenial_pct",
      "ipm",
      "tingkat_kemiskinan",
      "penetrasi_internet_pct",
    ],
    output: "Prediksi tingkat_partisipasi × 100.",
    hyperparams: [
      { nama: "n_estimators", nilai: "300" },
      { nama: "learning_rate", nilai: "0.1 (default)" },
      { nama: "max_depth", nilai: "3 (default)", catatan: "Weak learner sengaja dangkal" },
      { nama: "loss", nilai: "squared_error" },
      { nama: "random_state", nilai: "42" },
    ],
    metrik: [
      { nama: "R²", nilai: "0.585", interpretasi: "58,5% variansi ter-explain (best model)" },
      { nama: "MAE", nilai: "2.64 %", interpretasi: "Meleset ±2,64 poin — lebih akurat dari RF" },
    ],
    kode: `from sklearn.ensemble import GradientBoostingRegressor

gb = GradientBoostingRegressor(n_estimators=300, random_state=42)
gb.fit(X_tr, y_tr)
pred = gb.predict(X_te)`,
    interpretasi:
      "Gradient Boosting sedikit unggul karena lebih tahan noise pada dataset kecil (38 baris). Untuk production skala > 1000 baris, coba XGBoost / LightGBM dengan tuning learning_rate + regularisasi.",
    library: "scikit-learn 1.3+",
    referensi: "https://scikit-learn.org/stable/modules/ensemble.html#gradient-tree-boosting",
  },
  {
    slug: "pca",
    kategori: "AI/ML",
    nama: "PCA — Dimensionality Reduction untuk Visualisasi",
    tujuan:
      "Memproyeksikan 4 fitur clustering ke 2D agar visualisasi K-Means bisa ditampilkan di scatter plot.",
    input: ["4 fitur K-Means yang sudah di-standardisasi"],
    output: "PC1 + PC2 (2 principal components).",
    hyperparams: [
      { nama: "n_components", nilai: "2" },
      { nama: "random_state", nilai: "42" },
    ],
    metrik: [
      { nama: "Explained variance PC1", nilai: "~60%", interpretasi: "PC1 menangkap ~60% variansi" },
      { nama: "Explained variance PC2", nilai: "~22%", interpretasi: "PC2 tangkap ~22% (total ~82%)" },
    ],
    kode: `from sklearn.decomposition import PCA
pca = PCA(n_components=2, random_state=42)
Xp = pca.fit_transform(Xs)
print('Explained variance ratio:', pca.explained_variance_ratio_)`,
    interpretasi:
      "PCA hanya untuk visualisasi — clustering asli tetap di ruang 4D. Kalau explained variance rendah (<60%), visualisasi bisa menyesatkan.",
    library: "scikit-learn 1.3+",
    referensi: "https://scikit-learn.org/stable/modules/decomposition.html#pca",
  },
  {
    slug: "sentimen",
    kategori: "NLP",
    nama: "Analisis Sentimen Politik — Distribusi Multi-Topik",
    tujuan:
      "Mengukur distribusi sentimen (positif/netral/negatif) untuk 10 topik politik utama sepanjang Januari–Juni 2024, ditambah volume percakapan bulanan.",
    input: [
      "Percakapan publik multi-sumber (Twitter/X, TikTok, Facebook, komentar berita)",
      "10 topik: Pilpres, Pileg, Kabinet, Harga Pangan, Korupsi, Ekonomi, Pendidikan, Kesehatan, Bansos, IKN",
      "6 bulan: Januari–Juni 2024",
    ],
    output:
      "Untuk setiap (topik × bulan): distribusi sentimen (% positif + % netral + % negatif) + volume total percakapan.",
    hyperparams: [
      {
        nama: "Metode klasifikasi",
        nilai: "Rule-based + lexicon Bahasa Indonesia (baseline)",
        catatan: "Production: fine-tune IndoBERT / RoBERTa-Indo untuk akurasi > 85%",
      },
      { nama: "Threshold sentimen", nilai: "score > 0.3 = positif, < -0.3 = negatif, else netral" },
      { nama: "Preprocessing", nilai: "lowercasing, remove URL, normalize slang (kbba)" },
      { nama: "Timeframe", nilai: "Jan–Jun 2024 (6 bulan)" },
    ],
    metrik: [
      {
        nama: "Sentimen paling negatif",
        nilai: "Korupsi (~70%) & Harga Pangan (~60%)",
        interpretasi: "Isu-isu yang berpotensi menjadi 'senjata pisau bermata dua' dalam kampanye",
      },
      {
        nama: "Sentimen paling positif",
        nilai: "Bansos (~55%) & Pendidikan (~48%)",
        interpretasi: "Program yang aman untuk di-highlight di kampanye",
      },
      {
        nama: "Volume percakapan puncak",
        nilai: "Februari 2024",
        interpretasi: "Masa kampanye aktif Pilpres — momen kritis untuk monitoring",
      },
    ],
    kode: `# Pipeline production yang disarankan:
# 1. Ingest tweet/post via Twitter/X API + TikTok Research API
# 2. Preprocess: kbba (kamus baku bahasa Indonesia gaul), URL removal
# 3. Klasifikasi: IndoBERT fine-tuned untuk 3-class sentiment
# 4. Aggregate: groupby(topik, bulan).mean() untuk % positif/netral/negatif

from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

MODEL = "mdhugol/indonesia-bert-sentiment-classification"
tok = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

def klasifikasi(teks):
    inputs = tok(teks, return_tensors='pt', truncation=True, max_length=256)
    with torch.no_grad():
        logits = model(**inputs).logits
    label = torch.argmax(logits, dim=1).item()
    # 0=negatif, 1=netral, 2=positif
    return ['negatif','netral','positif'][label]

# Aggregasi per topik & bulan
df_sen = df_percakapan.groupby(['topik','bulan'])['label'].value_counts(normalize=True).unstack()
`,
    interpretasi:
      "Data yang di-ship di project ini adalah SIMULASI berbasis pola. Untuk production pakai IndoBERT (mdhugol/indonesia-bert-sentiment-classification) atau roberta-base-indonesian yang F1-nya > 0.85 untuk 3-class. Lexicon-based (misal InSet) hanya baseline < 70% F1.",
    library: "transformers (HuggingFace) + torch",
    referensi:
      "https://huggingface.co/mdhugol/indonesia-bert-sentiment-classification · InSet lexicon: https://github.com/fajri91/InSet",
  },
  {
    slug: "sainte-lague",
    kategori: "Simulasi",
    nama: "Sainte-Laguë — Simulasi Alokasi Kursi DPR",
    tujuan:
      "Estimasi alokasi kursi DPR untuk partai yang lolos ambang parlementer 4%, memakai metode divisor Sainte-Laguë (standar Indonesia sejak 2019).",
    input: [
      "Suara partai yang lolos ambang 4%",
      "Jumlah kursi total: 580 (proxi kursi DPR RI)",
    ],
    output: "Alokasi kursi per partai.",
    hyperparams: [
      { nama: "Divisor", nilai: "1, 3, 5, 7, 9, ..." },
      { nama: "Total kursi", nilai: "580" },
      { nama: "Ambang batas", nilai: "4% suara nasional" },
      { nama: "Simplifikasi", nilai: "Satu dapil nasional (tidak per-dapil)" },
    ],
    kode: `# Sainte-Laguë: iteratif, tiap kursi diberikan ke partai dengan quotient tertinggi
KURSI = 580
kursi = {p: 0 for p in suara_lolos.index}
for _ in range(KURSI):
    quotients = {p: v / (2*kursi[p] + 1) for p, v in suara_lolos.items()}
    win = max(quotients, key=quotients.get)
    kursi[win] += 1`,
    interpretasi:
      "Metode ini fair untuk partai menengah — divisor ganjil (1,3,5,...) mengurangi bias pro-partai besar. Angka kursi riil per partai bisa berbeda ±10-20 kursi karena implementasi asli KPU membagi per dapil (bukan nasional).",
    library: "Pure Python — tanpa dependensi",
    referensi: "https://id.wikipedia.org/wiki/Metode_Sainte-Lagu%C3%AB",
  },
];
