import type { ReactElement } from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const ProgressBar = (): ReactElement => (
  <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1201 }}>
    <LinearProgress color="warning" />
  </Box>
);
