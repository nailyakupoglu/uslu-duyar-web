import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50: "#EDF6EE",
          500: "#428A4C",
          700: "#1A5E2B",
          900: "#092B16",
          DEFAULT: "#0D4525",
          foreground: "#FFFFFF"
        },
        accent: {
          50: "#FDF1E3",
          500: "#ED921F",
          700: "#B76412",
          DEFAULT: "#ED921F",
          foreground: "#FFFFFF"
        },
        accent2: {
          50: "#FCEAE8",
          500: "#E84B43",
          700: "#A82820",
          DEFAULT: "#E23B33",
          foreground: "#FFFFFF"
        },
        leaf: {
          50: "#EEF4E7",
          500: "#3E7D2E",
          700: "#2A5720"
        },
        earth: {
          50: "#F5EFE6",
          500: "#8B5A2B",
          700: "#5C3A18"
        },
        port: {
          50: "#EDF3F6",
          500: "#4D6875",
          700: "#253F4B",
          900: "#102633"
        },
        cold: {
          50: "#EAF6FB",
          500: "#3F9EC4",
          700: "#176D91",
          900: "#0D3F54"
        },
        harvest: {
          50: "#FBF2D7",
          500: "#D4A017",
          700: "#9C6F08"
        },
        ripe: {
          50: "#FCE9E6",
          500: "#C0392B",
          700: "#8B2820"
        },
        trust: {
          50: "#E8F4EF",
          500: "#2F7D62",
          700: "#155640"
        },
        cream: "#F8F4EA",
        "surface-field": "#F2F4EE",
        "surface-export": "#EEF4F1",
        "line-soft": "rgba(13, 69, 37, 0.14)",
        ink: "#0A140D",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at 78% 12%, rgba(237,146,31,.22), transparent 24%), linear-gradient(120deg, #0D4525 0%, #092B16 68%, #06150C 100%)",
        "footer-gradient": "radial-gradient(circle at 12% 0%, rgba(237,146,31,.10), transparent 30%), linear-gradient(145deg, #0B321B 0%, #082413 58%, #040D08 100%)",
        "cta-gradient": "linear-gradient(135deg, #ED921F 0%, #C0392B 100%)",
        "export-radar": "radial-gradient(circle at 12% 18%, rgba(63, 158, 196, 0.18), transparent 26%), radial-gradient(circle at 78% 6%, rgba(237, 146, 31, 0.16), transparent 24%), linear-gradient(135deg, #102633 0%, #0D4525 58%, #06150C 100%)"
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        },
        pulseHalo: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.35" },
          "50%": { transform: "scale(1.35)", opacity: "0.12" }
        },
        floatSeed: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(12px, -18px, 0) rotate(8deg)" }
        }
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        "pulse-halo": "pulseHalo 2.4s ease-in-out infinite",
        "float-seed": "floatSeed 9s ease-in-out infinite"
      }
    }
  },
  plugins: [animate]
} satisfies Config;

export default config;
