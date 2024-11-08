import type { ReactElement } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const UserDetailsLoadingScreen = (): ReactElement => (
  <Stack gap={2}>
    <Stack direction="row" gap={2} display="flex" alignItems="center">
      <Box>
        <Skeleton variant="circular" width={80} height={80} />
      </Box>
      <Stack gap={1} flexGrow={1}>
        <Typography variant="h4">
          <Skeleton variant="rounded" width={300} />
        </Typography>
        <Typography fontSize="1rem">
          <Skeleton variant="rounded" width={100} />
        </Typography>
      </Stack>
    </Stack>
  </Stack>
);

export default UserDetailsLoadingScreen;
