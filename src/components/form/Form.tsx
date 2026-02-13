import type { ReactElement } from 'react';

import type {
  SubmitHandler,
  UseFormReturn,
  FieldValues,
} from 'react-hook-form';

import { FormProvider } from 'react-hook-form';

interface FormProps<Type extends FieldValues>
  extends UseFormReturn<Type>,
    PropsWithChildren {
  onSubmit?: SubmitHandler<Type>;
}

const Form = <Type extends object>(props: FormProps<Type>): ReactElement => {
  const { onSubmit = () => {}, children, ...methods } = props;

  return (
    <FormProvider<Type> {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
