import type { ReactElement } from 'react';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import BusinessIcon from '@mui/icons-material/Business';

import { Accordion } from '~/components';

interface CompanyDetailssProps {
  companyName: string;
  catchPhrase: string;
  website: string;
}

const Company = ({
  companyName,
  catchPhrase,
  website,
}: CompanyDetailssProps): ReactElement => (
  <Accordion
    title={
      <Stack direction="row" gap={2}>
        <BusinessIcon />
        <Typography fontWeight="bold">COMPANY</Typography>
      </Stack>
    }
  >
    <Stack gap={2}>
      <Divider />
      <Grid container>
        <Grid item xs={3}>
          <Stack gap={1}>
            <Typography fontWeight="bold">NAME:</Typography>
            <Typography>{companyName}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack gap={1}>
            <Typography fontWeight="bold">CATCHPHRASE:</Typography>
            <Typography>{catchPhrase}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack gap={1}>
            <Typography fontWeight="bold">WEBSITE:</Typography>
            <Typography>{website}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  </Accordion>
);

export default Company;
