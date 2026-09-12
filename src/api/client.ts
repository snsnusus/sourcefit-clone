import { createRequest } from './config';

export const nodeClient = createRequest({
  baseURL: 'http://localhost:4000',
});

export const mockClient = createRequest({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = createRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
