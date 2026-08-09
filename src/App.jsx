import React, { useState } from 'react'
import { LayoutDashboard, FileText, Settings as IconSettings, Home } from 'lucide-react'
import { useConfig } from './hooks/useConfig'
import Dashboard from './pages/Dashboard'
import NotesPage from './pages/NotesPage'
import SettingsPage from './pages/SettingsPage'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

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
