import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEYS = {
  entries: 'dashboard_entries',
  notes: 'dashboard_notes',
  settings: 'dashboard_settings',
}

const DEFAULT_ENTRIES = [
  { id: '1', name: 'Drift Guard', category: 'repair', type: 'web', url: 'https://driftguard.com', localPath: null, description: 'Drift Guard - driftguard.com', pinned: false, icon: 'shield', tags: ['drift', 'modding'] },
  { id: '2', name: 'Console Mods', category: 'repair', type: 'web', url: 'https://consolemods.com', localPath: null, description: 'Console Mods - consolemods.com', pinned: false, icon: 'shield', tags: ['modding', 'console'] },
  { id: '3', name: 'FatXplorer', category: 'tool', type: 'local', url: null, localPath: null, description: 'FatXplorer - file browser for Xbox/PC', pinned: false, icon: 'folder', tags: ['tool', 'fatx'] },
  { id: '4', name: 'J-Runner', category: 'tool', type: 'local', url: null, localPath: null, description: 'J-Runner (JR-Cache) - Xbox console tool', pinned: false, icon: 'folder', tags: ['tool', 'console', 'j-runner'] },
  { id: '5', name: 'Zadig', category: 'tool', type: 'local', url: null, localPath: null, description: 'Zadig - USB device manager', pinned: false, icon: 'folder', tags: ['tool', 'usb'] },
  { id: '6', name: 'FTP Client', category: 'networking', type: 'local', url: null, localPath: null, description: 'FTP Client - file transfer', pinned: false, icon: 'folder', tags: ['networking', 'ftp'] },
]

const DEFAULT_NOTES = []

const DEFAULT_SETTINGS = {
  fatXplorerPath: null,
  jRunnerPath: null,
  zadigPath: null,
  ftpPath: null,
  firstRunDone: false,
}

function load(key, fallback) {
  const raw = localStorage.getItem(key)
  try {
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function useConfig() {
  const [entries, setEntries] = useState(() => load(STORAGE_KEYS.entries, DEFAULT_ENTRIES))
  const [notes, setNotes] = useState(() => load(STORAGE_KEYS.notes, DEFAULT_NOTES))
  const [settings, setSettings] = useState(() => load(STORAGE_KEYS.settings, DEFAULT_SETTINGS))

  // Derived state
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  const toggleFavorite = useCallback((id) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, pinned: !e.pinned } : e))
  }, [])

  const addNote = useCallback((title, body, tags) => {
    const note = {
      id: Date.now().toString(),
      title,
      body,
      tags: tags || [],
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    }
    setNotes(prev => [...prev, note])
    save(STORAGE_KEYS.notes, notes)
    return note
  }, [])

  const updateNote = useCallback((id, data) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...data, modifiedAt: new Date().toISOString() } : n))
    save(STORAGE_KEYS.notes, notes)
  }, [])

  const deleteNote = useCallback((id) => {
    setNotes(prev => prev.filter(n => n.id !== id))
    save(STORAGE_KEYS.notes, notes)
  }, [])

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: value }
      save(STORAGE_KEYS.settings, updated)
      return updated
    })
  }, [])

  return {
    entries,
    notes,
    settings,
    search,
    setSearch,
    filter,
    setFilter,
    toggleFavorite,
    addNote,
    updateNote,
    deleteNote,
    updateSetting,
  }
}
