import { z } from 'zod';

// export const createDepartmentSchema = z.object({
//   name: z.string(),
//   slug: z.string(),
//   costCenterCode: z.string(),
//   description: z.string(),
//   primarContactId: z.string().nullable(),
//   secondaryContactId: z.string().nullable(),
//   responsibilities: z.array(
//     z.object({
//       title: z.string(),
//       subtitle: z.string(),
//     })
//   ),
//   coverImageUrl: z.string(),
// })

export const departmentContactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  avatarUrl: z.url().optional().nullable(),
});

export type DepartmentContact = z.infer<typeof departmentContactSchema>;

export const departmentFormValuesSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  slug: z.string().min(1, 'Code is required.'),
  description: z.string().min(1, 'Description is required.'),
  costCenter: z.string().min(1, 'Cost Center Code is required.'),
});

export type DepartmentFormValues = z.infer<typeof departmentFormValuesSchema>;

export const createDepartmentPayloadSchema = departmentFormValuesSchema.extend({
  coverImage: z.string(),
  userId: z.string().nullable(),
});

export type CreateDepartmentPayload = z.infer<
  typeof createDepartmentPayloadSchema
>;

export const departmentSchema = createDepartmentPayloadSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  primaryContact: departmentContactSchema.nullable(),
  secondaryContact: departmentContactSchema.nullable(),
  memberCount: z.number().int().nonnegative(),
});

export type Department = z.infer<typeof departmentSchema>;
