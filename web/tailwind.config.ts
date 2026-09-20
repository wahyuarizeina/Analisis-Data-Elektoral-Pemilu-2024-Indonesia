import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1D3A",
        merah: "#C0392B",
        biru: "#2E86C1",
        emas: "#D4A017",
        hijau: "#1E8449",
        cream: "#F7F5F0",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        serif: ["'Cambria'", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
