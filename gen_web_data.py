"""Generate web/lib/data.ts dari CSV & metrik.json."""
import json, pandas as pd

demo = pd.read_csv('data_demografi_provinsi.csv')
pil  = pd.read_csv('data_pilpres_per_provinsi.csv')
par  = pd.read_csv('data_suara_partai_per_provinsi.csv')
hist = pd.read_csv('data_historis_partai.csv')
sen  = pd.read_csv('data_sentimen_politik.csv')
with open('metrik.json') as f: M = json.load(f)

pil_prov = pil.pivot(index='provinsi', columns='paslon', values='persentase_suara').reset_index()
demo_join = demo.merge(pil_prov, on='provinsi')

partai_nas = (par.groupby('partai')['jumlah_suara'].sum()
                 .sort_values(ascending=False))
total = partai_nas.sum()
partai_pct = (partai_nas / total * 100).round(2).reset_index()
partai_pct.columns = ['partai','pct']

def js(v):
    return json.dumps(v, ensure_ascii=False)

lines = [
    "// AUTO-GENERATED via gen_web_data.py — jangan edit manual",
    "",
    "export type Provinsi = {",
    "  provinsi: string; populasi: number; dpt: number;",
    "  partisipasi: number; urbanisasi: number; ipm: number;",
    "  kemiskinan: number; internet: number; genZ: number; milenial: number;",
    "  prabowo: number; anies: number; ganjar: number;",
    "};",
    "",
    "export const provinsi: Provinsi[] = [",
]
for _, r in demo_join.iterrows():
    lines.append("  {" + ", ".join([
        f"provinsi:{js(r['provinsi'])}",
        f"populasi:{int(r['populasi'])}", f"dpt:{int(r['dpt'])}",
        f"partisipasi:{round(r['tingkat_partisipasi']*100,2)}",
        f"urbanisasi:{r['urbanisasi_pct']}", f"ipm:{r['ipm']}",
        f"kemiskinan:{r['tingkat_kemiskinan']}", f"internet:{r['penetrasi_internet_pct']}",
        f"genZ:{r['gen_z_pct']}", f"milenial:{r['milenial_pct']}",
        f"prabowo:{r['Prabowo-Gibran']}",
        f"anies:{r['Anies-Cak Imin']}",
        f"ganjar:{r['Ganjar-Mahfud']}",
    ]) + "},")
lines.append("];\n")

lines.append("export const partaiNasional = [")
for _, r in partai_pct.iterrows():
    lines.append(f"  {{ partai:{js(r['partai'])}, pct:{r['pct']} }},")
lines.append("];\n")

# historis
lines.append("export const historis = [")
for _, r in hist.iterrows():
    lines.append(f"  {{ partai:{js(r['partai'])}, tahun:{int(r['tahun_pemilu'])}, pct:{r['persentase_suara']} }},")
lines.append("];\n")

# sentimen
sen_agg = sen.groupby('topik')[['positif_pct','netral_pct','negatif_pct']].mean().round(2).reset_index()
lines.append("export const sentimenTopik = [")
for _, r in sen_agg.iterrows():
    lines.append(f"  {{ topik:{js(r['topik'])}, positif:{r['positif_pct']}, netral:{r['netral_pct']}, negatif:{r['negatif_pct']} }},")
lines.append("];\n")

# metrik
lines.append(f"export const metrik = {json.dumps(M, indent=2)} as const;\n")

# tambah pilpres nasional
pil_nas = pil.groupby('paslon')['jumlah_suara'].sum()
pil_nas_pct = (pil_nas / pil_nas.sum() * 100).round(2)
lines.append("export const pilpresNasional = [")
for p in ['Prabowo-Gibran','Anies-Cak Imin','Ganjar-Mahfud']:
    lines.append(f"  {{ paslon:{js(p)}, suara:{int(pil_nas[p])}, pct:{pil_nas_pct[p]} }},")
lines.append("];\n")

with open('web/lib/data.ts', 'w') as f:
    f.write("\n".join(lines))
print(f'OK: web/lib/data.ts ({len(demo_join)} provinsi, {len(partai_pct)} partai)')
