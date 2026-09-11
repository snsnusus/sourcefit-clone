import type { ReactElement } from 'react';

import { Stack } from '@mui/material';
import EmploymentDetails from './employment-details';
import HMODetails from './hmo-details';

export const Domain = (): ReactElement => (
  <Stack
    spacing={2}
    sx={{
      padding: 2,
    }}
  >
    <EmploymentDetails />
    <HMODetails />
  </Stack>
);

export default Domain;
