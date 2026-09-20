# Web — Pemilu 2024 Analytics

Next.js 14 (App Router) + TypeScript + Tailwind. Portfolio siap deploy ke Vercel.

## Local Dev

```bash
cd web
npm install
npm run dev
# buka http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Deploy ke Vercel

1. Push repo ke GitHub (sudah).
2. Login https://vercel.com → **New Project** → import repo `wahyuarizeina/Analisis-Data-Elektoral-Pemilu-2024-Indonesia`.
3. **Root Directory:** `web` (penting — Vercel default cari di root).
4. Framework: Next.js (auto-detect).
5. Deploy.

Site akan live di `https://<nama-proyek>.vercel.app`.

## Struktur

```
web/
├── app/
│   ├── layout.tsx       # root layout + font
│   ├── page.tsx         # halaman utama (tabs + KPI + charts)
│   └── globals.css      # Tailwind + variabel
├── components/
│   ├── Tabs.tsx         # tab nav (client)
│   ├── Chart.tsx        # kartu chart PNG
│   ├── InsightCard.tsx  # kartu insight berwarna
│   └── DataTable.tsx    # tabel provinsi sortable + search (client)
├── lib/
│   └── data.ts          # data provinsi/partai/metrik (auto-generate)
├── public/
│   ├── viz/*.png        # 16 visualisasi
│   ├── Analisis_Elektoral_Pemilu_2024.ipynb
│   └── Slides_Elektoral_2024.pptx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── postcss.config.mjs
```

## Regenerate Data

Jalankan dari root repo:

```bash
python3 gen_web_data.py   # tulis ulang web/lib/data.ts dari CSV
```

## Notes

- Semua gambar di-serve statis dari `public/viz/`. Aman untuk Vercel free tier.
- Dark mode via `prefers-color-scheme` (otomatis ikut tema OS).
- Nol data-fetching di runtime — pure static + client tabs → super cepat.
