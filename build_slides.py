"""Bangun slide deck 14 halaman: Slides_Elektoral_2024.pptx"""
import json
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN

with open('metrik.json') as f: M = json.load(f)

NAVY  = RGBColor(0x0B, 0x1D, 0x3A)
CREAM = RGBColor(0xF7, 0xF5, 0xF0)
MERAH = RGBColor(0xC0, 0x39, 0x2B)
EMAS  = RGBColor(0xD4, 0xA0, 0x17)
BIRU  = RGBColor(0x2E, 0x86, 0xC1)
PUTIH = RGBColor(0xFF, 0xFF, 0xFF)
ABU   = RGBColor(0x5D, 0x6D, 0x7E)

prs = Presentation()
prs.slide_width  = Inches(13.333)
prs.slide_height = Inches(7.5)

def fill_bg(slide, color):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg.line.fill.background()
    bg.fill.solid(); bg.fill.fore_color.rgb = color
    slide.shapes._spTree.remove(bg._element)
    slide.shapes._spTree.insert(2, bg._element)
    return bg

def add_text(slide, x, y, w, h, teks, size=18, bold=False, color=NAVY,
             align=PP_ALIGN.LEFT, font='Calibri'):
    tb = slide.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame; tf.word_wrap = True
    tf.margin_left = tf.margin_right = 0
    if isinstance(teks, str): teks = [teks]
    for i, line in enumerate(teks):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        r = p.add_run(); r.text = line
        r.font.name = font; r.font.size = Pt(size); r.font.bold = bold
        r.font.color.rgb = color
    return tb

def add_bar(slide, x, y, w, h, color):
    sh = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    sh.line.fill.background(); sh.fill.solid(); sh.fill.fore_color.rgb = color
    return sh

def new_slide():
    return prs.slides.add_slide(prs.slide_layouts[6])  # blank

def header(slide, judul, warna_bg=CREAM, warna_teks=NAVY):
    fill_bg(slide, warna_bg)
    add_bar(slide, 0, Inches(0.35), Inches(0.4), Inches(0.6), MERAH)
    add_text(slide, Inches(0.7), Inches(0.3), Inches(11), Inches(0.7),
             judul, size=28, bold=True, color=warna_teks, font='Cambria')
    add_bar(slide, Inches(0.7), Inches(1.0), Inches(1.2), Emu(30000), EMAS)

def footer(slide, teks, warna=ABU):
    add_text(slide, Inches(0.5), Inches(7.05), Inches(12.3), Inches(0.35),
             teks, size=10, color=warna)

def add_image_center(slide, img_path, top=Inches(1.2), max_w=Inches(11), max_h=Inches(5.4)):
    pic = slide.shapes.add_picture(img_path, Inches(1.1), top,
                                    width=max_w)
    if pic.height > max_h:
        pic.height = max_h
        pic.width = int(max_h * (pic.width / pic.height)) if pic.height else pic.width
    pic.left = int((prs.slide_width - pic.width) / 2)
    return pic

# ---------- Slide 1: Cover ----------
s = new_slide(); fill_bg(s, NAVY)
add_bar(s, Inches(0.6), Inches(1.7), Inches(0.15), Inches(4), EMAS)
add_text(s, Inches(1.0), Inches(1.6), Inches(11), Inches(0.7),
         "PORTFOLIO PROJECT", size=16, bold=True, color=EMAS, font='Calibri')
add_text(s, Inches(1.0), Inches(2.1), Inches(11.5), Inches(2),
         "Analisis Data Elektoral\nPemilu 2024 Indonesia",
         size=48, bold=True, color=PUTIH, font='Cambria')
add_text(s, Inches(1.0), Inches(4.4), Inches(11.5), Inches(0.6),
         "Segmentasi Pemilih · Sentimen Publik · Model Prediktif",
         size=20, color=PUTIH, font='Calibri')
add_bar(s, Inches(1.0), Inches(5.6), Inches(4), Emu(30000), MERAH)
add_text(s, Inches(1.0), Inches(5.75), Inches(11), Inches(0.5),
         "Wahyu Surya", size=18, bold=True, color=PUTIH)
add_text(s, Inches(1.0), Inches(6.15), Inches(11), Inches(0.4),
         "Kandidat AI & Data Analyst — Partai Politik", size=13, color=EMAS)
