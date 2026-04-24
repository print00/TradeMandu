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
        panel: "0 18px 40px rgba(8, 15, 36, 0.08)",
        depth: "0 32px 80px rgba(8, 15, 36, 0.16)",
        glow: "0 0 0 1px rgba(96, 165, 250, 0.18), 0 20px 60px rgba(37, 99, 235, 0.18)"
      },
      borderRadius: {
        panel: "8px"
      },
      animation: {
        "fade-up": "fadeUp 700ms ease forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.8s linear infinite",
        drift: "drift 18s linear infinite"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
