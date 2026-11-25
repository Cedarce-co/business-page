import type { Config } from "tailwindcss";

/**
 * Cedarce design system: white + Cedarce blue only.
 *
 * `brand` is generated from Cedarce blue (#1F3A5F, hue ≈ 215°) - every shade
 * is a lighter or more vivid variation of that single hue.
 *
 * Tailwind's stock palettes that the app already uses (slate, zinc, gray,
 * emerald, amber, blue, …) are remapped onto the same hue so every existing
 * screen (customer dashboard, admin, emails previews) inherits the brand
 * without hand-editing hundreds of class names. `rose`/`red` are kept as the
 * single exception, for destructive actions and validation errors.
 */

const brand = {
  50: "#F2F7FD",
  100: "#E5EEFA",
  200: "#C8DBF4",
  300: "#99BCEA",
  400: "#6098E1",
  500: "#347AD5",
  600: "#2A65B2",
  700: "#27538B",
  800: "#1F3A5F", // Cedarce blue
  900: "#162B46",
  950: "#0C1A2C",
};

/** Blue-tinted neutrals (same hue, low saturation). */
const slate = {
  50: "#F6F8FB",
  100: "#ECF0F6",
  200: "#DDE4EE",
  300: "#C5CFDD",
  400: "#8D9CB0",
  500: "#62758D",
  600: "#4C5E76",
  700: "#374A62",
  800: "#24354C",
  900: "#152437",
  950: "#0B1523",
};

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand,
        ink: { DEFAULT: brand[950], soft: slate[600], muted: slate[500] },
        line: { DEFAULT: "#E3EAF4", strong: brand[200] },

        // Remapped stock palettes → Cedarce blue family.
        slate,
        gray: slate,
        zinc: slate,
        neutral: slate,
        stone: slate,
        blue: brand,
        sky: brand,
        indigo: brand,
        violet: brand,
        purple: brand,
        cyan: brand,
        teal: brand,
        emerald: brand,
        green: brand,
        // Warnings / pending: soft blue-grey so they stay distinct from "done" (brand).
        amber: slate,
        yellow: slate,
        orange: slate,

        // Legacy dashboard tokens, now pointing at the new system.
        cliq: {
          navy: {
            950: brand[950],
            900: brand[900],
            850: brand[800],
            800: brand[800],
            700: brand[700],
            600: slate[600],
            500: slate[500],
            400: slate[400],
            300: slate[300],
            200: slate[200],
            100: slate[100],
          },
          purple: {
            DEFAULT: brand[600],
            dark: brand[700],
            deep: brand[800],
            light: brand[500],
            soft: brand[50],
          },
          teal: {
            DEFAULT: slate[500],
            rich: slate[600],
            dark: slate[700],
            light: slate[400],
            soft: slate[100],
          },
          white: "#FFFFFF",
          gray: {
            50: slate[50],
            100: slate[100],
            200: slate[200],
            300: slate[300],
          },
          text: {
            heading: brand[950],
            body: slate[700],
            muted: slate[500],
          },
          gold: brand[400],
          success: brand[500],
          error: "#E11D48",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(31,58,95,0.05), 0 8px 24px -10px rgba(31,58,95,0.14)",
        lift: "0 2px 4px rgba(31,58,95,0.04), 0 24px 48px -18px rgba(31,58,95,0.28)",
        glow: "0 18px 50px -12px rgba(52,122,213,0.55)",
        "glow-sm": "0 8px 24px -8px rgba(52,122,213,0.55)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.7), 0 10px 40px -12px rgba(31,58,95,0.22)",
        // legacy names
        purple: "0 8px 32px rgba(31,58,95,0.24)",
        teal: "0 8px 32px rgba(31,58,95,0.18)",
        card: "0 1px 2px rgba(31,58,95,0.05), 0 8px 24px -10px rgba(31,58,95,0.14)",
        "card-hover": "0 2px 4px rgba(31,58,95,0.04), 0 24px 48px -18px rgba(31,58,95,0.28)",
        elegant: "0 24px 80px -20px rgba(31,58,95,0.30)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        breathe: "breathe 3.2s ease-in-out infinite",
        "breathe-soft": "breatheSoft 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-r": "marqueeR 40s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
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
