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
          50: "#F0F7F2",
          500: "#3D8B5E",
          700: "#0D4525",
          900: "#062818",
          DEFAULT: "#0D4525",
          foreground: "#FFFFFF"
        },
        accent: {
          50: "#FBF5E6",
          500: "#D4A017",
          700: "#9C7A0C",
          DEFAULT: "#D4A017",
          foreground: "#0E0E0E"
        },
        accent2: {
          50: "#FBE9E7",
          500: "#C0392B",
          700: "#8B2820",
          DEFAULT: "#C0392B",
          foreground: "#FFFFFF"
        },
        earth: {
          50: "#F5EFE6",
          500: "#8B4513",
          700: "#5C2D0E"
        },
        cream: "#FAF7F2",
        ink: "#0E0E0E",
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
        "hero-gradient": "linear-gradient(112.14deg, #0D4525 0%, #111 100%)",
        "footer-gradient": "linear-gradient(145deg, #062818 0%, #0D4525 50%, #111 100%)"
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
