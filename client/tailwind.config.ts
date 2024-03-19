import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],

  daisyui: {
    themes: [
      {
        light: {
          primary: "#d4eefa",
          secondary: "#b6ccde",
          accent: "#71c4ef",
          neutral: "#3b3c3f",
          "base-100": "#fff",
          info: "#3498db",
          success: "#4caf50",
          warning: "#ffc107",
          error: "#fd6c4c",
        },
        dark: {
          primary: "#8abed7",
          secondary: "#7aa0b5",
          accent: "#4b97cc" /* Adjusted accent color */,
          neutral: "#a5a6aa" /* Adjusted neutral color */,
          "base-100": "#2E2E2E" /* Dark background */,
          info: "#56a5e4" /* Adjusted information color */,
          success: "#68af5d" /* Adjusted success color */,
          warning: "#e3a503" /* Adjusted warning color */,
          error: "#e37c61" /* Adjusted error color */,
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
export default config;
