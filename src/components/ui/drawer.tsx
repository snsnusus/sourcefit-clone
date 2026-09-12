import {
  type ReactNode,
  type ReactElement,
  type PropsWithChildren,
} from 'react';

import {
  Box,
  Drawer as MuiDrawer,
  type DrawerProps as MuiDrawerProps,
  Typography,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface DrawerProps {
  open: boolean;
  anchor?: MuiDrawerProps['anchor'];
  title: string;
  onClose: () => void;
  action?: ReactNode;
}

const Drawer = ({
  open,
  anchor,
  title,
  onClose,
  action,
  children,
}: PropsWithChildren<DrawerProps>): ReactElement => (
  <MuiDrawer
    anchor={anchor ?? 'right'}
    open={open}
    onClose={(_e, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (reason === 'backdropClick') {
        return;
      }

      onClose();
    }}
    slotProps={{
      paper: {
        sx: {
          width: { xs: '100%', sm: 400, md: 500 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    }}
  >
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="body1"
        color="primary.main"
        sx={{
          fontWeight: 600,
        }}
      >
        {title.toUpperCase()}
      </Typography>
      <IconButton size="small" onClick={onClose} color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>{children}</Box>
    <Box
      sx={{
        p: 2,
        display: 'flex',
        gap: 1.5,
        justifyContent: 'flex-end',
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      {action}
    </Box>
  </MuiDrawer>
);

export default Drawer;
