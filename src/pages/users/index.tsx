import type { ReactElement } from 'react';
import { useState } from 'react';

import { useForm, type SubmitHandler } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Form from '~/components/form/Form';
import Stepper from '~/components/stepper';

import CreateDialog from './create-dialog';
import PersonalInfo from './create/personal-info';

const Users = (): ReactElement => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: { firstName: '', birthdate: null },
  });

  const handleSubmit: SubmitHandler<{ firstName: string }> = (data) =>
    console.log(data);

  return (
    <>
      <Stack gap={2}>
        <Typography variant="body1" fontSize="1.25rem">
          Create User
        </Typography>
        <Form {...form} onSubmit={handleSubmit}>
          <Stepper
            steps={[
              {
                label: 'Personal Info',
                content: <PersonalInfo />,
              },
              { label: 'Contact', content: <>Contact</> },
              { label: 'Doman', content: <>Domain</> },
              { label: 'HMO', content: <>HMO</> },
            ]}
            completeFn={() => console.log('The steps has been completed...')}
          />
        </Form>
      </Stack>
      <CreateDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default Users;
