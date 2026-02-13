import type { ReactElement } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Domain = (): ReactElement => (
  <Stack gap={2}>
    <Stack gap={1}>
      <Typography variant="h6" fontWeight="bold">
        Employment
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Employee ID"
            value="M-20-457"
            variant="standard"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Status"
            value="Regular"
            variant="standard"
            helperText="Probationary / Regular / Resigned"
            FormHelperTextProps={{
              style: {
                fontStyle: 'italic',
              },
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Joining Date"
            value="November 15, 2021"
            variant="standard"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Employee Type"
            value="Mangement"
            variant="standard"
            helperText="Management / Client"
            FormHelperTextProps={{
              style: {
                fontStyle: 'italic',
              },
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Department"
            value="IT"
            variant="standard"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Position"
            value="IT Specialist"
            variant="standard"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Manager"
            value="Ralph Bondoc"
            variant="standard"
          />
        </Grid>
      </Grid>
    </Stack>
    <Stack gap={1}>
      <Typography variant="h6" fontWeight="bold">
        HMO
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Account Number"
            value="123ACBC"
            variant="standard"
          />
        </Grid>
      </Grid>
    </Stack>
    <Stack gap={1}>
      <Typography variant="h6" fontWeight="bold">
        HMO Dependent
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Account Number"
            value="123ACBC"
            variant="standard"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Name"
            value="123ACBC"
            variant="standard"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Relationship"
            value="123ACBC"
            variant="standard"
          />
        </Grid>
      </Grid>
    </Stack>
  </Stack>
);

export default Domain;
