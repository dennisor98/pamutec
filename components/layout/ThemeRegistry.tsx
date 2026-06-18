'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
    fontFamily: inter.style.fontFamily,
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
