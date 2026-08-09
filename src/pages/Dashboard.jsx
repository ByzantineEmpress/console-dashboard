import React from 'react'
import { Search, Filter, Star, FileText, MessageSquare, Trash2, ArrowRight, Home as HomeIcon, LayoutDashboard as DashboardIcon, Gamepad2 } from 'lucide-react'
import EntryCard from '../components/EntryCard'
import { useConfig } from '../hooks/useConfig'

function Dashboard() {
  const { entries, search, setSearch, filter, setFilter } = useConfig()

  const categories = [
    { label: 'All', value: '' },
    { label: 'Repair', value: 'repair' },
    { label: 'Modding', value: 'modding' },
    { label: 'Networking', value: 'networking' },
  ]

  const filtered = entries.filter(e => {
    const matchSearch = !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
    const matchFilter = !filter || e.category === filter
    return matchSearch && matchFilter
  })

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-white">Tools</h2>
        <Search className="w-4 h-4 text-gray-500" />
        <input className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-600" placeholder="Search tools..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" value={filter || ''} onChange={e => setFilter(e.target.value)}>
          {categories.map(c => <option key={c.label} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(e => <EntryCard key={e.id} entry={e} />)}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No tools found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
