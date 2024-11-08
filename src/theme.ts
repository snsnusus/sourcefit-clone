import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#e7700d',
      contrastText: '#ffffff',
    },
  },
  custom: {
    drawer: {
      width: {
        open: 306,
        close: 108,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
});
