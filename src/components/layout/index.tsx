import type { ReactElement } from 'react';
import { Suspense } from 'react';

import { styled } from '@mui/material';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Breadcrumb from './breadcrumb';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Footer from './footer';

const Container = styled('div')({
  display: 'flex',
  minHeight: '100vh',
});

const Content = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  minHeight: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  marginBottom: theme.mixins.toolbar.minHeight,
}));

const TopOffset = styled('div')(({ theme }) => ({
  minHeight: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(2)})`,
}));

const Layout = (props: PropsWithChildren): ReactElement => {
  const { children } = props;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Navbar />
        <Sidebar />
        <Content component="main">
          <TopOffset />
          <Stack py={2} px={4} gap={1}>
            <Breadcrumb />
            <Stack>{children}</Stack>
          </Stack>
        </Content>
        <Footer />
      </Container>
    </Suspense>
  );
};

export default Layout;
