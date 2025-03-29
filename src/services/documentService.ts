const API_URL = 'http://localhost:3001/api';

export interface UploadedFile {
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  path: string;
}

export const uploadDocument = async (file: File): Promise<UploadedFile> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/documents/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload file');
  }

  return response.json();
};

export const getDocuments = async (): Promise<UploadedFile[]> => {
  const response = await fetch(`${API_URL}/documents`);

  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }

  return response.json();
};

export const deleteDocument = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/documents/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete document');
  }
}; 