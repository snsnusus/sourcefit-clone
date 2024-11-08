import type {
  LoaderFunction,
  ActionFunctionArgs,
  Params,
  ParamParseKey,
} from 'react-router-dom';
import type { User, Photo } from '~/apis/types';

import { getUsers, getUser, getPhoto } from '~/apis';

const Paths = {
  userDetails: 'users/:userID',
} as const;

interface UserDetailsLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.userDetails>>;
}

export const getUsersLoader = async ({
  request,
}: {
  request: Request;
}): Promise<{ users: User[]; searchQuery: string | null }> => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('search');
  const users = await getUsers(searchQuery);
  return { users, searchQuery };
};

export const getuserDetailsLoader: LoaderFunction = async ({
  params,
}: UserDetailsLoaderArgs): Promise<[User, Photo]> => {
  const res = await Promise.all([
    getUser(Number(params.userID)),
    getPhoto(Number(params.userID)),
  ]);
  return res;
};
