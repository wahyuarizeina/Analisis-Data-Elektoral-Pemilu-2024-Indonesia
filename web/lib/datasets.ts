export type DatasetInfo = {
  slug: string;
  nama: string;
  file: string;
  dimensi: string;
  ukuran: string;
  deskripsi: string;
  kolom: { nama: string; tipe: string; keterangan: string }[];
  contoh: string;
  sumber: string;
};

export const datasets: DatasetInfo[] = [
  {
    slug: "suara-partai",
    nama: "Suara Partai per Provinsi",
    file: "data_suara_partai_per_provinsi.csv",
    dimensi: "570 baris × 5 kolom",
    ukuran: "22 KB",
    deskripsi:
      "Perolehan suara 15 partai politik peserta Pileg 2024 di 38 provinsi Indonesia. Data disusun long-format (satu baris per pasangan provinsi × partai).",
    kolom: [
      { nama: "provinsi", tipe: "string", keterangan: "Nama provinsi (38 nilai)" },
      { nama: "partai", tipe: "string", keterangan: "Nama partai (15 nilai)" },
      { nama: "persentase_suara", tipe: "float", keterangan: "% suara di provinsi tsb" },
      { nama: "jumlah_suara", tipe: "int", keterangan: "Total suara absolut" },
      { nama: "total_suara_sah", tipe: "int", keterangan: "Total suara sah provinsi" },
    ],
    contoh:
      "Aceh,PDIP,10.09,338279,3353717\nAceh,Golkar,16.03,537533,3353717\nAceh,Gerindra,12.81,429717,3353717",
    sumber: "Simulasi berbasis pola resmi KPU RI 2024",
  },
  {
    slug: "pilpres",
    nama: "Hasil Pilpres per Provinsi",
    file: "data_pilpres_per_provinsi.csv",
    dimensi: "114 baris × 5 kolom",
    ukuran: "6 KB",
    deskripsi:
      "Perolehan suara 3 paslon Pilpres 2024 (Anies-Cak Imin, Prabowo-Gibran, Ganjar-Mahfud) di 38 provinsi.",
    kolom: [
      { nama: "provinsi", tipe: "string", keterangan: "Nama provinsi" },
      { nama: "paslon", tipe: "string", keterangan: "Nama pasangan calon" },
      { nama: "persentase_suara", tipe: "float", keterangan: "% suara paslon di provinsi" },
      { nama: "jumlah_suara", tipe: "int", keterangan: "Total suara absolut" },
      { nama: "total_suara_sah", tipe: "int", keterangan: "Total suara sah provinsi" },
    ],
    contoh:
      "Aceh,Prabowo-Gibran,47.07,1578755,3353717\nAceh,Anies-Cak Imin,38.62,1295099,3353717",
    sumber: "Simulasi berbasis pola resmi KPU RI 2024",
  },
  {
    slug: "demografi",
    nama: "Demografi & Sosioekonomi Provinsi",
    file: "data_demografi_provinsi.csv",
    dimensi: "38 baris × 12 kolom",
    ukuran: "3 KB",
    deskripsi:
      "Profil demografi + sosioekonomi setiap provinsi: populasi, DPT, partisipasi, urbanisasi, IPM, kemiskinan, generasi (Gen Z / Milenial / Gen X / Boomer+), penetrasi internet.",
    kolom: [
      { nama: "provinsi", tipe: "string", keterangan: "Nama provinsi (primary key)" },
      { nama: "populasi", tipe: "int", keterangan: "Total populasi" },
      { nama: "dpt", tipe: "int", keterangan: "Daftar Pemilih Tetap" },
      { nama: "tingkat_partisipasi", tipe: "float", keterangan: "Rasio partisipasi (0-1)" },
      { nama: "urbanisasi_pct", tipe: "float", keterangan: "% penduduk urban" },
      { nama: "gen_z_pct", tipe: "float", keterangan: "% Gen Z (lahir 1997-2012)" },
      { nama: "milenial_pct", tipe: "float", keterangan: "% Milenial (1981-1996)" },
      { nama: "gen_x_pct", tipe: "float", keterangan: "% Gen X (1965-1980)" },
      { nama: "boomer_plus_pct", tipe: "float", keterangan: "% Boomer & lebih tua" },
      { nama: "ipm", tipe: "float", keterangan: "Indeks Pembangunan Manusia" },
      { nama: "tingkat_kemiskinan", tipe: "float", keterangan: "% penduduk miskin" },
      { nama: "penetrasi_internet_pct", tipe: "float", keterangan: "% pengguna internet" },
    ],
    contoh:
      "Aceh,5400000,3955322,0.8479,41.2,31.2,29.0,21.6,18.2,75.87,11.99,61.4",
    sumber: "Simulasi berbasis pola BPS RI 2024",
  },
  {
    slug: "sentimen",
    nama: "Sentimen Politik Bulanan",
    file: "data_sentimen_politik.csv",
    dimensi: "60 baris × 7 kolom",
    ukuran: "3 KB",
    deskripsi:
      "Distribusi sentimen publik (positif/netral/negatif) untuk 10 topik politik utama, Januari–Juni 2024, plus volume percakapan. Dibangkitkan via simulasi berbasis pola percakapan media sosial nasional.",
    kolom: [
      { nama: "topik", tipe: "string", keterangan: "Nama topik politik (10 nilai)" },
      { nama: "bulan", tipe: "string", keterangan: "Nama bulan (Jan-Jun)" },
      { nama: "bulan_num", tipe: "int", keterangan: "Nomor bulan (1-6)" },
      { nama: "positif_pct", tipe: "float", keterangan: "% percakapan positif" },
      { nama: "netral_pct", tipe: "float", keterangan: "% percakapan netral" },
      { nama: "negatif_pct", tipe: "float", keterangan: "% percakapan negatif" },
      { nama: "volume_percakapan", tipe: "int", keterangan: "Jumlah mentions/percakapan" },
    ],
    contoh:
      "Pilpres 2024,Jan,1,46.24,27.14,26.62,13772\nKorupsi,Jan,1,10.5,20.1,69.4,24500",
    sumber:
      "Simulasi pola percakapan media sosial nasional (baseline: laporan Drone Emprit & Politica Wave 2024)",
  },
  {
    slug: "historis",
    nama: "Historis Suara Partai 2009-2024",
    file: "data_historis_partai.csv",
    dimensi: "32 baris × 3 kolom",
    ukuran: "0.5 KB",
    deskripsi:
      "Perolehan suara nasional 8 partai utama lintas 4 pemilu terakhir: 2009, 2014, 2019, 2024.",
    kolom: [
      { nama: "partai", tipe: "string", keterangan: "Nama partai (8 nilai)" },
      { nama: "tahun_pemilu", tipe: "int", keterangan: "Tahun pemilu (2009/2014/2019/2024)" },
      { nama: "persentase_suara", tipe: "float", keterangan: "% suara nasional" },
    ],
    contoh:
      "PDIP,2009,14.03\nPDIP,2014,18.95\nPDIP,2019,19.33\nPDIP,2024,16.72",
    sumber: "Rekap KPU RI 2009-2024 (pola aktual, agregat nasional)",
  },
];
