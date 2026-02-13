import type { Theme, CSSObject } from '@mui/material';
import type { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';

import { useEffect, type ReactElement } from 'react';

import { styled, useTheme, useMediaQuery } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { useLocation } from 'react-router-dom';

import { useSidebarStore } from '~/stores/sidebar';

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

const PermanentDrawer = styled(MuiDrawer, {
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

const TemporaryDrawer = styled(MuiDrawer)({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
  },
});

const Drawer = ({ children }: PropsWithChildren): ReactElement => {
  const open = useSidebarStore((state) => state.open, Object.is);
  const onClose = useSidebarStore((state) => state.onClose, Object.is);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    if (isMobile) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      {isMobile ? (
        <TemporaryDrawer
          open={open}
          variant="temporary"
          onClose={() => onClose()}
        >
          {children}
        </TemporaryDrawer>
      ) : (
        <PermanentDrawer open={open} variant="permanent">
          {children}
        </PermanentDrawer>
      )}
    </>
  );
};

export default Drawer;
