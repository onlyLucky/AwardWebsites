/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#c4b5a0',
        background: '#000000',
      },
      fontFamily: {
        'stix': ['Stix Two Text', 'serif'],
      },
    },
  },
  plugins: [],
}