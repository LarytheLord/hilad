import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const fetchDocuments = () => api.get('/api/documents');
export const createDocument = (document: Partial<Document>) => api.post('/api/documents', document);
export const updateDocument = (id: number, document: Partial<Document>) => api.put(`/api/documents/${id}`, document);
export const deleteDocument = (id: number) => api.delete(`/api/documents/${id}`);
export const summarizeDocument = (id: number) => api.post(`/api/ai/summarize`, { documentId: id });

export default api;
