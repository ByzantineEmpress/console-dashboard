import React from 'react'
import { Star, FolderOpen, Terminal, ExternalLink, Shield, Gamepad2 } from 'lucide-react'
import { useConfig } from '../hooks/useConfig'

function EntryCard({ entry }) {
  const { updateEntry } = useConfig()
  const Icon = entry.icon === 'shield' ? Shield : 
              entry.icon === 'gamepad2' ? Gamepad2 :
              entry.icon === 'folder' ? FolderOpen :
              entry.icon === 'terminal' ? Terminal :
              entry.icon === 'network' ? Network :
              entry.icon === 'external' ? ExternalLink :
              FolderOpen

  return (
    <div className="bg-console-card border border-gray-800 rounded-xl p-4 transition-all hover:border-cyan-500/30">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{entry.name}</h3>
          <p className="text-xs text-gray-500 capitalize mt-0.5">{entry.category}</p>
        </div>
        <button onClick={() => updateEntry(entry.id, { pinned: !entry.pinned })}
          className="p-1.5 rounded-lg text-gray-600 hover:text-yellow-400 transition-colors">
          <Star className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default EntryCard
