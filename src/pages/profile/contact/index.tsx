import type { ReactElement } from 'react';

import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ReactCountryFlag } from 'react-country-flag';

import { Address } from './address';

const Contact = (): ReactElement => (
  <Container maxWidth="sm">
    <Stack gap={3}>
      <Address />
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="fontWeightMedium">
          Contact Number
        </Typography>
        <TextField
          fullWidth
          label="Primary"
          defaultValue="9365449043"
          variant="standard"
          InputProps={{
            startAdornment: (
              <>
                <InputAdornment position="start">
                  <ReactCountryFlag countryCode="PH" svg />
                </InputAdornment>
                <InputAdornment position="start">+63</InputAdornment>
              </>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Chip label="Mobile" color="primary" sx={{ height: '20px' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack gap={1}>
        <Typography variant="h6" fontWeight="bold">
          Email
        </Typography>
        <TextField
          fullWidth
          label="Primary"
          defaultValue="pvargas@gmail.com"
          variant="standard"
          InputProps={{
            style: { width: 'auto' },
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack gap={2}>
        <Typography variant="h6" fontWeight="bold">
          Emergency Contact
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value="Ma. Lourdes Vargas"
          variant="standard"
        />
        <TextField
          fullWidth
          label="Relationship"
          value="Parent"
          variant="standard"
        />
        <TextField
          label="Primary Contact Number"
          defaultValue="9198693717"
          variant="standard"
          InputProps={{
            startAdornment: (
              <>
                <InputAdornment position="start">
                  <ReactCountryFlag countryCode="PH" svg />
                </InputAdornment>
                <InputAdornment position="start">+63</InputAdornment>
              </>
            ),
          }}
        />
        <TextField
          label="Secondary Contact Number"
          defaultValue="9198693717"
          variant="standard"
          InputProps={{
            startAdornment: (
              <>
                <InputAdornment position="start">
                  <ReactCountryFlag countryCode="PH" svg />
                </InputAdornment>
                <InputAdornment position="start">+63</InputAdornment>
              </>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Address"
          value="690 Mangga St., Napico, Manggahan, Pasig City"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  </Container>
);

export default Contact;
