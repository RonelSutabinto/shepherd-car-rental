/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "black-100": "#2B2C35",
        "primary-blue": {
          DEFAULT: "#13374d",
          100: "#F5F8FF",
        },
        "secondary-orange": "#be853d",
        "secondary-light":  "#cec2b5",

        "secondary-blue": "#00567f",

        "light-white": {
          DEFAULT: "#ebe7de", 
          100: "rgba(59,60,152,0.02)",
          200: "rgba(59,60,152,0.03)"
        },
        grey: "#747A88",
      },
      backgroundImage: {
        'pattern': "url('/pattern.png')",
        'hero-bg': "url('/hero-bg.png')"
      }
    },
  },
  plugins: [],
};

