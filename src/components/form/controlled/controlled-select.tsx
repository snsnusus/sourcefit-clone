import type { ReactElement } from 'react';

import { useController } from 'react-hook-form';

import Select, { type SelectProps } from '../base/select';

const ControlledSelect = <Type extends object>({
  name,
  multiple,
  ...rest
}: SelectProps<Type>): ReactElement => {
  const {
    field: { ref, ...field },
  } = useController({
    name,
    defaultValue: multiple ? [] : '',
  });

  return <Select {...field} {...rest} />;
};
export default ControlledSelect;
