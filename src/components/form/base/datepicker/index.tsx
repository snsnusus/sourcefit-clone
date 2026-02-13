import type { ReactDatePickerProps } from 'react-datepicker';

import type { ReactElement } from 'react';

import DatePicker from 'react-datepicker';
import TextField from '@mui/material/TextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import DatePickerHeader from './header';

export interface DatePickerProps
  extends Omit<ReactDatePickerProps, 'value' | 'onChange'> {
  name: string;
  value: Date | [Date | null, Date | null] | null;
  type?: 'default' | 'range';
  label?: string;
  defaultValue?: Date | [Date | null, Date | null] | null;
  dateFormat?: 'MM/dd/yyyy';
  onChange: (date: Date | [Date | null, Date | null] | null) => void;
}

const CustomDatePicker = (props: DatePickerProps): ReactElement => {
  const {
    type = 'default',
    name,
    value,
    label,
    showPopperArrow = false,
    dateFormat = 'MM/dd/yyyy',
    defaultValue = type === 'range' ? [] : null,
    onChange,
    ...rest
  } = props;

  const isDateRange = type === 'range';
  const selectedDate = isDateRange
    ? Array.isArray(value) && value.length > 0
      ? value[0]
      : null // ✅ Ensure value is an array
    : value instanceof Date
    ? value
    : null; // ✅ Ensure value is a Date

  const selectedStartDate = isDateRange
    ? Array.isArray(value) && value.length > 0
      ? value[0]
      : null
    : null;

  const selectedEndDate = isDateRange
    ? Array.isArray(value) && value.length > 1
      ? value[1]
      : null
    : null;

  return (
    <DatePicker
      name={name}
      autoComplete="off"
      showPopperArrow={showPopperArrow}
      dateFormat={dateFormat}
      {...(isDateRange && { selectsRange: true })}
      selected={selectedDate} // ✅ Ensured valid Date
      startDate={selectedStartDate} // ✅ Ensured valid Date
      endDate={selectedEndDate} // ✅ Ensured valid Date
      renderCustomHeader={(customHeaderProps) => (
        <DatePickerHeader {...customHeaderProps} />
      )}
      customInput={
        <TextField
          id={name}
          label={label}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: <CalendarMonthIcon />,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
        />
      }
      onChange={onChange}
      {...rest}
    />
  );
};

export default CustomDatePicker;
