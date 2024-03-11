/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        one:["Libre Baskerville", "serif","bold-700"],
        two:["Nunito", "sans-serif"],
        new:["Archivo Black", "sans-serif","font-weight-400"]
      },
      backgroundImage: {
        'furr': "url('../assets/furnitureback.png')",
        'whiti': "url('../assets/whiti.jpg')"
      }
    },
  },
  plugins: [],
}

