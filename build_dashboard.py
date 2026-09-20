"""Bangun dashboard_elektoral_2024.html — single-file, PNG di-embed base64."""
import base64, json, pandas as pd

with open('metrik.json') as f: M = json.load(f)

def b64(path):
    with open(path,'rb') as f:
        return 'data:image/png;base64,' + base64.b64encode(f.read()).decode()

IMG = {k: b64(f'viz_{k}.png') for k in
       ['pilpres','partai_nasional','heatmap_partai','partisipasi','korelasi',
        'pemilih_muda','sentimen','clustering','historis',
        'feature_importance','prediction','regional','battleground',
        'cluster_profile','kursi_dpr','koalisi']}

df_demo = pd.read_csv('data_demografi_provinsi.csv')
df_pilpres = pd.read_csv('data_pilpres_per_provinsi.csv')
pilpres_prov = df_pilpres.pivot(index='provinsi', columns='paslon', values='persentase_suara')

tbl_rows = []
for _, r in df_demo.iterrows():
    p = pilpres_prov.loc[r['provinsi']]
    tbl_rows.append(f"""<tr>
      <td>{r['provinsi']}</td>
      <td class='num'>{r['populasi']:,}</td>
      <td class='num'>{r['dpt']:,}</td>
      <td class='num'>{r['tingkat_partisipasi']*100:.2f}%</td>
      <td class='num'>{r['urbanisasi_pct']:.1f}%</td>
      <td class='num'>{r['ipm']:.2f}</td>
      <td class='num'>{p['Prabowo-Gibran']:.1f}%</td>
      <td class='num'>{p['Anies-Cak Imin']:.1f}%</td>
      <td class='num'>{p['Ganjar-Mahfud']:.1f}%</td>
    </tr>""")
TABEL = "\n".join(tbl_rows)

