import React from 'react'
import { LayoutDashboard, FileText, Settings as IconSettings } from 'lucide-react'

function Sidebar({ activeRoute, setActiveRoute }) {
  const routes = [
    { label: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
    { label: 'Notes', icon: FileText, path: 'notes' },
    { label: 'Settings', icon: IconSettings, path: 'settings' },
  ]
  return (
    <aside className="w-64 bg-console-bg border-r border-gray-800">
      <div className="p-4 flex items-center gap-3">
        <LayoutDashboard className="w-8 h-8 text-cyan-400" />
        <span className="text-xl font-bold text-white">Console</span>
      </div>
      <nav className="p-4">
        {routes.map((route) => (
          <button key={route.path} onClick={() => setActiveRoute(route.path)}
            className={activeRoute === route.path
              ? "w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors bg-cyan-500/10 text-cyan-400"
              : "w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors text-gray-400 hover:text-white hover:bg-gray-800"}>
            <route.icon className="w-5 h-5" />
            {route.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
