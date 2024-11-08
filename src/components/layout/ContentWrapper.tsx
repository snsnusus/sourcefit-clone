import type { ReactElement } from 'react';

import Box from '@mui/material/Box';

const ContentWrapper = ({ children }: PropsWithChildren): ReactElement => (
  <Box p={2}>{children}</Box>
);

export default ContentWrapper;
