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
        // inter: ["Inter", "sans-serif"],

        manrope: "Manrope",
        gilroy: "Gilroy",
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
        "secondary-blue-100": "#2481ce",
        "secondary-blue-100b": "#EBF3F9",
        
        "light-white": {
          DEFAULT: "#ebe7de", 
          100: "rgba(59,60,152,0.02)",
          200: "rgba(59,60,152,0.03)"
        },
        grey: "#747A88",


       
        black: "#000",
        gray1: "rgba(0, 0, 0, 0.5)",
        whitesmoke: "#f5f5f5",
        "primary-light": "#f1f2f4",
        deepskyblue: {
          "100": "#00aff5",
          "200": "rgba(0, 175, 245, 0.08)",
        },
        "gray-200": "#e5e7eb",
        darkslategray: "#054752",
        "gray-800": "#1f2937",
        dark: "#0f1113",
      },

      backgroundImage: {
        'pattern': "url('/pattern.png')",
        'hero-bg': "url('/hero-bg.png')"
      },





      spacing: {},
      
      borderRadius: {
        "8xs-4": "4.4px",
        "5xs-3": "7.3px",
        "smi-2": "12.2px",
        "29xl": "48px",
        "3xs": "10px",
      },
    },

    fontSize: {
      "5xl": "24px",
      xl: "20px",
      "3xl-1": "22.1px",
      "base-5": "15.5px",
      lg: "18px",
      "6xl-2": "25.2px",
      base: "16px",
      "lgi-6": "19.6px",
      "13xl": "32px",
      "2xl-3": "21.3px",
      "10xl-8": "29.8px",
      "23xl": "42px",
      "58xl": "77px",
      "3xl": "22px",
      "5xl-6": "24.6px",
      inherit: "inherit",
    },
  },
  plugins: [],

};

