import type { MenuType } from './menu';

import { useState, useEffect, type ReactElement, type MouseEvent } from 'react';

import { useLocation, matchPath, NavLink } from 'react-router-dom';
import { styled, useTheme, useMediaQuery } from '@mui/material';
import List from '@mui/material/List';
import MuiListItem, { type ListItemProps } from '@mui/material/ListItem';
import MuiListItemButton, {
  type ListItemButtonProps,
} from '@mui/material/ListItemButton';
import MuiListItemIcon, {
  type ListItemIconProps,
} from '@mui/material/ListItemIcon';
import MuiListItemText, {
  type ListItemTextProps,
} from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Menu from '@mui/material/Menu';

import { useSidebarStore } from '~/stores/sidebar';

const NavigationLink = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
});

const ListItem = styled(MuiListItem)<ListItemProps>({
  display: 'block',
});

const ListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop != 'open',
})<ListItemButtonProps & { open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  minHeight: 48,
  justifyContent: open ? 'initial' : 'center',
  ...(open && { padding: theme.spacing(1, 3.5) }),
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const ListItemIcon = styled(MuiListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isActive',
})<ListItemIconProps & { open?: boolean; isActive?: boolean }>(
  ({ theme, open, isActive }) => ({
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    justifyContent: 'center',
    ...(open && { minWidth: 0 }),
    ...(open && { marginRight: theme.spacing(4) }),
    ...(isActive && { color: theme.palette.primary.main }),
  })
);

const ListItemText = styled(MuiListItemText, {
  shouldForwardProp: (prop) => prop != 'open',
})<ListItemTextProps & { open?: boolean }>(({ open }) => ({
  display: open !== undefined ? (open ? 'block' : 'none') : 'block',
}));

const MenuItem = ({
  open,
  path,
  label,
  icon,
  children,
}: MenuType & { open: boolean }): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onClose = useSidebarStore((state) => state.onClose);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const location = useLocation();

  const hasChildren = !!children;

  const isParentActive = hasChildren
    ? children.some((child) => {
        if (child.path) {
          const match = matchPath(
            { path: child.path, end: true },
            location.pathname
          );
          return !!match;
        }
        return false;
      })
    : false;

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (open && hasChildren) {
      setCollapsed(!collapsed);
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  useEffect(() => {
    setCollapsed(open);
  }, [open]);

  useEffect(() => {
    setAnchorEl(null);
  }, [location]);

  return (
    <ListItem disablePadding>
      {path ? (
        <NavigationLink to={path} end>
          {({ isActive }) => (
            <ListItemButton open={open} selected={isActive}>
              {icon && (
                <ListItemIcon open={open} isActive={isActive}>
                  {icon}
                </ListItemIcon>
              )}
              <ListItemText primary={label} open={open} />
            </ListItemButton>
          )}
        </NavigationLink>
      ) : (
        <ListItemButton
          open={open}
          onClick={handleClick}
          divider={hasChildren && collapsed && open}
          selected={isParentActive}
        >
          <ListItemIcon open={open} isActive={isParentActive}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} open={open} />
          {hasChildren &&
            open &&
            (collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </ListItemButton>
      )}

      {hasChildren &&
        (open ? (
          <Collapse in={collapsed && open} unmountOnExit>
            <List component="div" disablePadding>
              {children.map((child) => (
                <NavigationLink key={child.path} to={child.path as string} end>
                  {({ isActive }) => (
                    <ListItemButton
                      open={open}
                      selected={isActive}
                      divider
                      sx={{ paddingLeft: 6.75 }}
                    >
                      {icon && (
                        <ListItemIcon open={open} isActive={isActive}>
                          {child.icon}
                        </ListItemIcon>
                      )}
                      <ListItemText primary={child.label} open={open} />
                    </ListItemButton>
                  )}
                </NavigationLink>
              ))}
            </List>
          </Collapse>
        ) : (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {children.map((child) => (
              <NavigationLink key={child.path} to={child.path as string} end>
                {({ isActive }) => (
                  <ListItemButton
                    selected={isActive}
                    divider
                    sx={{ pl: 6, pr: 7 }}
                  >
                    {icon && (
                      <ListItemIcon
                        isActive={isActive}
                        sx={{ marginRight: 4, minWidth: 0 }}
                      >
                        {child.icon}
                      </ListItemIcon>
                    )}
                    <ListItemText primary={child.label} />
                  </ListItemButton>
                )}
              </NavigationLink>
            ))}
          </Menu>
        ))}
    </ListItem>
  );
};

export default MenuItem;
