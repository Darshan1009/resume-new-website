import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          black: "#000000",
          deep: "#050505",
          panel: "#0a0a0a",
          line: "#1f1f1f",
        },
        term: {
          green: "#00FF66",
          blue: "#00E5FF",
          red: "#FF3B3B",
          amber: "#FFB020",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(0,229,255,0.35)",
        glowGreen: "0 0 24px rgba(0,255,102,0.35)",
      },
      animation: {
        flicker: "flicker 4s infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        scanbar: "scanbar 9s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.94" },
          "50%": { opacity: "0.6" },
          "55%": { opacity: "0.97" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        scanbar: {
          "0%": { transform: "translateY(-20vh)" },
          "100%": { transform: "translateY(120vh)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
