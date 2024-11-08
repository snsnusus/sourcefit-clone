import type { RouteObject } from 'react-router-dom';

import App from '~/App';
import { getUsersLoader, getuserDetailsLoader } from '~/routes/loaders';
import { loadable } from '~/utils';

const UsersRootPage = loadable(() => import('~/pages/users'));
const Profile = loadable(() => import('~/pages/profile'));

const ReactRouterRootPage = loadable(() => import('~/pages/react-router/root'));
const ReactRouterUserDetaisPage = loadable(
  () => import('~/pages/react-router/user-details')
);

export const appRoutes: RouteObject[] = [
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
            element: <UsersRootPage />,
          },
          {
            path: 'contacts',
            element: <h1>CONTACTS</h1>,
          },
          {
            path: 'mail',
            element: <h1>MAIL</h1>,
          },
          {
            path: 'react-router',
            element: <ReactRouterRootPage />,
            loader: getUsersLoader,
            children: [
              {
                path: 'users/:userID',
                element: <ReactRouterUserDetaisPage />,
                loader: getuserDetailsLoader,
              },
            ],
          },
        ],
      },
    ],
  },
];
