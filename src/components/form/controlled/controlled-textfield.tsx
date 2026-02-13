import type { ReactElement } from 'react';

import { useController } from 'react-hook-form';

import TextField, { type TextFieldProps } from '../base/textfield';

const ControlledTextField = (props: TextFieldProps): ReactElement => {
  const { name, label, size = 'small', defaultValue = '', ...rest } = props;
  const {
    field: { ref, ...field },
  } = useController({ name, defaultValue });

  return (
    <TextField
      {...field}
      id={name}
      inputRef={ref}
      {...(label ? { label: label } : { hiddenLabel: true })}
      fullWidth
      {...rest}
    />
  );
};
export default ControlledTextField;
