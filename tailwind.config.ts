import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Escala terracota (identidad "Claude Code"). 500+ mantiene contraste con texto blanco.
        brand: {
          50: "#fdf4ef",
          100: "#fae4d8",
          200: "#f4c6ae",
          300: "#ec9f7a",
          400: "#e07a4f",
          500: "#b8451f",
          600: "#9a3a1a",
          700: "#7c2f16",
          800: "#612613",
          900: "#4d2011",
        },
      },
    },
  },
  darkMode: "media",
  plugins: [],
};

export default config;
