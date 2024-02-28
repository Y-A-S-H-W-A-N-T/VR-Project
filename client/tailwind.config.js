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
        two:["Nunito", "sans-serif"]
      }
    },
  },
  plugins: [],
}

