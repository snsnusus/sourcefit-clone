export type BasePosition = {
  position: string;
  description: string;
  slug: string;
  isActive: boolean;
  isApprover: boolean;
};

export type PositionFormValues = BasePosition & {
  sortOrder: number;
};

export type RawPosition = BasePosition & {
  id: string;
  departmentId: string;
  sortOrder: number;
};
