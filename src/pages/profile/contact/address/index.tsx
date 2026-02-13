import { useState, type ReactElement } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import LocationPinIcon from '@mui/icons-material/LocationPin';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { AddAddressDialog } from './add-address-dialog';
import { Tooltip } from '@mui/material';

interface AddressType {
  addressLine: string;
  city: string;
  barangay: string;
  zipcode: string;
  formattedAddress?: string;
  label: string;
}

export const Address = (): ReactElement => {
  const [address, setAddress] = useState<AddressType[]>([
    {
      addressLine: '2574 B7 L4 SEPVHOAI, Daang Manunuso St.',
      city: 'Taguig',
      barangay: 'Ibayo-Tipas',
      zipcode: '1630',
      formattedAddress:
        '2574 B7 L4 SEPVHOAI, Daang Manunuso St., Ibayo-Tipas, Taguig, 1630',
      label: 'Main',
    },
  ]);
  const [open, setOpen] = useState(false);

  return (
    <Stack gap={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" fontWeight="fontWeightMedium">
          Address
        </Typography>
        <Box>
          <Tooltip title="Add Address" placement="top" arrow>
            <IconButton color="primary" onClick={() => setOpen(true)}>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Manage Address" placement="top" arrow>
            <IconButton color="primary">
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      <TextField
        fullWidth
        label={address[0].label}
        value={address[0].formattedAddress}
        variant="standard"
        slotProps={{
          input: {
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <LocationPinIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <AddAddressDialog open={open} onClose={() => setOpen(false)} />
    </Stack>
  );
};
