import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw } from 'lucide-react';
import DocumentEditor from './DocumentEditor';
import { fetchDocuments, updateDocument, summarizeDocument } from '../utils/api';

interface Document {
  id: number;
  title: string;
  content: string;
  summary?: string;
}

const AIDocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDocuments()
      .then(response => setDocuments(response.data))
      .catch(error => console.error('Error fetching documents:', error));
  }, []);

  const handleSummarizeDocument = async (document: Document) => {
    setIsLoading(true);
    try {
      const response = await summarizeDocument(document.id);
      const updatedDocument = { ...document, summary: response.data.summary };
      await updateDocument(updatedDocument.id, updatedDocument);
      setDocuments(documents.map(doc => doc.id === updatedDocument.id ? updatedDocument : doc));
      setSelectedDocument(updatedDocument);
    } catch (error) {
      console.error('Error summarizing document:', error);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">AI Document Manager</h2>
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
                <button
                  onClick={() => handleSummarizeDocument(doc)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? <RefreshCw className="animate-spin mr-2" /> : null}
                  Summarize
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {selectedDocument ? (
            <>
              <h3 className="text-xl font-semibold mb-2">Document Summary</h3>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <h4 className="font-semibold mb-2">{selectedDocument.title}</h4>
                <p>{selectedDocument.summary || 'No summary available'}</p>
              </div>
              <DocumentEditor
                document={selectedDocument}
                onSave={handleUpdateDocument}
                onCancel={() => setSelectedDocument(null)}
              />
            </>
          ) : (
            <p className="text-gray-500">Select a document to view its summary and edit</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDocumentManager;