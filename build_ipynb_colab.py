"""Generate Analisis_Elektoral_Pemilu_2024_Colab.ipynb — versi self-contained.

Notebook Colab tidak butuh upload file apapun:
- pip install dependencies otomatis di cell pertama
- CSV di-load langsung dari GitHub raw URL
- Semua visualisasi tampil inline (tidak save PNG lokal)

User cukup upload 1 file .ipynb ini ke Colab → Runtime → Run all.
"""
import re
import nbformat as nbf
from nbclient import NotebookClient

# Baca script builder lokal & patch untuk Colab
with open('build_ipynb.py') as f:
    src = f.read()

BASE_URL = "https://raw.githubusercontent.com/wahyuarizeina/Analisis-Data-Elektoral-Pemilu-2024-Indonesia/main"

# Patch 1: Ganti data loading lokal → GitHub raw URL
src = src.replace(
    "df_partai   = pd.read_csv('data_suara_partai_per_provinsi.csv')",
    f"BASE_URL = '{BASE_URL}'\\n"
    "df_partai   = pd.read_csv(f'{BASE_URL}/data_suara_partai_per_provinsi.csv')"
)
src = src.replace(
    "df_pilpres  = pd.read_csv('data_pilpres_per_provinsi.csv')",
    "df_pilpres  = pd.read_csv(f'{BASE_URL}/data_pilpres_per_provinsi.csv')"
)
src = src.replace(
    "df_demo     = pd.read_csv('data_demografi_provinsi.csv')",
    "df_demo     = pd.read_csv(f'{BASE_URL}/data_demografi_provinsi.csv')"
)
src = src.replace(
    "df_sentimen = pd.read_csv('data_sentimen_politik.csv')",
    "df_sentimen = pd.read_csv(f'{BASE_URL}/data_sentimen_politik.csv')"
)
src = src.replace(
    "df_historis = pd.read_csv('data_historis_partai.csv')",
    "df_historis = pd.read_csv(f'{BASE_URL}/data_historis_partai.csv')"
)

# Patch 2: Hilangkan plt.savefig — cukup inline (biar simple di Colab)
src = re.sub(r"plt\.savefig\([^)]+\)\n", "", src)

# Patch 3: (skip — path relatif OK di kedua env)

# Patch 4: Ganti nama file output notebook
src = src.replace(
    "Analisis_Elektoral_Pemilu_2024.ipynb",
    "Analisis_Elektoral_Pemilu_2024_Colab.ipynb"
)

# Patch 5: Ganti pesan akhir
src = src.replace(
    "print('OK: notebook dieksekusi & disimpan')",
    "print('OK: notebook Colab dieksekusi & disimpan')"
)

# Eksekusi script yang sudah dipatch dalam scope terisolasi
ns = {}
exec(src.replace(
    "nb['cells'] = cells",
    "# Sisipkan install cell & pengantar Colab sebelum cells asli\n"
    "install_md = nbf.v4.new_markdown_cell('''# Analisis Elektoral Pemilu 2024 — Versi Google Colab\\n\\n"
    "**Cara pakai:** Runtime -> Run all (Ctrl+F9). Notebook ini fetch data langsung dari GitHub, "
    "tidak perlu upload file apapun.\\n\\n"
    "**Author:** Wahyu Surya | **Repo:** https://github.com/wahyuarizeina/Analisis-Data-Elektoral-Pemilu-2024-Indonesia''')\n"
    "install_code = nbf.v4.new_code_cell('''# Cell setup — install dependencies + verifikasi environment\\n"
    "!pip install -q python-pptx nbclient nbformat 2>/dev/null\\n"
    "import sys\\n"
    "print(f'Python {sys.version.split()[0]} - environment siap.')''')\n"
    "cells = [install_md, install_code] + cells\n"
    "nb['cells'] = cells"
), ns)

print('OK: notebook Colab tersimpan sebagai Analisis_Elektoral_Pemilu_2024_Colab.ipynb')
