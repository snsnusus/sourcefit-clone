import type { Photo, User, Post, PostParams } from './types';

import { matchSorter } from 'match-sorter';

import { createRequest } from './config';

export const api = createRequest({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPosts = async (query: string): Promise<Post[]> => {
  const res = await api.get<Post[]>('/posts');
  if (query) return matchSorter(res.data, query, { keys: ['name'] });
  return res.data;
};

export const doPost = async (params: PostParams): Promise<Post> => {
  const res = await api.post<Post>('/posts', {
    ...params,
  });

  return res.data;
};

export const getUsers = async (query: string | null): Promise<User[]> => {
  const res = await api.get<User[]>('/users');
  if (query) return matchSorter(res.data, query, { keys: ['name'] });
  return res.data;
};

export const getUser = async (userID: number): Promise<User> => {
  const res = await api.get<User>(`/users/${userID}`);
  return res.data;
};

export const getPhoto = async (userID: number): Promise<Photo> => {
  const res = await api.get<Photo>(`/photos/${userID}`);
  return res.data;
};
