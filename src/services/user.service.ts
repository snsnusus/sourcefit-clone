import type { User, UserModel, UserOption } from '~/models/user.models';
import type { DepartmentModel } from '~/models/department.models';
import { mockClient } from '../api/client';
import { Position } from '~/models/position.models';

export const userService = {
  getUsersWithFullDetails: async (): Promise<User[]> => {
    const [usersResponse, departmentsResponse] = await Promise.all([
      mockClient.get<UserModel[]>('/users'),
      mockClient.get<DepartmentModel[]>('/departments'), // Or wherever your departments live
    ]);

    const users = usersResponse.data ?? [];
    const departments = departmentsResponse.data ?? [];

    return users.map((user) => {
      const matchedDepartment = departments.find(
        (dept) => dept.id === user.departmentId
      );

      return {
        personalDetails: {
          firstname: user.firstname,
          middlename: user.middlename,
          lastname: user.lastname,
          suffix: user.suffix,
          formattedName: `${user.firstname} ${user.lastname}`,
          nickname: user.nickname,
          gender: user.gender,
          birthdate: user.birthdate,
          birthplace: user.birthplace,
          maritalStatus: user.maritalStatus,
          nationality: user.nationality,
          avatarUrl: user.avatarUrl,
        },
        employmentDetails: {
          employeeId: user.employeeId,
          positionId: user.positionId,
          department: matchedDepartment ? matchedDepartment.name : '',
          officeLocation: user.officeLocation,
          workSchedule: user.workSchedule,
        },
        accountDetails: {
          username: user.username,
        },
      };
    });
  },
  getUserOptions: async (): Promise<UserOption[]> => {
    const [usersResponse, positionsResponse] = await Promise.all([
      mockClient.get<UserModel[]>('/users'),
      mockClient.get<Position[]>('/positions'),
    ]);

    const users = usersResponse.data ?? [];
    const positions = positionsResponse.data ?? [];

    return (users ?? []).map((user) => {
      const matchedPosition = positions.find(
        (pos) => pos.id === user.positionId
      );

      return {
        id: user.id,
        formattedName: `${user.firstname} ${user.lastname}`,
        position: matchedPosition?.position ?? 'No Position',
        avatarUrl: user.avatarUrl,
        departmentId: user.departmentId,
      };
    });
  },
  updateUserDepartment: async (
    userIds: string[],
    departmentId: string
  ): Promise<any> => {
    if (!userIds.length) return [];

    const patchPromises = userIds.map((userId) =>
      mockClient.patch(`/users/${userId}`, { departmentId })
    );

    const responses = await Promise.all(patchPromises);
    return responses.map((res) => res.data);
  },
};
