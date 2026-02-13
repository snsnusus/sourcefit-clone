import type { ReactNode } from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import Face4Icon from '@mui/icons-material/Face4';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';

export interface MenuType {
  label: string;
  path?: string;
  icon?: ReactNode;
  children?: Omit<MenuType, 'children'>[];
}

export const menu: MenuType[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: <Face4Icon />,
  },
  {
    label: 'Users',
    icon: <PeopleAltIcon />,
    children: [
      {
        icon: <CreateIcon />,
        path: '/users/create',
        label: 'Create',
      },
      {
        icon: <ListIcon />,
        path: '/users',
        label: 'List',
      },
    ],
  },
  {
    path: '/contacts',
    label: 'Contacts',
    icon: <ContactsIcon />,
  },
];
