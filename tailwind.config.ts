import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cedar: {
          black: "#000000",
          ink: "#050505",
          surface: "#0c0c0c",
          raised: "#141414",
          line: "rgba(255,255,255,0.1)",
          mist: "#a1a1a1",
          ivory: "#f4f1ea",
          accent: "#c9a86a",
          accentSoft: "rgba(201,168,106,0.14)",
        },
        cliq: {
          navy: {
            950: "#0A0A14",
            900: "#111122",
            850: "#1B1F30",
            800: "#262A3E",
            700: "#323654",
            600: "#424669",
            500: "#535780",
            400: "#6B6F8A",
            300: "#9B9FB8",
            200: "#C4C7D8",
            100: "#E2E4EF",
          },
          purple: {
            DEFAULT: "#1F3A5F",
            dark: "#182D49",
            deep: "#13253D",
            light: "#2A4A73",
            soft: "#E8EEF5",
          },
          teal: {
            DEFAULT: "#6B7280",
            rich: "#4B5563",
            dark: "#374151",
            light: "#9CA3AF",
            soft: "#F3F4F6",
          },
          white: "#FAFAFC",
          gray: {
            100: "#F2F2F8",
            200: "#E4E4EF",
            300: "#C8C8DE",
          },
          text: {
            heading: "#111122",
            body: "#374151",
            muted: "#6B7280",
          },
          gold: "#F5A623",
          success: "#22C55E",
          error: "#EF4444",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        purple: "0 8px 32px rgba(15,23,42,0.24)",
        teal: "0 8px 32px rgba(51,65,85,0.20)",
        card: "0 4px 16px rgba(10,10,20,0.10)",
        "card-hover": "0 8px 32px rgba(10,10,20,0.14)",
        glow: "0 0 80px rgba(15,23,42,0.18)",
        elegant: "0 24px 80px rgba(0,0,0,0.45)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        breathe: "breathe 3.2s ease-in-out infinite",
        "breathe-soft": "breatheSoft 4s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite alternate",
        marquee: "marquee 30s linear infinite",
        "marquee-r": "marqueeR 30s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        shimmer: "shimmer 1.8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1) translateY(0)" },
          "50%": { transform: "scale(1.035) translateY(-2px)" },
        },
        breatheSoft: {
          "0%, 100%": { transform: "scale(1) translateY(0)" },
          "50%": { transform: "scale(1.02) translateY(-1px)" },
        },
        glowPulse: {
          "0%": { boxShadow: "0 0 20px rgba(15,23,42,0.12)" },
          "100%": { boxShadow: "0 0 60px rgba(15,23,42,0.32)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeR: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
