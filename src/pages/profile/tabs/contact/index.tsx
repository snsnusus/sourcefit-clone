import type { ReactElement } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';

import Address from './address';
import ContactNumber from './contact-number';
import Email from './email';
import EmergencyContact from './emergency-contact';

export const Contact = (): ReactElement => (
  <Stack
    spacing={2}
    sx={{
      padding: 2,
    }}
  >
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Stack>
        <Typography
          variant="body1"
          color="text.muted"
          sx={{
            fontWeight: 'fontWeightMedium',
          }}
        >
          Contact Details
        </Typography>
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
    </Stack>
    <Address />
    <Divider />
    <ContactNumber />
    <Divider />
    <Email />
    <Divider />
    <EmergencyContact />
  </Stack>
);

export default Contact;
