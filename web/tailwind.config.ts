import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        panelSoft: "rgb(var(--panel-soft) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        textMuted: "rgb(var(--text-muted) / <alpha-value>)",
        gain: "rgb(var(--gain) / <alpha-value>)",
        loss: "rgb(var(--loss) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accentSoft: "rgb(var(--accent-soft) / <alpha-value>)"
      },
      boxShadow: {
        panel: "0 20px 45px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        panel: "28px"
      }
    }
  },
  plugins: []
};

export default config;

