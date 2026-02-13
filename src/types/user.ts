export type User = PersonalInfo & {
  address: Address[];
};

export interface PersonalInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix?: string;
  nickName?: string;
  gender: string | Gender;
  birthDate: Date;
  birthPlace: string;
  maritalStatus: string | MaritalStatus;
  nationality: string;
  religion?: string;
}

export interface Address {
  addressLine: string;
  city: string;
  barangay: string;
  zipCode: string;
}

export type Gender = 'male' | 'female';

export type MaritalStatus =
  | 'single'
  | 'married'
  | 'widowed'
  | 'divorced'
  | 'separated';
