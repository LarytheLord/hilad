import React, { useState } from 'react'
import { Upload, MessageCircle } from 'lucide-react'

const DocumentUploader: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'whatsapp' | 'telegram' | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file && selectedPlatform) {
      // Here you would implement the actual upload logic
      console.log(`Uploading ${file.name} from ${selectedPlatform}`)
      // Reset state after upload
      setFile(null)
      setSelectedPlatform(null)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Upload Documents</h2>
      <div className="flex space-x-4 mb-4">
        <button
          className={`flex items-center px-4 py-2 rounded ${
            selectedPlatform === 'whatsapp' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedPlatform('whatsapp')}
        >
          <MessageCircle className="mr-2" />
          WhatsApp
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded ${
            selectedPlatform === 'telegram' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedPlatform('telegram')}
        >
          <Upload className="mr-2" />
          Telegram
        </button>
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
        accept=".pdf,.doc,.docx,.txt"
      />
      <button
        onClick={handleUpload}
        disabled={!file || !selectedPlatform}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Upload Document
      </button>
    </div>
  )
}

export default DocumentUploader