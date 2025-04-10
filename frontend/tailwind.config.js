/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#0D1A33',
        'secondary-bg': '#1A2B4D',
        'light-blue': '#5EA0EE',
        'lighter-blue': '#97B2F4',
        'text-gray-blue': '#BCC4D7',
        'button-blue': '#58B4F0',
        'button-hover-blue': '#72C8FF',
        'github-bg': '#1E2D4D',
        'github-hover-bg': '#2B3C5F',
      },
    },
  },
  plugins: [],
}