footer(s, "September 2024 · Data: Simulasi berbasis pola KPU RI & BPS", warna=EMAS)

# ---------- Slide 2: Background ----------
s = new_slide(); header(s, "Latar Belakang")
add_text(s, Inches(0.7), Inches(1.5), Inches(12), Inches(4.5), [
    "· Pemilu 2024: pertama kali Pilpres + Pileg + Pilkada dalam satu tahun.",
    "· 204,8 juta pemilih terdaftar; Gen Z + Milenial > 55% populasi.",
    "· Fragmentasi 18 partai — ambang parlementer 4% menjadi filter yang menentukan koalisi.",
    "· Sentimen publik semakin volatil di kanal digital: harga pangan & korupsi mendominasi percakapan negatif.",
    "",
    "Tujuan analisis:",
    "   1. Memetakan basis suara partai & paslon per provinsi.",
    "   2. Menyegmentasi provinsi berdasarkan profil sosiodemografi.",
    "   3. Membangun model prediksi partisipasi & rekomendasi strategis.",
], size=17)
footer(s, "Slide 2/14 · Analisis Elektoral Pemilu 2024")

# ---------- Slide 3: Metodologi ----------
s = new_slide(); header(s, "Metodologi")
steps = [("Data Collection", "5 dataset · 38 provinsi", MERAH),
         ("Exploratory Analysis", "Kualitas · agregasi · visual", EMAS),
         ("Clustering", "K-Means (K=4) · PCA", BIRU),
         ("ML Modeling", "RF + GB · feature importance", MERAH),
         ("Recommendations", "Strategi partai", EMAS)]
x0 = Inches(0.7); w = Inches(2.3); gap = Inches(0.1); y = Inches(2.2)
for i, (t1, t2, c) in enumerate(steps):
    left = x0 + (w + gap) * i
    add_bar(s, left, y, w, Inches(2.4), c)
    add_text(s, left+Inches(0.15), y+Inches(0.2), w-Inches(0.3), Inches(0.5),
             f"STEP {i+1}", size=11, bold=True, color=PUTIH)
    add_text(s, left+Inches(0.15), y+Inches(0.8), w-Inches(0.3), Inches(0.8),
             t1, size=15, bold=True, color=PUTIH)
    add_text(s, left+Inches(0.15), y+Inches(1.6), w-Inches(0.3), Inches(0.6),
             t2, size=11, color=PUTIH)
add_text(s, Inches(0.7), Inches(5.2), Inches(12), Inches(1.5), [
    "Tech stack: Python 3.11 · pandas · scikit-learn · matplotlib · seaborn · Jupyter.",
    "Reproducibility: random_state=42, dataset publik yang telah dinormalisasi.",
], size=14, color=ABU)
footer(s, "Slide 3/14 · Analisis Elektoral Pemilu 2024")

TOTAL = 14

def content_slide(no, judul, img, insight_list):
    s = new_slide(); header(s, judul)
    add_image_center(s, img, top=Inches(1.2),
                     max_w=Inches(7.8), max_h=Inches(5.2))
    add_bar(s, Inches(9.1), Inches(1.3), Emu(30000), Inches(5), EMAS)
    add_text(s, Inches(9.3), Inches(1.25), Inches(3.8), Inches(0.4),
             "INSIGHT", size=12, bold=True, color=MERAH)
    add_text(s, Inches(9.3), Inches(1.7), Inches(3.8), Inches(5),
             insight_list, size=12, color=NAVY)
    footer(s, f"Slide {no}/{TOTAL} · Analisis Elektoral Pemilu 2024")
    return s

# ---------- Slide 4: Pilpres ----------
content_slide(4, "Hasil Pilpres 2024", "viz_pilpres.png", [
    "· Prabowo-Gibran menang mayoritas nasional.",
    "· Anies-Cak Imin kuat di Aceh & Sumbar (basis PKS/PKB).",
    "· Ganjar-Mahfud kompetitif hanya di Jateng & Bali.",
    "· Selisih Prabowo vs #2 rata-rata > 25%.",
])

# ---------- Slide 5: Peta Partai ----------
content_slide(5, "Peta Perolehan Partai", "viz_partai_nasional.png", [
    f"· {M['lolos_threshold']} partai lolos ambang 4%.",
    "· PDIP, Golkar, Gerindra tiga besar nasional.",
    "· PKB dominan di Jatim & Jateng (basis NU).",
    "· NasDem meraih 5 provinsi Sulawesi & NTT.",
])

