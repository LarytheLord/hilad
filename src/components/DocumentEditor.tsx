import React, { useState } from 'react'

interface Document {
  id: number
  title: string
  content: string
}

interface DocumentEditorProps {
  document: Document
  onSave: (document: Document) => void
  onCancel: () => void
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ document, onSave, onCancel }) => {
  const [title, setTitle] = useState(document.title)
  const [content, setContent] = useState(document.content)

  const handleSave = () => {
    onSave({ ...document, title, content })
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-xl font-semibold mb-2">Edit Document</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Document Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded mb-2 h-40"
        placeholder="Document Content"
      />
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DocumentEditor