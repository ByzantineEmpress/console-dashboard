import React, { useState } from 'react'
import { Star, FolderOpen, Settings as IconSettings, Shield, Gamepad2, Terminal, Network, Download, Upload, Mail, MessageSquare, ExternalLink, Trash2 } from 'lucide-react'
import { useConfig } from '../hooks/useConfig'

const ICON_MAP = {
  shield: 'Shield', gamepad2: 'Gamepad2', folder: 'FolderOpen',
  settings: 'Settings', terminal: 'Terminal', network: 'Network',
  download: 'Download', upload: 'Upload', mail: 'Mail', message: 'MessageSquare',
  external: 'ExternalLink', trash: 'Trash2', home: 'Home', dashboard: 'LayoutDashboard'
}

function EntryCard({ entry }) {
  const { toggleFavorite, addNote, notes, deleteNote } = useConfig()
  const [expanded, setExpanded] = useState(false)
  const isFavorited = notes.find(n => n.title === `⭐ ${entry.name}`)

  const icon = ICON_MAP[entry.icon]
  const IconComp = {
    Shield, Gamepad2, FolderOpen, Settings, Terminal, Network,
    Download, Upload, Mail, MessageSquare, ExternalLink, Trash2
  }[icon]

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <IconComp className="w-6 h-6 text-cyan-400" />
          <span className="font-semibold text-white">{entry.name}</span>
          <Star
            className={isFavorited ? 'w-5 h-5 text-yellow-400 fill-yellow-400' : 'w-5 h-5 text-gray-600'}
            onClick={() => toggleFavorite(entry.id)}
            aria-label="Toggle favorite"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-2">{entry.category}</p>
      <p className="text-sm text-gray-400 mb-3">{entry.description}</p>
      <div className="flex items-center gap-2">
        <button onClick={() => entry.url ? window.open(entry.url, '_blank') : alert('Configure path in Settings')}
          className="bg-cyan-500 text-black px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-cyan-400">
          Open
        </button>
      </div>
      <div className="mt-3 pt-2 border-t border-gray-700">
        <p className="text-xs text-gray-500 mb-1">Notes</p>
        <textarea className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600"
          rows={3}
          placeholder="Add a note..."
          onChange={(e) => {
            const existing = notes.find(n => n.title === `⭐ ${entry.name}`)
            if (existing) {
              const updated = notes.map(n => n.id === existing.id ? { ...existing, body: e.target.value } : n)
              // Save to config
            } else {
              addNote({ title: `⭐ ${entry.name}`, body: e.target.value })
            }
          }}
        />
      </div>
    </div>
  )
}

export default EntryCard
