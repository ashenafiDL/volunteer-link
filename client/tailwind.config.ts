import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        100: "rgb(var(--primary-100) / <alpha-value>)",
        200: "rgb(var(--primary-200) / <alpha-value>)",
        300: "rgb(var(--primary-300) / <alpha-value>)",
      },
      accent: {
        100: "rgb(var(--accent-100) / <alpha-value>)",
        200: "rgb(var(--accent-200) / <alpha-value>)",
      },
      text: {
        100: "rgb(var(--text-100) / <alpha-value>)",
        200: "rgb(var(--text-200) / <alpha-value>)",
      },
      bg: {
        100: "rgb(var(--bg-100) / <alpha-value>)",
        200: "rgb(var(--bg-200) / <alpha-value>)",
        300: "rgb(var(--bg-300) / <alpha-value>)",
      },
      error: "rgb(var(--error) / <alpha-value>)",
      warning: "rgb(var(--warning) / <alpha-value>)",
      success: "rgb(var(--success) / <alpha-value>)",
      info: "rgb(var(--info) / <alpha-value>)",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        // xl: "5rem",
        // "2xl": "6rem",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms")],
};
export default config;
