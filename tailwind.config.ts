import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050608",
        surface: "#0B0D10",
        surfaceElevated: "#12151A",
        accent: {
          DEFAULT: "#E6B35A",
          soft: "#8C6B2B"
        },
        muted: "#8B94A7",
        borderSoft: "#1C2027"
      },
      boxShadow: {
        "soft-card":
          "0 18px 45px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02)"
      },
      borderRadius: {
        card: "1.75rem"
      },
      fontFamily: {
        sans: ["system-ui", "SF Pro Text", "Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

