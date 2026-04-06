/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f7fc',
          100: '#e5eff8',
          200: '#c0d8ed',
          300: '#9bc1e2',
          400: '#5292cc',
          500: '#2f6eaa',
          600: '#2a6399',
          700: '#1e4f7a',
          800: '#173b5c',
          900: '#10283d',
          950: '#0a1a28',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        afacad: ['Afacad', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};