export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  DOCUMENTS: {
    UPLOAD: `${API_BASE_URL}/api/documents/upload`,
    LIST: `${API_BASE_URL}/api/documents`,
    EVALUATE: `${API_BASE_URL}/api/documents/evaluate-document`,
  },
} as const; 