// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Paper Assistant APIs
export const paperAssistantApi = {
  processPdf: (file, options) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('options', JSON.stringify(options));
    
    return api.post('/paper-assistant/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Code Assistant APIs
export const codeAssistantApi = {
  generateCode: (prompt, model) => {
    return api.post('/code-assistant/generate', { prompt, model });
  },
};

// Chat Assistant APIs
export const chatAssistantApi = {
  sendMessage: (message, model, documentId = null) => {
    return api.post('/chat-assistant/message', { message, model, documentId });
  },
  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post('/chat-assistant/upload-document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getHistory: () => {
    return api.get('/chat-assistant/history');
  },
};

export default api;