# ---------- Slide 6: Battleground ----------
content_slide(6, "Battleground vs Safe Seat", "viz_battleground.png", [
    "· 5 provinsi margin < 15% (battleground).",
    "· Aceh, Sumbar, Jateng, DIY, Bali kunci.",
    "· Alokasi 60% budget → 5 battleground.",
    "· Safe seat: fokus mobilisasi turnout saja.",
])

# ---------- Slide 7: Demografi ----------
content_slide(7, "Partisipasi & Pemilih Muda", "viz_partisipasi.png", [
    f"· Partisipasi rata-rata: {M['partisipasi_rata2']:.1f}%.",
    "· Korelasi positif urbanisasi ↔ partisipasi.",
    "· Papua 6 provinsi < 76% (perlu intervensi).",
    "· Gen Z + Milenial > 50% populasi tiap provinsi.",
])

# ---------- Slide 8: Clustering ----------
content_slide(8, "Segmentasi 4 Cluster Provinsi", "viz_clustering.png", [
    "· Urban Progressive: DKI, DIY, Banten, Bali.",
    "· Rural Traditional: Jateng, Jatim, NTB.",
    "· Swing Moderate: mayoritas Sumatera & Sulawesi.",
    "· Emerging Region: Papua & sekitarnya.",
])

# ---------- Slide 9: Sentimen ----------
content_slide(9, "Sentimen Publik Jan–Jun 2024", "viz_sentimen.png", [
    "· Korupsi & harga pangan dominan negatif (> 60%).",
    "· Bansos & pendidikan konsisten positif.",
    "· Sentimen positif turun perlahan sepanjang H1 2024.",
    "· Volume percakapan puncak: Feb (masa kampanye).",
])

# ---------- Slide 10: ML Model ----------
s = new_slide(); header(s, "Model Prediktif — Partisipasi Pemilih")
add_image_center(s, "viz_feature_importance.png",
                 top=Inches(1.2), max_w=Inches(6.0), max_h=Inches(3.0))
add_image_center(s, "viz_prediction.png",
                 top=Inches(4.3), max_w=Inches(6.0), max_h=Inches(2.8))
add_bar(s, Inches(8.4), Inches(1.3), Emu(30000), Inches(5.5), EMAS)
add_text(s, Inches(8.6), Inches(1.25), Inches(4.4), Inches(0.4),
         "PERFORMA MODEL", size=12, bold=True, color=MERAH)
add_text(s, Inches(8.6), Inches(1.75), Inches(4.4), Inches(4), [
    f"Random Forest",
    f"   R² : {M['r2_rf']}",
    f"   MAE: {M['mae_rf']}%",
    "",
    f"Gradient Boosting",
    f"   R² : {M['r2_gb']}",
    f"   MAE: {M['mae_gb']}%",
    "",
    "Fitur paling berpengaruh:",
    "1. Penetrasi internet",
    "2. IPM",
    "3. Urbanisasi",
], size=13, color=NAVY)
footer(s, f"Slide 10/{TOTAL} · Analisis Elektoral Pemilu 2024")

# ---------- Slide 11: Kursi DPR & Koalisi ----------
s = new_slide(); header(s, "Estimasi Kursi DPR & Koalisi")
add_image_center(s, "viz_kursi_dpr.png", top=Inches(1.2),
                 max_w=Inches(6.2), max_h=Inches(2.8))
add_image_center(s, "viz_koalisi.png", top=Inches(4.2),
                 max_w=Inches(6.2), max_h=Inches(2.8))
add_bar(s, Inches(8.6), Inches(1.3), Emu(30000), Inches(5.5), EMAS)
add_text(s, Inches(8.8), Inches(1.25), Inches(4.2), Inches(0.4),
         "INSIGHT", size=12, bold=True, color=MERAH)
add_text(s, Inches(8.8), Inches(1.75), Inches(4.2), Inches(5), [
    "Metode Sainte-Lague",
    "580 kursi disederhanakan.",
    "",
    "Top 4 partai:",
    "· PDIP    ~99 kursi",
    "· Golkar  ~91 kursi",
    "· Gerindra ~79 kursi",
    "· PKB     ~63 kursi",
    "",
    "4 skenario koalisi lolos",
    "threshold capres 20%.",
], size=12, color=NAVY)
footer(s, f"Slide 11/{TOTAL} · Analisis Elektoral Pemilu 2024")

