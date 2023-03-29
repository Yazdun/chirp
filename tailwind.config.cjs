/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',

  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          100: '#f5f5ff',
        },
      },

      boxShadow: {
        sm: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        border: 'rgba(58,58,58,1) 0px 0px 0px 2px',
      },
    },
  },
  plugins: [],
}

module.exports = config
