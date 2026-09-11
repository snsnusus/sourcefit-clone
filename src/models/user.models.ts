import { AddressFormValues } from './address.models';

export type Gender = 'MALE' | 'FEMALE';
export type MaritalStatus = 'SINGLE' | 'MARRIED';

export type UserFormValues = {
  addresses: (AddressFormValues & { formattedAddress: string })[];
};

export type PersonalDetails = {
  firstname: string;
  middlename: string;
  lastname: string;
  suffix?: string;
  formattedName: string;
  nickname?: string;
  gender: Gender;
  birthdate: string;
  birthplace: string;
  maritalStatus: MaritalStatus;
  nationality: string;
  avatarUrl: string;
};

export type EmploymentDetails = {
  employeeId: string;
  positionId: string;
  departmentId: string;
  officeLocation: string;
  workSchedule: string;
};

export type AccountDetails = {
  username: string;
  password: string;
};

export type UserModel = PersonalDetails &
  EmploymentDetails &
  AccountDetails & {
    id: string;
  };

export type User = {
  personalDetails: PersonalDetails;
  employmentDetails: Omit<EmploymentDetails, 'departmentId'> & {
    department: string;
  };
  accountDetails: Omit<AccountDetails, 'password'>;
};

export type UserOption = {
  id: string;
  formattedName: string;
  position: string;
  avatarUrl: string;
  departmentId: string;
};
