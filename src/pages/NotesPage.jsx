import React, { useState, useEffect } from 'react'
import { FileText, Plus, Trash2, MessageSquare, Clock } from 'lucide-react'
import { useConfig } from '../hooks/useConfig'

function NotesPage() {
  const { notes, addNote, updateNote, deleteNote, search, setSearch } = useConfig()
  const [editing, setEditing] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('')

  useEffect(() => {
    if (editing) {
      const note = notes.find(n => n.id === editing)
      if (note) {
        setTitle(note.title || '')
        setBody(note.body || '')
        setTag(note.tag || '')
      }
    } else {
      setTitle('')
      setBody('')
      setTag('')
    }
  }, [editing])

  const handleSave = () => {
    if (!title.trim()) return
    if (editing) {
      updateNote(editing, { title, body, tag })
    } else {
      addNote({ title, body, tag })
    }
    setEditing(null)
    setTitle('')
    setBody('')
    setTag('')
  }

  const filtered = notes.filter(n => {
    if (search && !n.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-white">Notes</h2>
        <Plus className="w-5 h-5 text-cyan-400" />
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 mb-2" />
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Note content..." className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 mb-2 min-h-[80px]" rows={3} />
        <input value={tag} onChange={e => setTag(e.target.value)} placeholder="Tag (optional)" className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600" />
        <div className="mt-3 flex gap-2">
          <button onClick={handleSave} className="bg-cyan-500 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-400">
            <Plus className="w-4 h-4 inline" /> Save
          </button>
          {editing && <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white px-2 py-2 rounded-lg text-sm">Cancel</button>}
        </div>
      </div>

      <div className="notes-list">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <MessageSquare className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p>No notes found{search ? ' matching your search.' : ''}</p>
          </div>
        ) : (
          filtered.map(note => (
            <div key={note.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white">{note.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{note.body}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {new Date(note.createdAt).toLocaleString()}
                </div>
              </div>
              <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-400 cursor-pointer" onClick={() => deleteNote(note.id)} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotesPage
