import type { ReactElement } from 'react';
import { MuiTelInput, type MuiTelInputProps } from 'mui-tel-input';

export const PhoneNumberInput = ({
  defaultCountry = 'PH',
  ...rest
}: MuiTelInputProps): ReactElement => {
  return <MuiTelInput size="small" {...rest} defaultCountry={defaultCountry} />;
};
