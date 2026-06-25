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
          50: "#EAF7EB",
          500: "#43B14E",
          700: "#1F7A2A",
          900: "#12551C",
          DEFAULT: "#2E9E3A",
          foreground: "#FFFFFF"
        },
        accent: {
          50: "#FDF1E3",
          500: "#F39A3E",
          700: "#B85E10",
          DEFAULT: "#ED8120",
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
        cream: "#FAF7F2",
        "surface-field": "#F6F7F4",
        "surface-export": "#EEF4F1",
        "line-soft": "rgba(13, 69, 37, 0.14)",
        ink: "#161A14",
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
        "hero-gradient": "linear-gradient(120deg, #2E9E3A 0%, #15571E 68%, #0C3B16 100%)",
        "footer-gradient": "linear-gradient(145deg, #12551C 0%, #1F7A2A 55%, #0C3B16 100%)",
        "cta-gradient": "linear-gradient(135deg, #ED8120 0%, #E23B33 100%)",
        "export-radar": "radial-gradient(circle at 12% 18%, rgba(63, 158, 196, 0.22), transparent 26%), radial-gradient(circle at 78% 6%, rgba(212, 160, 23, 0.18), transparent 24%), linear-gradient(135deg, #102633 0%, #12551C 58%, #062818 100%)"
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