# ---------- Slide 12: Historis ----------
content_slide(12, "Tren Partai 2009–2024", "viz_historis.png", [
    "· Demokrat: 20,85% → 7,43% (–66%).",
    "· Gerindra: 4,46% → 13,22% (3x lipat).",
    "· PDIP stabil di > 14% empat pemilu.",
    "· NasDem tumbuh dari nol menjadi 9,65% (2024).",
])

# ---------- Slide 13: Rekomendasi ----------
s = new_slide(); header(s, "Rekomendasi Strategis")
rekom = [
    ("1", "Prioritaskan Pemilih Muda", "Kanal video pendek + micro-influencer di Urban Progressive.", MERAH),
    ("2", "Segmentasi Kampanye per Cluster", "Isu, tokoh & alokasi budget mengikuti profil cluster.", EMAS),
    ("3", "Serangan Antikorupsi", "Track-record & program stabilisasi harga pangan.", BIRU),
]
y = Inches(1.5)
for no, t1, t2, c in rekom:
    add_bar(s, Inches(0.7), y, Inches(0.9), Inches(0.9), c)
    add_text(s, Inches(0.7), y+Inches(0.1), Inches(0.9), Inches(0.7),
             no, size=32, bold=True, color=PUTIH, align=PP_ALIGN.CENTER)
    add_text(s, Inches(1.8), y, Inches(11), Inches(0.5),
             t1, size=18, bold=True, color=NAVY)
    add_text(s, Inches(1.8), y+Inches(0.5), Inches(11), Inches(0.5),
             t2, size=13, color=ABU)
    y += Inches(1.15)

add_bar(s, Inches(0.7), y+Inches(0.1), Inches(12), Emu(20000), EMAS)
add_text(s, Inches(0.7), y+Inches(0.3), Inches(11), Inches(0.4),
         "TECHNICAL RECOMMENDATIONS", size=13, bold=True, color=MERAH)
add_text(s, Inches(0.7), y+Inches(0.75), Inches(12), Inches(1.5), [
    "• Bangun pipeline sentimen realtime (Twitter/X + TikTok API) untuk deteksi isu.",
    "• Bangun dashboard command-center yang menggabungkan hasil clustering + tren historis untuk pengambilan keputusan H-100.",
], size=13, color=NAVY)
footer(s, f"Slide 13/{TOTAL} · Analisis Elektoral Pemilu 2024")

# ---------- Slide 14: Closing ----------
s = new_slide(); fill_bg(s, NAVY)
add_bar(s, Inches(0.6), Inches(1.8), Inches(0.15), Inches(3.5), EMAS)
add_text(s, Inches(1.0), Inches(1.5), Inches(11), Inches(1),
         "TERIMA KASIH", size=52, bold=True, color=PUTIH, font='Cambria')
add_text(s, Inches(1.0), Inches(2.8), Inches(11), Inches(0.6),
         "Diskusi & masukan sangat diapresiasi.", size=18, color=EMAS)
add_bar(s, Inches(1.0), Inches(4.0), Inches(11.3), Emu(20000), MERAH)
add_text(s, Inches(1.0), Inches(4.2), Inches(11), Inches(0.5),
         "Wahyu Surya", size=22, bold=True, color=PUTIH)
add_text(s, Inches(1.0), Inches(4.75), Inches(11), Inches(0.4),
         "AI & Data Analyst · wahyuarizeina@gmail.com", size=13, color=EMAS)
add_text(s, Inches(1.0), Inches(5.6), Inches(11), Inches(0.4),
         "TECH STACK", size=13, bold=True, color=EMAS)
add_text(s, Inches(1.0), Inches(6.0), Inches(11), Inches(0.5),
         "Python · pandas · scikit-learn · matplotlib · seaborn · Jupyter · HTML/CSS/JS",
         size=13, color=PUTIH)
footer(s, f"Slide 14/{TOTAL} · Data: Simulasi berbasis pola KPU RI & BPS", warna=EMAS)

prs.save('Slides_Elektoral_2024.pptx')
print('OK: slide deck 14 halaman tersimpan')
