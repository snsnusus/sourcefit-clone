import type { RouteObject } from 'react-router-dom';

import { Outlet } from 'react-router-dom';

import { loadable } from '~/utils';

import App from '../App';

const UsersCreate = loadable(() => import('../pages/users/create'));
// const Users = loadable(() => import('../pages/users'));
const Profile = loadable(() => import('../pages/profile'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        errorElement: <h1>NOT FOUND PAGE</h1>,
        children: [
          {
            index: true,
            element: <h1>DASHBOARD</h1>,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'users',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <>Users: Index Page...</>,
              },
              {
                path: 'create',
                element: <UsersCreate />,
              },
            ],
          },
        ],
      },
    ],
  },
];
