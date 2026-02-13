import type { ReactElement } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import cities from '~/data/cities.json';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AddAddressDialog = ({ open, onClose }: Props): ReactElement => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle variant="h6">Add Address</DialogTitle>
      <DialogContent dividers>
        <Container maxWidth="xs">
          <Stack gap={2}>
            <TextField
              name="addressLine"
              variant="outlined"
              size="small"
              label="Address Line"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <Autocomplete
              options={cities
                .sort((a, b) => a.city.localeCompare(b.city))
                .map(({ city }) => city)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  size="small"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                    select: {
                      multiple: false,
                    },
                  }}
                />
              )}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Barangay"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              name="zipcode"
              variant="outlined"
              size="small"
              label="Zipcode"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              name="zipcode"
              variant="outlined"
              size="small"
              label="Zipcode"
              select
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              <MenuItem></MenuItem>
            </TextField>
          </Stack>
        </Container>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onClose}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
