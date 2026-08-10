module.exports = {
  content: [
    './index.html',
    './src/**/*.css',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.jsm',
  ],
  plugins: [
    require('tailwindcss')({
      theme: {
        extend: {
          colors: {
            console: {
              50: '#f0f9ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
              500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
              card: '#0d1117',
            },
          },
          fontFamily: {
            monospace: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
            sans: ['"Inter"', 'system-ui', 'sans-serif'],
          },
        },
      },
    }),
    require('autoprefixer')(),
  ],
}
