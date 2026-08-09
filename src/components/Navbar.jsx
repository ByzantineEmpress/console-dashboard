import { Search, Settings as IconSettings, Home } from 'lucide-react'

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

export default Navbar
