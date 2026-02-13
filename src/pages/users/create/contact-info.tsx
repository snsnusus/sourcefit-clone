import type { ReactElement } from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ContactInfo = (): ReactElement => (
  <Stack gap={3}>
    <Stack gap={1}>
      <Typography variant="h6" fontWeight={600}>
        Contact Info
      </Typography>
      <Divider />
    </Stack>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack gap={1}>
          <Typography fontWeight={600}>Address</Typography>
        </Stack>
      </Grid>
    </Grid>
  </Stack>
);

export default ContactInfo;
