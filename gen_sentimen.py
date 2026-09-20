"""Generate data_sentimen_politik.csv (simulasi berbasis pola opini publik Jan-Jun 2024)."""
import numpy as np
import pandas as pd

np.random.seed(42)

topik = [
    "Pilpres 2024", "Pileg 2024", "Kabinet Prabowo", "Kenaikan Harga Pangan",
    "Korupsi", "Ekonomi", "Pendidikan", "Kesehatan", "Bansos", "IKN Nusantara"
]
bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"]

# baseline per topik (positif, netral, negatif)
baseline = {
    "Pilpres 2024":        (45, 30, 25),
    "Pileg 2024":          (38, 35, 27),
    "Kabinet Prabowo":     (42, 33, 25),
    "Kenaikan Harga Pangan":(15, 25, 60),
    "Korupsi":             (10, 20, 70),
    "Ekonomi":             (32, 30, 38),
    "Pendidikan":          (48, 32, 20),
    "Kesehatan":           (44, 30, 26),
    "Bansos":              (55, 25, 20),
    "IKN Nusantara":       (34, 28, 38),
}

rows = []
for t in topik:
    p, n, neg = baseline[t]
    for i, b in enumerate(bulan):
        drift = np.random.normal(0, 2.5, 3)
        p_i = max(1, p + drift[0] + (i * (-0.5 if t in ["Korupsi","Kenaikan Harga Pangan"] else 0.3)))
        neg_i = max(1, neg + drift[2] + (i * (0.6 if t in ["Korupsi","Kenaikan Harga Pangan"] else -0.2)))
        n_i = max(1, 100 - p_i - neg_i)
        s = p_i + n_i + neg_i
        p_i, n_i, neg_i = 100*p_i/s, 100*n_i/s, 100*neg_i/s
        volume = int(np.random.uniform(8000, 45000))
        rows.append({
            "topik": t,
            "bulan": b,
            "bulan_num": i+1,
            "positif_pct": round(p_i, 2),
            "netral_pct": round(n_i, 2),
            "negatif_pct": round(neg_i, 2),
            "volume_percakapan": volume,
        })

df = pd.DataFrame(rows)
df.to_csv("data_sentimen_politik.csv", index=False)
print(df.head())
print(f"rows: {len(df)}")
