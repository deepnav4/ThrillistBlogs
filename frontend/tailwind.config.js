/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'sans': ['Poppins', 'sans-serif'],
          'display': ['Poppins', 'sans-serif'],
        },
        colors: {
          dark: {
            100: '#E2E2E2',
            200: '#C5C5C5',
            300: '#A8A8A8',
            400: '#8B8B8B',
            500: '#6E6E6E',
            600: '#515151',
            700: '#343434',
            800: '#171717',
            900: '#0A0A0A',
          },
        },
        keyframes: {
          'scroll-left': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          'float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          'pulse-soft': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.8 },
          },
        },
        animation: {
          'scroll-left': 'scroll-left 30s linear infinite',
          'float': 'float 3s ease-in-out infinite',
          'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  }