import type { User, UserOption } from '~/models/user.models';

import { userService } from '~/services/user.service';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';

interface UpdateUserDepartmentParams {
  userIds: string[];
  departmentId: string;
}

const userKeys = {
  all: ['users'] as const,
};

export const useGetUsersWithFullDetails = (): UseQueryResult<User[], Error> =>
  useQuery({
    queryKey: [userKeys.all],
    queryFn: () => userService.getUsersWithFullDetails(),
  });

export const useGetUserOptions = (): UseQueryResult<UserOption[], Error> =>
  useQuery({
    queryKey: [userKeys.all, 'options'],
    queryFn: () => userService.getUserOptions(),
  });

export const useUpdateUserDepartment = (): UseMutationResult<
  any,
  unknown,
  UpdateUserDepartmentParams,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userIds, departmentId }: UpdateUserDepartmentParams) =>
      userService.updateUserDepartment(userIds, departmentId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userKeys.all, 'update'] });
    },
  });
};
