/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Oswald: ["Oswald"],
        Poppins: ["Poppins"],
        mulish: ["Mulish", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        dmSans: ["'DM Sans'", "sans-serif"],
        jost: ["Jost", "sans-serif"],
        rancho: ['Rancho', 'cursive'],
        nunito: ['"Nunito Sans"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        PlusJakartaSansMedium: ['PlusJakartaSansMedium', 'sans-serif'],


      },
      extend: {
        animation: {
          fadeIn: 'fadeIn 1s ease-in-out forwards',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        },
      },
    },
  },
  plugins: [],
};
