import type { ReactElement } from 'react';

import type { Theme, CSSObject } from '@mui/material';
import type { AppBarProps } from '@mui/material/AppBar';

import { useNavigation } from 'react-router-dom';
import { alpha, styled } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar, { type ToolbarProps } from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

import { ProgressBar } from '~/components';
import { useSidebarStore } from '~/stores';

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  padding: theme.spacing(1, 2),
  // zIndex: theme.zIndex.drawer + 1,
}));

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: theme.custom.drawer.width.open,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: theme.custom.drawer.width.close,
});

const CustomToolbar = styled(Toolbar, {
  shouldForwardProp: (props) => props != 'open',
})<ToolbarProps & { open: boolean }>(({ theme, open }) => ({
  ...(open && {
    ...openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 450,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '&.MuiInputBase-root': {
    width: '100%',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const Navbar = (): ReactElement => {
  const { state: navigationState } = useNavigation();
  const { open, toggle } = useSidebarStore((state) => ({
    open: state.open,
    toggle: state.toggle,
  }));

  return (
    <>
      {navigationState === 'loading' ? <ProgressBar /> : null}
      <AppBar position="fixed">
        <CustomToolbar open={open} disableGutters>
          <Stack direction="row" gap={2}>
            <IconButton sx={{ color: '#ffffff' }} onClick={toggle}>
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" gap={2}>
            <Box>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Box>
            <Box>
              <Tooltip title="Settings">
                <IconButton onClick={() => console.log('CLICK')} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/assets/avatar.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </CustomToolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
