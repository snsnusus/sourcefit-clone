import type { ReactElement } from 'react';

import TextField, { type BaseTextFieldProps } from '@mui/material/TextField';

export interface TextFieldProps extends BaseTextFieldProps {
  name: string;
}

const BaseTextField = (props: TextFieldProps): ReactElement => (
  <TextField
    {...props}
    variant={props.variant ?? 'outlined'}
    size="small"
    slotProps={{
      inputLabel: {
        shrink: true,
      },
    }}
    fullWidth
  />
);

export default BaseTextField;
