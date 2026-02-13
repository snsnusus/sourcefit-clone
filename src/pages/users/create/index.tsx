import type { User } from '~/types/user';

import type { ReactElement } from 'react';

import { useForm, type SubmitHandler } from 'react-hook-form';
import Stack from '@mui/material/Stack';

import Form from '~/components/form/Form';
import { DEFAULT_CREATE_USER_FORM_VALUES } from '~/constants/user';

import PersonalInfo from './personal-info';
import ContactInfo from './contact-info';

const Users = (): ReactElement => {
  const form = useForm({
    defaultValues: { ...DEFAULT_CREATE_USER_FORM_VALUES },
  });

  const handleSubmit: SubmitHandler<User> = (data) => console.log(data);

  return (
    <Form {...form} onSubmit={handleSubmit}>
      <Stack gap={2}>
        <PersonalInfo />
        <ContactInfo />
      </Stack>
    </Form>
  );
};

export default Users;
