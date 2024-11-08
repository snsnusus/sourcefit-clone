import type { UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { Post, ApiErrorResponse, PostParams } from '~/apis/types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as api from '~/apis';

export const usePostsQuery = (
  searchQuery: string
): UseQueryResult<Post[], AxiosError<ApiErrorResponse>> =>
  useQuery<Post[], AxiosError<ApiErrorResponse>>(['posts'], () =>
    api.getPosts(searchQuery)
  );

export const usePostsMutation = (): UseMutationResult<
  Post,
  AxiosError<ApiErrorResponse>,
  PostParams
> => {
  const queryClient = useQueryClient();

  return useMutation<Post, AxiosError<ApiErrorResponse>, PostParams>(
    api.doPost,
    { onSuccess: (data) => queryClient.setQueryData(['posts'], data) }
  );
};
