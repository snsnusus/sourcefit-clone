import type { ReactElement } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Government = (): ReactElement => (
  <Stack gap={2}>
    <Stack gap={1}>
      <Typography variant="h6" fontWeight="bold">
        SSS
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="SSS Number"
            value="M-20-457"
            variant="standard"
          />
        </Grid>
      </Grid>
    </Stack>
    <Stack gap={1}>
      <Typography variant="h6" fontWeight="bold">
        PagIBIG
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="PagIBIG Number"
            value="M-20-457"
            variant="standard"
          />
        </Grid>
      </Grid>
    </Stack>
    <Stack gap={1}>
      <Typography variant="h6" fontWeight="bold">
        Philhealth
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="PhilHealth Number"
            value="M-20-457"
            variant="standard"
          />
        </Grid>
      </Grid>
    </Stack>
    <Stack gap={1}>
      <Typography variant="h6" fontWeight="bold">
        TIN
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="TIN Number"
            value="M-20-457"
            variant="standard"
          />
        </Grid>
      </Grid>
    </Stack>
  </Stack>
);

export default Government;
