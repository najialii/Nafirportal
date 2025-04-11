/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{tsx,jsx}"],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        expo: ["Expo", "sans-serif"], // For Light font
        // expoMedium: ["Expo", "sans-serif"], // For Medium font
        // expoBold: ["Expo", "sans-serif"],   // For Bold font
      },
      colors: {
        primary: {
          light: "#618B44",
          dark: "#618B44",
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
