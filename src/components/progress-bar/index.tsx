import type { ReactElement } from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const ProgressBar = (): ReactElement => (
  <Box sx={{ width: '100%', position: 'fixed', zIndex: 1202 }}>
    <LinearProgress color="warning" />
  </Box>
);
