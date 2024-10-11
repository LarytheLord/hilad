import React, { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface MeetingNote {
  id: number
  title: string
  date: string
  content: string
}

const MeetingNotes: React.FC = () => {
  const [notes, setNotes] = useState<MeetingNote[]>([
    { id: 1, title: 'Team Sync', date: '2023-05-01', content: 'Discussed project progress and next steps.' },
    { id: 2, title: 'Client Meeting', date: '2023-05-03', content: 'Presented project timeline and gathered feedback.' },
  ])
  const [editingNote, setEditingNote] = useState<MeetingNote | null>(null)

  const addNote = () => {
    const newNote = { id: Date.now(), title: 'New Meeting', date: new Date().toISOString().split('T')[0], content: '' }
    setNotes([...notes, newNote])
    setEditingNote(newNote)
  }

  const updateNote = (updatedNote: MeetingNote) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note))
    setEditingNote(null)
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
    if (editingNote?.id === id) setEditingNote(null)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Meeting Notes</h2>
        <button onClick={addNote} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Plus size={20} className="inline mr-2" />
          New Meeting Note
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Notes List</h3>
          <ul className="space-y-2">
            {notes.map((note) => (
              <li key={note.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span>
                  <strong>{note.title}</strong> - {note.date}
                </span>
                <div>
                  <button onClick={() => setEditingNote(note)} className="text-blue-500 hover:text-blue-700 mr-2">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteNote(note.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {editingNote ? (
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-2">Edit Meeting Note</h3>
              <input
                type="text"
                value={editingNote.title}
                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Meeting Title"
              />
              <input
                type="date"
                value={editingNote.date}
                onChange={(e) => setEditingNote({ ...editingNote, date: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                value={editingNote.content}
                onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                className="w-full p-2 border rounded mb-2 h-40"
                placeholder="Meeting Notes"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => updateNote(editingNote)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingNote(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a note to edit or create a new one.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MeetingNotes