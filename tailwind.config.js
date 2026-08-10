/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/styles.css',
    './src/App.jsx',
    './src/main.jsx',
    './src/router.jsx',
    './src/components/Sidebar.jsx',
    './src/components/EntryCard.jsx',
    './src/components/NoteCard.jsx',
    './src/components/Modal.jsx',
    './src/components/QuickLaunch.jsx',
    './src/components/EntryGrid.jsx',
    './src/components/Header.jsx',
    './src/pages/Dashboard.jsx',
    './src/pages/NotesPage.jsx',
    './src/pages/SettingsPage.jsx',
    './src/pages/NotesListPage.jsx',
    './src/utils/format.js',
    './src/utils/formatDate.js',
  ],
  theme: {
    extend: {
      colors: {
        console: {
          50: '#0f172a',
          900: '#020617',
          accent: '#06b6d4',
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
