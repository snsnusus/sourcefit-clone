import { type ReactElement } from 'react';
import { useController } from 'react-hook-form';
import {
  LocationAutocomplete,
  type LocationOption,
} from '~/components/form/base/location-autocomplete';

export type ControlledLocationAutocompleteProps<T extends LocationOption> = {
  name: string;
  options: T[];
  disabled?: boolean;
  defaultValue?: T | null;
  onChange?: (value: T | null) => void;
};

export const ControlledLocationAutocomplete = <T extends LocationOption>({
  name,
  options,
  disabled,
  defaultValue = null,
  onChange,
}: ControlledLocationAutocompleteProps<T>): ReactElement => {
  const {
    field: { value, onChange: formOnChange },
  } = useController({
    name,
    defaultValue,
  });

  return (
    <LocationAutocomplete
      value={value ?? null}
      onChange={(nextValue) => {
        formOnChange(nextValue);
        onChange?.(nextValue);
      }}
      options={options}
      disabled={disabled}
    />
  );
};
