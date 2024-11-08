import type { ReactElement } from 'react';

import type { Theme, CSSObject } from '@mui/material';
import type { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';

import { styled } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';

const openedMixin = (theme: Theme): CSSObject => ({
  width: theme.custom.drawer.width.open,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: 'initial',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: 'initial',
  width: theme.custom.drawer.width.close,
});

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop != 'open',
})<MuiDrawerProps>(({ theme, open }) => ({
  display: 'flex',
  width: theme.custom.drawer.width.open,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Drawer = ({
  open,
  children,
}: { open: boolean } & PropsWithChildren): ReactElement => (
  <CustomDrawer variant="permanent" open={open}>
    {children}
  </CustomDrawer>
);

export default Drawer;