HTML = f"""<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8"/>
<title>Dashboard Elektoral Pemilu 2024</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
:root {{
  --navy:#0B1D3A; --merah:#C0392B; --biru:#2E86C1; --emas:#D4A017; --hijau:#1E8449;
  --bg:#F7F5F0; --fg:#0B1D3A; --card:#ffffff; --muted:#5D6D7E; --border:#E5E1D8;
  --shadow: 0 2px 8px rgba(11,29,58,.06);
}}
@media (prefers-color-scheme: dark) {{
  :root {{ --bg:#0B1220; --fg:#F1F5F9; --card:#111C33; --muted:#94A3B8; --border:#1F2A44; --shadow:0 2px 8px rgba(0,0,0,.3); }}
}}
* {{ box-sizing:border-box; }}
body {{ margin:0; font-family:'Plus Jakarta Sans',system-ui,sans-serif; background:var(--bg); color:var(--fg); line-height:1.55; }}
header {{ background:linear-gradient(135deg,var(--navy),#1a3a6b); color:#fff; padding:32px; }}
header h1 {{ margin:0 0 6px; font-size:2rem; letter-spacing:-.02em; }}
header p {{ margin:0; opacity:.85; }}
.kpis {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:16px; padding:24px 32px; }}
.kpi {{ background:var(--card); border:1px solid var(--border); border-radius:14px; padding:18px 20px; box-shadow:var(--shadow); }}
.kpi .label {{ font-size:.75rem; color:var(--muted); letter-spacing:.06em; text-transform:uppercase; font-weight:600; }}
.kpi .value {{ font-family:'JetBrains Mono',monospace; font-size:1.7rem; font-weight:800; color:var(--merah); margin-top:6px; }}
.kpi .sub {{ font-size:.75rem; color:var(--muted); margin-top:4px; }}
nav.tabs {{ display:flex; flex-wrap:wrap; gap:4px; padding:0 32px; border-bottom:1px solid var(--border); overflow-x:auto; }}
nav.tabs button {{ background:transparent; border:0; color:var(--muted); font:600 .92rem 'Plus Jakarta Sans',sans-serif; padding:12px 14px; cursor:pointer; border-bottom:3px solid transparent; transition:all .2s; white-space:nowrap; }}
nav.tabs button:hover {{ color:var(--fg); }}
nav.tabs button.active {{ color:var(--merah); border-bottom-color:var(--merah); }}
main {{ padding:24px 32px 40px; max-width:1400px; margin:0 auto; }}
.panel {{ animation:fade .35s ease; }}
.panel:not([hidden]) {{ display:block; }}
@keyframes fade {{ from{{opacity:0; transform:translateY(6px);}} to{{opacity:1; transform:none;}} }}
.panel h2 {{ margin:6px 0 6px; font-size:1.5rem; color:var(--navy); letter-spacing:-.01em; }}
@media (prefers-color-scheme: dark) {{ .panel h2 {{ color:#F1F5F9; }} }}
.lead {{ color:var(--muted); margin:0 0 14px; font-size:1rem; }}
.chart {{ background:var(--card); border:1px solid var(--border); border-radius:14px; padding:14px; text-align:center; box-shadow:var(--shadow); }}
.chart img {{ max-width:100%; height:auto; border-radius:8px; }}
.grid2 {{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }}
@media (max-width:900px) {{ .grid2 {{ grid-template-columns:1fr; }} }}
.insight-grid {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:14px; margin:16px 0; }}
.insight {{ background:var(--card); border:1px solid var(--border); border-left:4px solid var(--merah); border-radius:10px; padding:14px 16px; box-shadow:var(--shadow); }}
.insight .tag {{ font-size:.7rem; color:var(--merah); font-weight:700; letter-spacing:.08em; text-transform:uppercase; }}
.insight h3 {{ margin:4px 0 6px; font-size:1rem; color:var(--navy); }}
@media (prefers-color-scheme: dark) {{ .insight h3 {{ color:#F1F5F9; }} }}
.insight p {{ margin:0; font-size:.9rem; color:var(--muted); }}
.insight.emas {{ border-left-color:var(--emas); }} .insight.emas .tag {{ color:var(--emas); }}
.insight.hijau {{ border-left-color:var(--hijau); }} .insight.hijau .tag {{ color:var(--hijau); }}
.insight.biru {{ border-left-color:var(--biru); }} .insight.biru .tag {{ color:var(--biru); }}
table {{ width:100%; border-collapse:collapse; background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden; box-shadow:var(--shadow); }}
th, td {{ padding:10px 12px; border-bottom:1px solid var(--border); font-size:.88rem; text-align:left; }}
th {{ background:var(--navy); color:#fff; cursor:pointer; user-select:none; font-weight:600; letter-spacing:.02em; }}
th:hover {{ background:#1a3a6b; }}
td.num {{ font-family:'JetBrains Mono',monospace; text-align:right; }}
tr:hover td {{ background:rgba(192,57,43,.06); }}
.metric-row {{ display:flex; flex-wrap:wrap; gap:10px; margin:12px 0; }}
.metric-row .mini {{ background:var(--card); border:1px solid var(--border); border-radius:8px; padding:8px 14px; font-size:.85rem; }}
.metric-row .mini b {{ color:var(--merah); font-family:'JetBrains Mono',monospace; }}
footer {{ text-align:center; padding:20px; color:var(--muted); font-size:.85rem; border-top:1px solid var(--border); }}
@media (max-width:640px) {{
  header, nav.tabs, main {{ padding-left:16px; padding-right:16px; }}
  header h1 {{ font-size:1.4rem; }}
}}
</style>
</head>
<body>
<header>
  <h1>Analisis Data Elektoral Pemilu 2024 Indonesia</h1>
  <p>Portfolio AI &amp; Data Analyst · Wahyu Surya · Data: simulasi berbasis pola KPU RI &amp; BPS</p>
</header>

<div class="kpis">
  <div class="kpi"><div class="label">Total Suara Pilpres</div><div class="value">{M['total_suara_pilpres']/1e6:.1f} jt</div><div class="sub">3 paslon, 38 provinsi</div></div>
  <div class="kpi"><div class="label">Partisipasi Rata-rata</div><div class="value">{M['partisipasi_rata2']:.2f}%</div><div class="sub">min 65% (Papua Selatan), max 90% (Jateng)</div></div>
  <div class="kpi"><div class="label">Partai Lolos 4%</div><div class="value">{M['lolos_threshold']}</div><div class="sub">dari 15 kontestan</div></div>
  <div class="kpi"><div class="label">Model R² (best)</div><div class="value">{M['r2_gb']}</div><div class="sub">Gradient Boosting · MAE {M['mae_gb']}%</div></div>
</div>

<nav class="tabs" id="tabs">
  <button data-t="exec" class="active">Ringkasan Eksekutif</button>
  <button data-t="pilpres">Pilpres</button>
  <button data-t="partai">Peta Partai</button>
  <button data-t="battle">Battleground</button>
  <button data-t="regional">Regional</button>
  <button data-t="demografi">Demografi</button>
  <button data-t="clustering">Clustering</button>
  <button data-t="sentimen">Sentimen</button>
  <button data-t="ml">ML Model</button>
  <button data-t="kursi">Kursi &amp; Koalisi</button>
  <button data-t="historis">Historis</button>
  <button data-t="tabel">Data Provinsi</button>
</nav>

<main>
  <section id="exec" class="panel">
    <h2>Ringkasan Eksekutif</h2>
    <p class="lead">5 temuan utama dari analisis 38 provinsi, 15 partai, 3 paslon, 10 topik sentimen, dan 8 partai lintas 4 pemilu (2009–2024).</p>
    <div class="insight-grid">
      <div class="insight">
        <div class="tag">Temuan 1</div>
        <h3>Prabowo-Gibran menang mayoritas</h3>
        <p>~58% nasional. Dominasi di 33 dari 38 provinsi. Anies unggul di Aceh &amp; Sumbar; Ganjar hanya kuat di Jateng &amp; Bali.</p>
      </div>
      <div class="insight emas">
        <div class="tag">Temuan 2</div>
        <h3>Battleground &lt; 15% margin</h3>
        <p>Aceh, Sumbar, Jateng, DIY, Bali menjadi 5 provinsi dengan margin tertipis — target ROI kampanye tertinggi.</p>
      </div>
      <div class="insight hijau">
        <div class="tag">Temuan 3</div>
        <h3>Gap partisipasi Papua</h3>
        <p>6 provinsi Papua &lt; 76% partisipasi. Korelasi partisipasi ↔ penetrasi internet r=+0,45.</p>
      </div>
      <div class="insight biru">
        <div class="tag">Temuan 4</div>
        <h3>Sentimen negatif dominan: korupsi &amp; harga</h3>
        <p>Rata-rata sentimen negatif 60%+ untuk isu korupsi &amp; kenaikan harga pangan. Bansos &amp; pendidikan positif konsisten.</p>
      </div>
      <div class="insight">
        <div class="tag">Temuan 5</div>
        <h3>Segmentasi 4 cluster</h3>
        <p>Urban Progressive, Rural Traditional, Swing Moderate, Emerging Region — strategi kampanye wajib disesuaikan per cluster.</p>
      </div>
      <div class="insight emas">
        <div class="tag">Model</div>
        <h3>Prediktor partisipasi teratas</h3>
        <p>Penetrasi internet, IPM, urbanisasi. Gradient Boosting R² {M['r2_gb']} · MAE {M['mae_gb']}%. Bisa dipakai memprediksi partisipasi wilayah baru.</p>
      </div>
    </div>
    <h3 style="margin-top:24px">3 Rekomendasi Strategis</h3>
    <div class="metric-row">
      <div class="mini">1. Fokus 5 battleground → uji A/B pesan kampanye</div>
      <div class="mini">2. Segmentasi konten per cluster (video pendek untuk Urban Progressive; door-to-door untuk Emerging)</div>
      <div class="mini">3. Serangan isu korupsi + program stabilisasi harga → merebut voter skeptis</div>
    </div>
  </section>

  <section id="pilpres" class="panel" hidden>
    <h2>Hasil Pilpres 2024</h2>
    <p class="lead">Prabowo-Gibran unggul mayoritas nasional. Anies-Cak Imin kuat di Aceh &amp; Sumatera Barat, Ganjar-Mahfud kompetitif di Jateng &amp; Bali.</p>
    <div class="chart"><img src="{IMG['pilpres']}" alt="Pilpres"/></div>
  </section>

  <section id="partai" class="panel" hidden>
    <h2>Peta Perolehan Partai</h2>
    <p class="lead">9 partai lolos ambang parlementer 4%. Heatmap di bawah menampilkan sebaran per provinsi untuk 8 partai teratas.</p>
    <div class="chart"><img src="{IMG['partai_nasional']}" alt="Partai Nasional"/></div>
    <div class="chart" style="margin-top:16px"><img src="{IMG['heatmap_partai']}" alt="Heatmap"/></div>
  </section>

  <section id="battle" class="panel" hidden>
    <h2>Battleground vs Safe Seat</h2>
    <p class="lead">Klasifikasi provinsi berdasarkan margin kemenangan Pilpres — kunci alokasi budget kampanye.</p>
    <div class="chart"><img src="{IMG['battleground']}" alt="Battleground"/></div>
  </section>

  <section id="regional" class="panel" hidden>
    <h2>Analisis Regional</h2>
    <p class="lead">Jawa-Bali vs Sumatera vs Kalimantan vs Sulawesi vs Papua-Maluku-NTT-NTB — pola paslon &amp; partai berbeda tajam.</p>
    <div class="chart"><img src="{IMG['regional']}" alt="Regional"/></div>
  </section>

  <section id="demografi" class="panel" hidden>
    <h2>Partisipasi &amp; Pemilih Muda</h2>
    <p class="lead">Korelasi urbanisasi/internet ↔ partisipasi, plus proporsi Gen Z + Milenial per provinsi.</p>
    <div class="grid2">
      <div class="chart"><img src="{IMG['partisipasi']}" alt="Partisipasi"/></div>
      <div class="chart"><img src="{IMG['korelasi']}" alt="Korelasi"/></div>
    </div>
    <div class="chart" style="margin-top:16px"><img src="{IMG['pemilih_muda']}" alt="Pemilih Muda"/></div>
  </section>

  <section id="clustering" class="panel" hidden>
    <h2>Segmentasi 4 Cluster Provinsi</h2>
    <p class="lead">K-Means atas urbanisasi, penetrasi internet, partisipasi, IPM. Empat segmen: Urban Progressive, Rural Traditional, Swing Moderate, Emerging Region.</p>
    <div class="chart"><img src="{IMG['clustering']}" alt="Clustering"/></div>
    <div class="chart" style="margin-top:16px"><img src="{IMG['cluster_profile']}" alt="Cluster Profile"/></div>
  </section>

  <section id="sentimen" class="panel" hidden>
    <h2>Sentimen Publik Jan–Jun 2024</h2>
    <p class="lead">Korupsi &amp; kenaikan harga pangan dominan negatif. Bansos &amp; pendidikan konsisten positif.</p>
    <div class="chart"><img src="{IMG['sentimen']}" alt="Sentimen"/></div>
  </section>

  <section id="ml" class="panel" hidden>
    <h2>Model Prediktif Partisipasi</h2>
    <p class="lead">Random Forest &amp; Gradient Boosting memprediksi partisipasi pemilih.</p>
    <div class="metric-row">
      <div class="mini">RF: R² <b>{M['r2_rf']}</b> · MAE <b>{M['mae_rf']}%</b></div>
      <div class="mini">GB: R² <b>{M['r2_gb']}</b> · MAE <b>{M['mae_gb']}%</b></div>
    </div>
    <div class="grid2">
      <div class="chart"><img src="{IMG['feature_importance']}" alt="Feature Importance"/></div>
      <div class="chart"><img src="{IMG['prediction']}" alt="Prediksi"/></div>
    </div>
  </section>

  <section id="kursi" class="panel" hidden>
    <h2>Estimasi Kursi DPR &amp; Skenario Koalisi</h2>
    <p class="lead">Alokasi 580 kursi via metode Sainte-Laguë disederhanakan, plus 4 skenario koalisi vs threshold capres 20%.</p>
    <div class="chart"><img src="{IMG['kursi_dpr']}" alt="Kursi DPR"/></div>
    <div class="chart" style="margin-top:16px"><img src="{IMG['koalisi']}" alt="Koalisi"/></div>
  </section>

  <section id="historis" class="panel" hidden>
    <h2>Tren Historis Partai 2009–2024</h2>
    <p class="lead">Demokrat turun tajam, Gerindra meroket, PDIP stabil sebagai partai pemenang.</p>
    <div class="chart"><img src="{IMG['historis']}" alt="Historis"/></div>
  </section>

  <section id="tabel" class="panel" hidden>
    <h2>Data Provinsi</h2>
    <p class="lead">Klik header untuk sort. 38 provinsi.</p>
    <div style="overflow-x:auto">
    <table id="tblProv">
      <thead><tr>
        <th data-k="0">Provinsi</th><th data-k="1" data-n="1">Populasi</th><th data-k="2" data-n="1">DPT</th>
        <th data-k="3" data-n="1">Partisipasi</th><th data-k="4" data-n="1">Urbanisasi</th>
        <th data-k="5" data-n="1">IPM</th>
        <th data-k="6" data-n="1">Prabowo</th><th data-k="7" data-n="1">Anies</th><th data-k="8" data-n="1">Ganjar</th>
      </tr></thead>
      <tbody>{TABEL}</tbody>
    </table></div>
  </section>
</main>

<footer>Analisis Elektoral Pemilu 2024 | Wahyu Surya | Data: Simulasi berbasis pola KPU RI &amp; BPS</footer>

<script>
const tabs = document.querySelectorAll('#tabs button');
const panels = document.querySelectorAll('main .panel');
tabs.forEach(b => b.addEventListener('click', () => {{
  tabs.forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  panels.forEach(p => p.hidden = true);
  const el = document.getElementById(b.dataset.t);
  if (el) el.hidden = false;
  window.scrollTo({{top: 0, behavior:'smooth'}});
}}));

const tbl = document.getElementById('tblProv');
tbl.querySelectorAll('th').forEach(th => th.addEventListener('click', () => {{
  const k = +th.dataset.k, num = th.dataset.n === '1';
  const asc = th.dataset.asc !== '1';
  th.dataset.asc = asc ? '1' : '0';
  const rows = [...tbl.tBodies[0].rows];
  rows.sort((a,b) => {{
    let av = a.cells[k].innerText, bv = b.cells[k].innerText;
    if (num) {{ av = parseFloat(av.replace(/[^0-9.-]/g,'')); bv = parseFloat(bv.replace(/[^0-9.-]/g,'')); }}
    return asc ? (av>bv?1:-1) : (av<bv?1:-1);
  }});
  rows.forEach(r => tbl.tBodies[0].appendChild(r));
}}));
</script>
</body>
</html>
"""

with open('dashboard_elektoral_2024.html','w') as f:
    f.write(HTML)
print('OK: dashboard tersimpan (', len(HTML)//1024, 'KB )')
