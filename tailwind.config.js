/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{edge,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        primary: '#f58220',
      },
    },
  },
  plugins: [],
}
