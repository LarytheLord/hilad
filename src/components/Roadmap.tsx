import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react'

interface RoadmapItem {
  id: number
  title: string
  description: string
  date: string
  status: 'Planned' | 'In Progress' | 'Completed'
}

const Roadmap: React.FC = () => {
  const [items, setItems] = useState<RoadmapItem[]>([
    { id: 1, title: 'Launch Beta', description: 'Release beta version to Hilander', date: '2024-10-01', status: 'Planned' },
    { id: 2, title: 'User Feedback', description: 'Collect and analyze user feedback', date: '2024-10-10', status: 'In Progress' },
  ])
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null)

  const addItem = () => {
    const newItem = { id: Date.now(), title: 'New Milestone', description: '', date: new Date().toISOString().split('T')[0], status: 'Planned' as const }
    setItems([...items, newItem])
    setEditingItem(newItem)
  }

  const updateItem = (updatedItem: RoadmapItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item))
    setEditingItem(null)
  }

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
    if (editingItem?.id === id) setEditingItem(null)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Roadmap</h2>
        <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Plus size={20} className="inline mr-2" />
          New Milestone
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Milestones</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="bg-gray-100 p-2 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.title}</span>
                  <div>
                    <button onClick={() => setEditingItem(item)} className="text-blue-500 hover:text-blue-700 mr-2">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    <Calendar size={14} className="inline mr-1" />
                    {item.date}
                  </span>
                  <span className={`inline-block px-2 py-1 text-sm rounded ${
                    item.status === 'Planned' ? 'bg-blue-200 text-blue-800' :
                    item.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {editingItem ? (
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-2">Edit Milestone</h3>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Milestone Title"
              />
              <textarea
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full p-2 border rounded mb-2 h-20"
                placeholder="Milestone Description"
              />
              <input
                type="date"
                value={editingItem.date}
                onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <select
                value={editingItem.status}
                onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as RoadmapItem['status'] })}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="flex justify-end">
                <button
                  onClick={() => updateItem(editingItem)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingItem(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a milestone to edit or create a new one.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Roadmap