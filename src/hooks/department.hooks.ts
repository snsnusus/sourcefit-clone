import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { departmentService } from '~/services/department.service';

export const useGetAllDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: departmentService.getAllDepartments,
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: departmentService.createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: (error) => {
      console.error('Error adding department to json-server:', error);
    },
  });
};

export const useGetPositionsByDepartment = (departmentId: string) => {
  return useQuery({
    queryKey: ['departments', 'positions', departmentId],
    queryFn: () => departmentService.getPositionsByDepartment(departmentId),
    enabled: Boolean(departmentId),
  });
};
