import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0D1410",
        "ink-soft": "#16211B",
        "on-ink": "#F3F0ED",
        background: "#EFECE9",
        primary: "#1B4D3E",
        "primary-container": "#003629",
        secondary: "#85A98F",
        alert: "#E53E3E",
        warning: "#D97706",
        success: "#10B981",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        geist: ["var(--font-geist)", "monospace"],
      },
      letterSpacing: {
        label: "0.08em",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
      },
      borderWidth: {
        hairline: "1px",
      },
    },
  },
  plugins: [],
};

export default config;

