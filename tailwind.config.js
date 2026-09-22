/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      colors: {
        brand: {
          dark: '#12183a',
          primary: '#4c4ddc',
          secondary: '#5a55e9',
          lightBlue: '#eef0fd',
          subtext: '#64748b',
          muted: '#8e96bf',
        }
      },
      boxShadow: {
        'soft-btn': '0 8px 25px -4px rgba(78, 93, 160, 0.12), 0 2px 6px 0 rgba(78, 93, 160, 0.06)',
        'btn-press': '0 2px 8px -2px rgba(78, 93, 160, 0.2)',
      }
    },
  },
  plugins: [],
}
