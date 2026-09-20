import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pemilu 2024 Analytics · Wahyu Surya",
  description:
    "Portfolio AI & Data Analyst — analisis elektoral Pemilu 2024 Indonesia: EDA, K-Means, model prediktif, simulasi kursi DPR.",
  authors: [{ name: "Wahyu Surya" }],
  openGraph: {
    title: "Analisis Data Elektoral Pemilu 2024",
    description: "Portfolio AI & Data Analyst — 38 provinsi, 15 partai, 3 paslon.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
