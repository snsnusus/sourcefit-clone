import type { ReactElement, ReactNode } from 'react';

import Stack from '@mui/material/Stack';

interface TabPanelProps {
  children?: ReactNode;
  index: ReactNode;
  value: string | number;
}

const TabPanel = (props: TabPanelProps): ReactElement => {
  const { children, value, index, ...other } = props;

  return (
    <Stack
      sx={{
        display: value !== index ? 'none' : 'flex',
      }}
      flexGrow={1}
      {...other}
    >
      {children}
    </Stack>
  );
};

export default TabPanel;
