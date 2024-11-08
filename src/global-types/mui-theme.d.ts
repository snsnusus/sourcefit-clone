import type { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {
    custom: {
      drawer: {
        width: {
          open: number;
          close: number;
        };
      };
    };
  }

  interface ThemeOptions {
    custom?: {
      drawer?: {
        width?: {
          open?: number;
          close?: number;
        };
      };
    };
  }
}
