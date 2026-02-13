import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ModalProvider } from 'mui-modal-provider';
import { SnackbarProvider, type SnackbarOrigin } from 'notistack';

import { queryClient } from './queries/config';
import { theme } from './theme';
import { routes } from './routes';

const router = createBrowserRouter(routes);

const anchorOrigin: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider anchorOrigin={anchorOrigin}>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
