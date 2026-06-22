'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(89, 182, 61)',
      light: '#FFB74D',
      dark: '#d66325',
    },
    secondary: {
      main: '#FF6F00',
    },
    background: {
      default: '#11c24c',
      paper: '#e9f1e3',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
