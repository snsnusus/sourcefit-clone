import type { UserModel } from '~/models/user.models';
import { mockClient } from '../api/client';

export const authService = {
  verifyCredentials: async (
    identity: string,
    password: string
  ): Promise<UserModel | null> => {
    const res = await mockClient.get<UserModel[]>('/users', {
      params: { password: password },
    });

    const exactMatch = res.data.find(
      (user) =>
        user.username.toLowerCase() === identity.toLowerCase() &&
        user.password === password
    );

    return exactMatch || null;
  },
};
