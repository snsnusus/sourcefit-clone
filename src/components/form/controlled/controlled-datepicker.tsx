import type { ReactElement } from 'react';

import { useController } from 'react-hook-form';

import DatePicker, { type DatePickerProps } from '../base/datepicker';

type ControlledDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange'>;

const ControlledDatePicker = (
  props: ControlledDatePickerProps
): ReactElement => {
  const { name, type, ...rest } = props;

  const {
    field: { ...field },
  } = useController({
    name,
    defaultValue: type === 'default' ? new Date() : [],
  });

  return <DatePicker {...field} {...rest} />;
};

export default ControlledDatePicker;
