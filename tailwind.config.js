/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{tsx,jsx}"],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        expo: ["expo-Light", "sans-serif"],
        expoMedium: ["expo-Medium", "sans-serif"],
        expoBold: ["expo-Bold", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#3A3569",
          dark: "#18142D",
        },
        secondary: {
          light: "#F2C76A",
          dark: "#C9972D",
        },
        accent: {
          light: "#91C85C",
          dark: "#5F8C2D",
        },
      },
    },
  },
  plugins: [],
};
