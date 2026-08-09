/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,tsx,jsm}'],
  theme: {
    extend: {
      colors: {
        console: {
          50: '#0f172a',
          900: '#020617',
          accent: '#06b6d4', // cyan-500
          accentHover: '#0891b2',
          accentDim: '#0f172a',
          card: '#0e1019',
          cardHover: '#111724',
        },
      },
      fontFamily: {
        monospace: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
