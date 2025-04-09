/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Oswald: ["Oswald"],
        Poppins: ["Poppins"], // Add your custom font
        mulish: ["Mulish", "sans-serif"], // ✅ Add Mulish here
        raleway: ["Raleway", "sans-serif"],
        dmSans: ["'DM Sans'", "sans-serif"],
        jost: ["Jost", "sans-serif"],


      },
    },
  },
  plugins: [],
};
