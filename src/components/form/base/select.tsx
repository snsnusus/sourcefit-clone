import type { BaseSelectProps as MuiSelectProps } from '@mui/material';

import type { ReactElement, ReactNode } from 'react';

import keyBy from 'lodash/keyBy';
import defaultTo from 'lodash/defaultTo';
import get from 'lodash/get';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl, { type FormControlProps } from '@mui/material/FormControl';
import InputLabel, { type InputLabelProps } from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';

export const getOption =
  <Type extends object>(
    path: keyof Type | 'value' | 'label'
  ): ((option: Type) => string) =>
  (option: Type) =>
    defaultTo(get(option, path), '');

const StyledPlaceholder = styled(MenuItem)(({ theme }) => ({
  height: '1.4375rem',
  padding: '0.50rem 0 0.3125rem 0',
  fontSize: theme.spacing(1.5),
}));

const StyledMultipleSelectedContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
});

const StyledOptionContainer = styled(Box)({
  backgroundColor: '#f5f5f5',
  border: '1px solid #f0f0f0',
  borderRadius: '0.5rem',
});

export interface SelectProps<Type> extends MuiSelectProps {
  name: string;
  helperText?: string;
  options?: Type[];
  optionValueKey?: keyof Type | 'value';
  optionLabelKey?: keyof Type | 'label';
  fullWidth?: FormControlProps['fullWidth'];
  formControlProps?: FormControlProps;
  inputLabelProps?: InputLabelProps;
  placeholder?: string;
}

const ControlledSelect = <Type extends object>(
  props: SelectProps<Type>
): ReactElement => {
  const {
    name,
    label,
    multiple,
    helperText,
    options = [],
    defaultValue = '',
    optionValueKey = 'value',
    optionLabelKey = 'label',
    placeholder = '',
    fullWidth,
    formControlProps,
    inputLabelProps,
    ...rest
  } = props;

  const getOptionValue = getOption<Type>(optionValueKey);
  const getOptionLabel = getOption<Type>(optionLabelKey);

  const renderSelectValue = (
    selected: unknown | string | string[]
  ): ReactNode => {
    if (!selected || (selected as string[]).length === 0) {
      return (
        <StyledPlaceholder disabled>
          <em>{placeholder}</em>
        </StyledPlaceholder>
      );
    }

    if (multiple) {
      const selectedItems = selected as string[];
      return (
        <StyledMultipleSelectedContainer>
          {selectedItems.map((item, idx) => (
            <StyledOptionContainer key={item}>
              {getOptionLabel(keyBy(options, getOptionValue)[item])}
              {selectedItems.length > 1 &&
                idx !== selectedItems.length - 1 &&
                ','}
            </StyledOptionContainer>
          ))}
        </StyledMultipleSelectedContainer>
      );
    }
    return getOptionLabel(keyBy(options, getOptionValue)[selected as string]);
  };

  const renderOptions = (): ReactNode[] =>
    options.map((option) => (
      <MenuItem key={getOptionValue(option)} value={getOptionValue(option)}>
        {getOptionLabel(option)}
      </MenuItem>
    ));

  return (
    <FormControl fullWidth {...formControlProps}>
      <InputLabel {...inputLabelProps} shrink>
        {label}
      </InputLabel>
      <MuiSelect
        label={label}
        multiple={multiple}
        renderValue={renderSelectValue}
        displayEmpty
        variant={props.variant ?? 'outlined'}
        notched
        size="small"
        {...rest}
      >
        {renderOptions()}
      </MuiSelect>
    </FormControl>
  );
};
export default ControlledSelect;
