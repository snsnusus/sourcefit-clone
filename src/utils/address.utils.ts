import type { AddressFormValues } from '~/pages/users/create/contact-details/address';

export const formatAddress = (values: AddressFormValues): string => {
  return [
    values.addressLine1,
    values.addressLine2,
    values.barangay?.name,
    values.city?.name,
    values.region?.name,
    values.postalCode,
  ]
    .filter(Boolean)
    .join(', ');
};
