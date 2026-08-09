import React, { useState } from 'react'
import { LayoutDashboard, FileText, Settings, Home, Search } from 'lucide-react'
import { useConfig } from './hooks/useConfig'
import Dashboard from './pages/Dashboard'
import NotesPage from './pages/NotesPage'
import SettingsPage from './pages/SettingsPage'

function Sidebar({ activeRoute, setActiveRoute }) {
  const routes = [
    { label: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
    { label: 'Notes', icon: FileText, path: 'notes' },
    { label: 'Settings', icon: Settings, path: 'settings' },
  ]

  return (
    <aside className="w-64 bg-console-bg border-r border-gray-800">
      <div className="p-4 flex items-center gap-3">
        <LayoutDashboard className="w-8 h-8 text-cyan-400" />
        <span className="text-xl font-bold text-white">Console</span>
      </div>
      <nav className="p-4">
        {routes.map((route) => (
          <button
            key={route.path}
            onClick={() => setActiveRoute(route.path)}
            className={
              activeRoute === route.path
                ? 'w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors bg-cyan-500/10 text-cyan-400'
                : 'w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors text-gray-400 hover:text-white hover:bg-gray-800'
            }
          >
            <route.icon className="w-5 h-5" />
            {route.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

function Navbar({ activeRoute, setActiveRoute }) {
  return (
    <div className="bg-console-bg border-b border-gray-800 px-4 py-2 flex items-center gap-2">
      <button onClick={() => setActiveRoute('dashboard')} className="p-1.5 rounded-lg text-cyan-400">
        <Home className="w-5 h-5" />
      </button>
      <div className="flex-1 relative">
        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
        <input className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-600" placeholder="Search tools..." />
      </div>
    </div>
  )
}

function App() {
  const [activeRoute, setActiveRoute] = useState('dashboard')
  return (
    <div className="min-h-screen bg-console-bg">
      <Sidebar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
      <div className="flex-1">
        <Navbar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
        <main className="p-6">
          {activeRoute === 'dashboard' && <Dashboard />}
          {activeRoute === 'notes' && <NotesPage />}
          {activeRoute === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  )
}

export default App
