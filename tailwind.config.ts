import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#09090B",
        surface: {
          DEFAULT: "#111114",
          card: "#16161B",
          hover: "#1C1C22",
          input: "#141418",
          raised: "#18181C",
        },
        border: {
          subtle: "#222227",
          medium: "#2D2D35",
          focus: "#FF6A00",
        },
        primary: {
          DEFAULT: "#F4F4F5",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },
        accent: {
          safety: "#FF6A00",
          hover: "#FF8533",
          pressed: "#D95900",
          glow: "rgba(255, 106, 0, 0.12)",
        },
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
          info: "#3B82F6",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 0 25px rgba(255, 106, 0, 0.15)",
        floating: "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
      },
      borderRadius: {
        "2xl": "16px",
      },
      lineHeight: {
        relaxed: "1.65",
      },
    },
  },
  plugins: [],
};

export default config;
