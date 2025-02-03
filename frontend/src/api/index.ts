import axios from 'axios';
import { Task, Folder } from '@/types/task';
import { AxiosError } from 'axios';

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: AxiosError): never {
  if (error.response) {
    throw new ApiError(
      error.response.data.message || 'An error occurred',
      error.response.status,
      error.response.data.code
    );
  } else if (error.request) {
    throw new ApiError('No response from server', 503);
  } else {
    throw new ApiError(error.message, 500);
  }
}

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    handleApiError(error);
  }
);

export const api = {
  async getFolders(): Promise<Folder[]> {
    return client.get('/folders');
  },

  async getFolder(id: number): Promise<Folder> {
    return client.get(`/folders/${id}`);
  },

  async createFolder(folder: Partial<Folder>): Promise<Folder> {
    return client.post('/folders', folder);
  },

  async updateFolder(id: number, updates: Partial<Folder>): Promise<Folder> {
    return client.put(`/folders/${id}`, updates);
  },

  async deleteFolder(id: number): Promise<void> {
    return client.delete(`/folders/${id}`);
  },

  async getTasks(): Promise<Task[]> {
    return client.get('/tasks');
  },

  async duplicateFolder(id: number): Promise<void> {
    return client.post(`/folders/${id}/duplicate`);
  },

  async createTask(task: Partial<Task>): Promise<Task> {
    return client.post('/tasks', task);
  },

  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    return client.put(`/tasks/${id}`, updates);
  },

  async updateTaskPosition(
    id: number, 
    position: { x: number; y: number }
  ): Promise<Task> {
    return client.put(`/tasks/${id}/position`, position);
  },

  async updateTaskConnections(
    id: number, 
    connections: string[]
  ): Promise<Task> {
    return client.put(`/tasks/${id}/connections`, { connections });
  },

  async deleteTask(id: number): Promise<void> {
    return client.delete(`/tasks/${id}`);
  },
};

export interface ApiError {
  message: string;
  code: string;
  status: number;
}