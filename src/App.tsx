import type { ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import Layout from '~/components/layout';

const App = (): ReactElement => (
  <Layout>
    <Outlet />
  </Layout>
);

export default App;
