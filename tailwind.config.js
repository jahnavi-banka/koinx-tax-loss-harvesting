/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0052FE',
        'bg-dark': '#0F1629',
        'card-dark': '#192033',
        'success': '#00B865',
        'danger': '#E35050',
        'text-gray': '#738096',
        'border-gray': '#2A3446'
      }
    },
  },
  plugins: [],
}
