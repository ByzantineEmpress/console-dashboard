import React, { useState, useEffect } from 'react'
import { FileText, Plus, Trash2, MessageSquare, Clock, Star as StarIcon } from 'lucide-react'
import { useConfig } from '../hooks/useConfig'

function NotesPage() {
  const { notes, search, setSearch, filter, setFilter, addNote, deleteNote, updateNote, setNoteBody } = useConfig()
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const filtered = notes.filter(n => {
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase())
    const matchFilter = !filter || n.tags.some(t => t.toLowerCase() === filter.toLowerCase())
    return matchSearch && matchFilter
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateNote(editingId, { title, body })
    } else if (title.trim()) {
      addNote(title, body, [])
    }
    setTitle('')
    setBody('')
    setEditingId(null)
  }

  const handleEdit = (note) => {
    setEditingId(note.id)
    setTitle(note.title)
    setBody(note.body)
  }

  useEffect(() => {
    if (editingId) {
      const note = notes.find(n => n.id === editingId)
      if (note) {
        setTitle(note.title)
        setBody(note.body)
      }
    } else {
      setTitle('')
      setBody('')
    }
  }, [editingId, notes])

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-white">Notes</h2>
        <Search className="w-4 h-4 text-gray-500" />
        <input className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-600" placeholder="Search notes..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" value={filter || ''} onChange={e => setFilter(e.target.value)}>
          <option value="">All Tags</option>
          {['fatx', 'j-runner', 'console', 'drift', 'modding', 'tool', 'usb', 'networking', 'ftp'].map(t => (
            <option key={t} value={t}>{t.replace(/[-_]/g, ' ').toUpperCase()}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-6">
        <div className="flex items-center gap-3">
          {editingId ? (
            <button type="button" onClick={() => { setEditingId(null); setTitle(''); setBody(''); }} className="text-red-400">
            <Trash2 className="w-5 h-5" />
            </button>
          ) : (
            <FileText className="w-5 h-5 text-cyan-400" />
          )}
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600" />
          <button type="submit" className="bg-cyan-500 text-black px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-cyan-400">
            Save
          </button>
        </div>
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Note content..." rows="3" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 mt-2" />
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(n => (
          <div key={n.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white">{n.title}</h3>
              <button onClick={() => handleEdit(n)} className="text-cyan-400 hover:text-cyan-300">
                <MessageSquare className="w-4 h-4" />
              </button>
              <button onClick={() => deleteNote(n.id)} className="text-gray-500 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-400">{n.body}</p>
            <p className="text-xs text-gray-600 mt-2">Created: {new Date(n.createdAt).toLocaleDateString()}</p>
            {n.tags.length > 0 && (
              <div className="flex gap-1 mt-2">
                {n.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-400">{t}</span>
                ))}
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No notes found. Add one above!
          </div>
        )}
      </div>
    </div>
  )
}

export default NotesPage
