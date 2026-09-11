import type { UserOption } from '~/models/user.models';
import { type ReactElement } from 'react';
import { useController } from 'react-hook-form';
import { useGetUserOptions } from '~/hooks/user.hooks';
import { Avatar, Box, Typography } from '@mui/material';
import { Autocomplete, type AutocompleteProps } from '~/components/form/base';

// ==========================================
// 1. Uncontrolled User Lookup Component
// ==========================================

export type UncontrolledUserLookupProps<
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> = Omit<
  AutocompleteProps<UserOption, Multiple, DisableClearable, FreeSolo>,
  'options'
>;

export const UncontrolledUserLookup = <
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
>(
  props: UncontrolledUserLookupProps<Multiple, DisableClearable, FreeSolo>
): ReactElement => {
  const { data: userOptions = [], isLoading } = useGetUserOptions();

  return (
    <Autocomplete
      loading={isLoading}
      options={userOptions}
      isOptionEqualToValue={(option, value) => {
        const opt = option as UserOption;
        const val = value as UserOption;
        return opt?.id === val?.id;
      }}
      getOptionLabel={(option) => {
        const user = option as UserOption;
        return user?.formattedName || '';
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const user = option as UserOption;

        return (
          <Box
            component="li"
            key={key}
            {...optionProps}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}
          >
            <Avatar
              src={user.avatarUrl}
              alt={user.formattedName}
              sx={{ width: 32, height: 32 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user.formattedName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.position || 'No Position'}
              </Typography>
            </Box>
          </Box>
        );
      }}
      {...props}
    />
  );
};

// ==========================================
// 2. Controlled User Lookup Component
// ==========================================

export type ControlledUserLookupProps<
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> = UncontrolledUserLookupProps<Multiple, DisableClearable, FreeSolo> & {
  name: string;
  defaultValue?: any;
  control?: any;
};

export const ControlledUserLookup = <
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
>({
  name,
  defaultValue,
  control,
  label,
  ...rest
}: ControlledUserLookupProps<
  Multiple,
  DisableClearable,
  FreeSolo
>): ReactElement => {
  const {
    field: { ref, value, onChange, ...field },
  } = useController({ name, defaultValue, control });

  return (
    <UncontrolledUserLookup
      inputRef={ref}
      id={name}
      {...field}
      value={value ?? (rest.multiple ? [] : null)}
      onChange={(_, data) => {
        onChange(data);
      }}
      {...rest}
    />
  );
};
