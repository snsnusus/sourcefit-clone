import type { User } from '~/types/user';

export const DEFAULT_CREATE_USER_FORM_VALUES: User = {
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  nickName: '',
  gender: '',
  birthDate: new Date(),
  birthPlace: '',
  maritalStatus: '',
  nationality: '',
  religion: '',
  address: [
    {
      addressLine: '',
      city: '',
      barangay: '',
      zipCode: '',
    },
  ],
};
