import type { ReactElement, ChangeEvent } from 'react';
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiPhoneNumber from 'material-ui-phone-number';

interface CreateDialogProps {
  open: boolean;
  handleClose: () => void;
}

const CreateDialog = ({
  open,
  handleClose,
}: CreateDialogProps): ReactElement => {
  const [value, setValue] = useState('');

  const handleChange = (
    e: [string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>]
  ): void => {
    const [phoneNumber] = e;
    setValue(phoneNumber as string);
  };

  const onClose = (_: object, reason: string): void => {
    if (reason !== 'backdropClick') {
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
      keepMounted
    >
      <DialogTitle>User Creation</DialogTitle>
      <DialogContent dividers>
        <Stack gap={2}>
          <Stack direction="row" gap={4}>
            <Stack gap={2}>
              <Typography fontSize="1.1rem" fontWeight="bold">
                Profile Image
              </Typography>
              <Avatar variant="rounded" sx={{ width: 150, height: 150 }} />
            </Stack>
            <Stack gap={1}>
              <Typography fontSize="1.1rem" fontWeight="bold">
                Identity
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="First Name *"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Middle Name *"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="Last Name *" variant="standard" />
                </Grid>
                <Grid item xs={2}>
                  <TextField fullWidth label="Suffix" variant="standard" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Preferred Nickname"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="Gender *" variant="standard" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Date of Birth *"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Birthplace *"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="Religion" variant="standard" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Nationality *"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Marital Status *"
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
          <Stack gap={1}>
            <Typography fontSize="1.1rem" fontWeight="bold">
              Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Unit/House No. *"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label="Street *" variant="standard" />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label="Barangay *" variant="standard" />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label="City *" variant="standard" />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField fullWidth label="Postal Code *" variant="standard" />
              </Grid>
            </Grid>
          </Stack>
          <Stack gap={1}>
            <Typography fontSize="1.1rem" fontWeight="bold">
              Contact Number
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <MuiPhoneNumber
                  defaultCountry="ph"
                  fullWidth
                  variant="standard"
                  label="Primary"
                  value={value}
                  onChange={(...data) => handleChange(data)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label="Street *" variant="standard" />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label="Tag *" variant="standard" />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDialog;
