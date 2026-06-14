import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["'Kanit'", "sans-serif"],
      },
      colors: {
        dark: '#0C0C0C',
        text: '#D7E2EA',
      },
    },
  },
  plugins: [],
} satisfies Config
