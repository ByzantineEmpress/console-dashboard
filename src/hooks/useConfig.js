import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEYS = {
  entries: 'dashboard_entries',
  notes:   'dashboard_notes',
  settings: 'dashboard_settings',
}

const DEFAULT_ENTRIES = {
  entries: [
    { id: '1', name: 'Drift Guard', category: 'mod_site', type: 'web', url: 'https://driftguard.com', localPath: null, description: 'Drift Guard - driftguard.com', pinned: false, notes: '', icon: 'shield', tags: ['drift', 'modding'] },
    { id: '2', name: 'Console Mods', category: 'mod_site', type: 'web', url: 'https://consolemods.com', localPath: null, description: 'Console Mods - consolemods.com', pinned: false, notes: '', icon: 'shield', tags: ['modding', 'console'] },
    { id: '3', name: 'FatXplorer', category: 'tool', type: 'local', url: null, localPath: null, description: 'FatXplorer - file browser for Xbox/PC', pinned: false, notes: '', icon: 'folder', tags: ['tool', 'fatx'] },
    { id: '4', name: 'J-Runner', category: 'tool', type: 'local', url: null, localPath: null, description: 'J-Runner (JR-Cache) - Xbox console tool', pinned: false, notes: '', icon: 'folder', tags: ['tool', 'console', 'j-runner'] },
    { id: '5', name: 'Zadig', category: 'tool', type: 'local', url: null, localPath: null, description: 'Zadig - USB device manager', pinned: false, notes: '', icon: 'folder', tags: ['tool', 'usb'] },
    { id: '6', name: 'FTP Client', category: 'networking', type: 'local', url: null, localPath: null, description: 'FTP Client - file transfer', pinned: false, notes: '', icon: 'folder', tags: ['networking', 'ftp'] },
  ],
}

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

  const addEntry = useCallback((entry) => {
    const updated = { ...entries, entries: [...entries.entries, { ...entry, id: Date.now().toString() }] }
    setEntries(updated.entries)
    save(STORAGE_KEYS.entries, updated)
  }, [entries])

  const updateEntry = useCallback((id, data) => {
    const updated = {
      ...entries,
      entries: entries.entries.map(e => e.id === id ? { ...e, ...data } : e),
    }
    setEntries(updated.entries)
    save(STORAGE_KEYS.entries, updated)
  }, [entries])

  const deleteEntry = useCallback((id) => {
    const updated = {
      ...entries,
      entries: entries.entries.filter(e => e.id !== id),
    }
    setEntries(updated.entries)
    save(STORAGE_KEYS.entries, updated)
  }, [entries])

  const addNote = useCallback((title, body, tags) => {
    const note = {
      id: Date.now().toString(),
      title,
      body,
      tags: tags || [],
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    }
    const updated = { ...notes, notes: [...notes.notes, note] }
    setNotes(updated)
    save(STORAGE_KEYS.notes, updated)
    return note
  }, [notes])

  const updateNote = useCallback((id, data) => {
    const updated = {
      ...notes,
      notes: notes.notes.map(n => n.id === id ? { ...n, ...data, modifiedAt: new Date().toISOString() } : n),
    }
    setNotes(updated)
    save(STORAGE_KEYS.notes, updated)
  }, [notes])

  const deleteNote = useCallback((id) => {
    const updated = {
      ...notes,
      notes: notes.notes.filter(n => n.id !== id),
    }
    setNotes(updated)
    save(STORAGE_KEYS.notes, updated)
  }, [notes])

  const updateSetting = useCallback((key, value) => {
    const updated = { ...settings, [key]: value }
    setSettings(updated)
    save(STORAGE_KEYS.settings, updated)
  }, [settings])

  const setNoteBody = useCallback((id, body) => {
    updateNote(id, { body })
  }, [updateNote])

  return {
    entries,
    notes,
    settings,
    addEntry,
    updateEntry,
    deleteEntry,
    addNote,
    updateNote,
    deleteNote,
    updateSetting,
    setNoteBody,
  }
}
