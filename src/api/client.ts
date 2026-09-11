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

export const placeholderClient = createRequest({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
