import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ModalProvider } from 'mui-modal-provider';
import { SnackbarProvider, type SnackbarOrigin } from 'notistack';
import { WebSocketProvider } from './contexts/websocket.context';
import { MockAuthProvider } from './contexts/auth.context';
import AppRouter from './routes';

import { theme } from './theme';

const anchorOrigin: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

const container = document.getElementById('root') as HTMLElement;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

createRoot(container).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider anchorOrigin={anchorOrigin} maxSnack={3}>
          <ModalProvider>
            <WebSocketProvider>
              <MockAuthProvider>
                <AppRouter />
              </MockAuthProvider>
            </WebSocketProvider>
          </ModalProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
