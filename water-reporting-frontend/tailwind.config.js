/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        water: {
          50: "#F0F9F8",
          100: "#D4EFE9",
          200: "#A8DDD6",
          300: "#7DCCC3",
          400: "#52BAB0",
          500: "#27A89D",
          600: "#20897E",
          700: "#186A5F",
          800: "#104B40",
          900: "#082C21",
        },
        primary: {
          50: "#F0F9F8",
          100: "#D4EFE9",
          200: "#A8DDD6",
          300: "#7DCCC3",
          400: "#52BAB0",
          500: "#27A89D",
          600: "#20897E",
          700: "#186A5F",
          800: "#104B40",
          900: "#082C21",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        hover: "0 4px 16px rgba(0, 0, 0, 0.12)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
