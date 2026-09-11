import { useController, useFormContext } from 'react-hook-form';
import { MuiTelInputInfo } from 'mui-tel-input';
import { PhoneNumberInput } from '~/components/form/base/phone-number-input';

import { formatPhoneNumber } from '~/utils/phone-number.utils';

type PhoneNumberValue = {
  countryCode: string;
  dialCode: string;
  international: string;
  local: string;
  formatted: string;
};

type ControlledPhoneNumberProps = {
  name: string;
};

export const ControlledPhoneNumberInput = ({
  name,
}: ControlledPhoneNumberProps) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null,
  });

  const handleChange = (raw: string, info: MuiTelInputInfo) => {
    const nextValue: PhoneNumberValue = {
      countryCode: info.countryCode ?? '',
      dialCode: info.countryCallingCode ?? '',
      international: info.numberValue ?? raw,
      local: info.nationalNumber ?? '',
      formatted: formatPhoneNumber(
        info.nationalNumber ?? '',
        info.countryCallingCode ?? ''
      ),
    };

    onChange(nextValue);
  };

  return (
    <PhoneNumberInput
      value={(value as PhoneNumberValue | null)?.international ?? ''}
      onChange={handleChange}
      error={!!error}
      helperText={error?.message}
    />
  );
};
