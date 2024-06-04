/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-pattern': "url('./assets/adminbg.avif')",
        'panel': "url('./assets/bgbg.jpg')",
        'selectbg':"url('./assets/adminbg.avif')"
      },
    },
  },
  plugins: [],
}

