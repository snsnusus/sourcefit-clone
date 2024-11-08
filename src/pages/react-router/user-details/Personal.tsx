import type { ReactElement } from 'react';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';

import { Accordion } from '~/components';

interface PersonalDetailsProps {
  email: string;
  phone: string;
  address: string;
}

const Personal = ({
  email,
  phone,
  address,
}: PersonalDetailsProps): ReactElement => (
  <Accordion
    title={
      <Stack direction="row" gap={2}>
        <PersonIcon />
        <Typography fontWeight="bold">PERSONAL</Typography>
      </Stack>
    }
  >
    <Stack gap={2}>
      <Divider />
      <Grid container>
        <Grid item xs={4}>
          <Stack gap={1}>
            <Typography fontWeight="bold">EMAIL:</Typography>
            <Typography>{email}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack gap={1}>
            <Typography fontWeight="bold">PHONE:</Typography>
            <Typography>{phone}</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Stack gap={1}>
            <Typography fontWeight="bold">ADDRESS:</Typography>
            <Typography>{address}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  </Accordion>
);

export default Personal;
