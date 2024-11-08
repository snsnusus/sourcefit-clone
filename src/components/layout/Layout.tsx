import type { ReactElement } from 'react';
import { Suspense } from 'react';

import { styled } from '@mui/material';
import Box, { type BoxProps } from '@mui/material/Box';

import Navbar from './Navbar';
import Sidebar from './sidebar';
import Footer from './Footer';
import ContentWrapper from './ContentWrapper';

const Container = styled('div')({
  display: 'flex',
  minHeight: '100vh',
});

const Content = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  minHeight: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  marginBottom: theme.spacing(3),
}));

const TopOffset = styled('div')(({ theme }) => ({
  minHeight: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(2)})`,
}));

const BottomOffset = styled('div')(({ theme }) => ({
  minHeight: theme.spacing(4),
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
          <ContentWrapper>{children}</ContentWrapper>
          <BottomOffset />
        </Content>
        <Footer />
      </Container>
    </Suspense>
  );
};

export default Layout;
