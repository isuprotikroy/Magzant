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
          50: '#f5f7f8',
          100: '#e0e5e8',
          200: '#c1ccd2',
          300: '#9ba9b3',
          400: '#748D92', // Muted teal
          500: '#124E66', // Deep teal
          600: '#0e3e52',
          700: '#0b2f3e',
          800: '#071f2a',
          900: '#040f15',
        },
        dark: {
          50: '#f6f7f8',
          100: '#e2e5e7',
          200: '#c4ccd1',
          300: '#2e3944', // Medium slate
          400: '#212a31', // Dark slate
          500: '#1a222a',
          600: '#141a20',
          700: '#0f1317',
          800: '#0a0c0e',
          900: '#050607',
        },
        accent: {
          50: '#fdfde8',
          100: '#fbfbd1',
          200: '#f7f7a3',
          300: '#f3f375',
          400: '#D3D904', // Bright lime
          500: '#a8ad03',
          600: '#7e8202',
          700: '#545602',
          800: '#2a2b01',
          900: '#151501',
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
