import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,json}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#030205",
        night: "#08070c",
        petal: "#f4a7be",
        champagne: "#f2d8a7",
        aurora: "#8bd9dd",
        violet: "#a88cff"
      },
      boxShadow: {
        "soft-glow": "0 0 40px rgba(244, 167, 190, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
