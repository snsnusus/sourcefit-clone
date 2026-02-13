import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#e7700d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0d5ce7',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#1e1e1e',
      secondary: '#666666',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
  custom: {
    drawer: {
      width: {
        open: 260,
        close: 110,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
    },
  },
  typography: {
    fontFamily: ['Google Sans', 'sans-serif'].join(','),
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 900,
  },
});
