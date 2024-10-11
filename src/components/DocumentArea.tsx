import React, { useState, useEffect } from 'react'
import { FileText, Edit2, Trash2, Upload } from 'lucide-react'
import DocumentEditor from './DocumentEditor'
import DocumentUploader from './DocumentUploader'
import AutomatedUploader from './AutomatedUploader'
import { fetchDocuments, createDocument, updateDocument, deleteDocument } from '../utils/api';

interface Document {
  id: number
  title: string
  content: string
  subject: string
}

const DocumentArea: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [showUploader, setShowUploader] = useState(false)

  useEffect(() => {
    fetchDocuments()
      .then(response => setDocuments(response.data))
      .catch(error => console.error('Error fetching documents:', error));
  }, [])

  const addNewDocument = async () => {
    try {
      const response = await createDocument({ title: 'New Document', content: '', subject: 'General' });
      setDocuments([...documents, response.data]);
      setSelectedDocument(response.data);
    } catch (error) {
      console.error('Error creating new document:', error);
    }
  };

  const handleUpdateDocument = async (updatedDoc: Document) => {
    try {
      await updateDocument(updatedDoc.id, updatedDoc);
      setDocuments(documents.map(doc => doc.id === updatedDoc.id ? updatedDoc : doc));
      setSelectedDocument(null);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleDeleteDocument = async (id: number) => {
    try {
      await deleteDocument(id);
      setDocuments(documents.filter(doc => doc.id !== id));
      if (selectedDocument?.id === id) {
        setSelectedDocument(null);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Documents</h2>
        <div>
          <button
            onClick={addNewDocument}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Add New Document
          </button>
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            <Upload size={20} className="inline mr-2" />
            Upload Documents
          </button>
        </div>
      </div>
      {showUploader && (
        <div className="mb-6">
          <DocumentUploader />
          <AutomatedUploader />
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Document List</h3>
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span className="flex items-center">
                  <FileText className="mr-2" />
                  {doc.title}
                </span>
                <div>
                  <button
                    onClick={() => setSelectedDocument(doc)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {selectedDocument ? (
            <DocumentEditor document={selectedDocument} onSave={handleUpdateDocument} onCancel={() => setSelectedDocument(null)} />
          ) : (
            <p className="text-gray-500">Select a document to edit or create a new one.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentArea