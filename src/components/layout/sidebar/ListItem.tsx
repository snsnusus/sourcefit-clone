import type { ReactElement, ReactNode } from 'react';

import { styled } from '@mui/material';
import MuiListItem, {
  type ListItemProps as MuiListItemProps,
} from '@mui/material/ListItem';
import ListItemButton, {
  type ListItemButtonProps,
} from '@mui/material/ListItemButton';
import ListItemIcon, {
  type ListItemIconProps,
} from '@mui/material/ListItemIcon';
import ListItemText, {
  type ListItemTextProps,
} from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';

interface ListItemProps {
  path: string;
  label: string;
  icon: ReactNode;
  open: boolean;
}

const CustomNavLink = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
});

const CustomListItem = styled(MuiListItem)<MuiListItemProps>({
  display: 'block',
});

const CustomListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop != 'open',
})<ListItemButtonProps & { open: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  minHeight: 48,
  justifyContent: open ? 'initial' : 'center',
  ...(open && { padding: theme.spacing(1, 6) }),
}));

const CustomListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop != 'open',
})<ListItemIconProps & { open: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(open && { minWidth: 0 }),
  marginRight: open ? theme.spacing(4) : 'auto',
  justifyContent: 'center',
}));

const CustomListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop != 'open',
})<ListItemTextProps & { open: boolean }>(({ open }) => ({
  opacity: open ? 1 : 0,
}));

const ListItem = ({ path, label, icon, open }: ListItemProps): ReactElement => (
  <CustomListItem disablePadding>
    <CustomNavLink to={path}>
      {({ isActive }) => (
        <CustomListItemButton open={open} selected={isActive}>
          <CustomListItemIcon open={open}>{icon}</CustomListItemIcon>
          <CustomListItemText primary={label} open={open} />
        </CustomListItemButton>
      )}
    </CustomNavLink>
  </CustomListItem>
);

export default ListItem;
