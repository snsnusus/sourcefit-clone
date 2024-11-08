import type { ReactElement } from 'react';

import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';

const Content = styled(Stack)({
  whiteSpace: 'unset',
  overflowX: 'hidden',
  overflowY: 'auto',
  flexGrow: 1,
});

const DrawerContent = ({ children }: PropsWithChildren): ReactElement => (
  <Content>{children}</Content>
);

export default DrawerContent;
