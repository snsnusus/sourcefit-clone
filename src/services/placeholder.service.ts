import type {
  Photo,
  User,
  Post,
  PostParams,
} from '~/models/placeholder.models';

import { placeholderClient } from '../api/client';
import { matchSorter } from 'match-sorter';

export const placeholderService = {
  getPosts: async (query: string): Promise<Post[]> => {
    const res = await placeholderClient.get<Post[]>('/posts');
    if (query) return matchSorter(res.data, query, { keys: ['name'] });
    return res.data;
  },
  doPost: async (params: PostParams): Promise<Post> => {
    const res = await placeholderClient.post<Post>('/posts', {
      ...params,
    });
    return res.data;
  },
  getUsers: async (query: string | null): Promise<User[]> => {
    const res = await placeholderClient.get<User[]>('/users');
    if (query) return matchSorter(res.data, query, { keys: ['name'] });
    return res.data;
  },
  getUser: async (userID: number): Promise<User> => {
    const res = await placeholderClient.get<User>(`/users/${userID}`);
    return res.data;
  },
  getPhoto: async (userID: number): Promise<Photo> => {
    const res = await placeholderClient.get<Photo>(`/photos/${userID}`);
    return res.data;
  },
};
