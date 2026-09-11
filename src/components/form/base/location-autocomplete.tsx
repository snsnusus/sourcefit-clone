import { type ReactElement } from 'react';
import { Autocomplete, TextField } from '@mui/material';

export type LocationOption = { id: string | number; name: string };

type LocationAutocompleteProps<T extends LocationOption> = {
  value: T | null;
  onChange: (value: T | null) => void;
  options: T[];
  disabled?: boolean;
};

export const LocationAutocomplete = <T extends LocationOption>({
  value,
  onChange,
  options,
  disabled,
}: LocationAutocompleteProps<T>): ReactElement => (
  <Autocomplete
    size="small"
    disabled={disabled}
    options={options}
    getOptionLabel={(option) => option.name}
    isOptionEqualToValue={(option, val) => option.id === val?.id}
    value={value}
    onChange={(_, newValue) => onChange(newValue)}
    renderInput={(params) => <TextField {...params} size="small" />}
  />
);
