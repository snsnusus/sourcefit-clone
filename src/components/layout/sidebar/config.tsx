import type { ReactNode } from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import MailIcon from '@mui/icons-material/Mail';
import AppsIcon from '@mui/icons-material/Apps';
import Face4Icon from '@mui/icons-material/Face4';

interface ListItems {
  path: string;
  label: string;
  icon: ReactNode;
}

export const listItems: ListItems[] = [
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
    path: '/users',
    label: 'Users',
    icon: <PeopleAltIcon />,
  },
  {
    path: '/contacts',
    label: 'Contacts',
    icon: <ContactsIcon />,
  },
  {
    path: '/mail',
    label: 'Mail',
    icon: <MailIcon />,
  },
  {
    path: '/react-router',
    label: 'React Router',
    icon: <AppsIcon />,
  },
];
