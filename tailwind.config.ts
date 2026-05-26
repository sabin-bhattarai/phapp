import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#006D3A",
          50: "#E6F4EC",
          100: "#C2E3D0",
          200: "#9CD1B3",
          300: "#6EBB90",
          400: "#3FA870",
          500: "#006D3A",
          600: "#005E32",
          700: "#004D28",
          800: "#003B1E",
          900: "#002A15",
        },
        leaf: {
          DEFAULT: "#8DC63F",
          50: "#F3F9E8",
          100: "#E2F0C4",
          200: "#CCE599",
          300: "#B3D96A",
          400: "#9DCF4F",
          500: "#8DC63F",
          600: "#76A932",
          700: "#5E8A27",
          800: "#486B1D",
          900: "#324C13",
        },
        background: "#F5F5F2",
        "warm-white": "#FFFFFF",
        beige: "#DCC7A1",
        dark: "#1F2A1F",
        muted: "#7A7A7A",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "sans-serif"],
      },
      backgroundImage: {
        "forest-gradient": "linear-gradient(135deg, #006D3A 0%, #8DC63F 100%)",
        "hero-gradient":
          "linear-gradient(180deg, rgba(0,109,58,0.85) 0%, rgba(31,42,31,0.6) 50%, rgba(31,42,31,0.9) 100%)",
        "card-gradient":
          "linear-gradient(180deg, transparent 0%, rgba(31,42,31,0.85) 100%)",
        "eco-gradient":
          "linear-gradient(135deg, #E6F4EC 0%, #F5F5F2 50%, #F3F9E8 100%)",
      },
      boxShadow: {
        luxury: "0 20px 60px rgba(0, 109, 58, 0.15)",
        "luxury-lg": "0 30px 80px rgba(0, 109, 58, 0.2)",
        card: "0 8px 32px rgba(31, 42, 31, 0.12)",
        "card-hover": "0 20px 60px rgba(0, 109, 58, 0.25)",
        glow: "0 0 40px rgba(141, 198, 63, 0.3)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "leaf-fall": "leafFall 8s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
        "scale-in": "scaleIn 0.6s ease forwards",
        shimmer: "shimmer 2s infinite linear",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        leafFall: {
          "0%": { transform: "translateY(-10px) rotate(-10deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translateY(100vh) rotate(10deg)",
            opacity: "0",
          },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
