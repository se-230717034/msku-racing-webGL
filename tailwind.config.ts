import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#080D1A",
        foreground: "#F5F4EF",
        navy: "#080D1A",
        university: "#252B87",
        burgundy: "#A00026",
        green: "#00652E",
        accent: "#A00026",
        muted: "#B7BAC7"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"]
      },
      backgroundImage: {
        "grid-dark": "linear-gradient(rgba(37,43,135,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(37,43,135,.10) 1px, transparent 1px)"
      },
      animation: {
        marquee: "marquee 24s linear infinite"
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
