import { createTheme, Theme } from '@mui/material/styles';

// Define theme colors and other constants
const themeColors = {
  primary: '#2196f3',
  primaryDark: '#1976d2', // Darker shade of primary for hover
  background: {
    default: '#000000',
    paper: '#1a1a1a',
  },
};

// Create the theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: themeColors.primary,
      dark: themeColors.primaryDark,
    },
    background: {
      default: themeColors.background.default,
      paper: themeColors.background.paper,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          scrollbarWidth: 'thin',           // Firefox
          msOverflowStyle: 'none',         // IE 10+
        },
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: themeColors.background.default,
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: themeColors.primary,
          borderRadius: '4px',
          border: '2px solid transparent',
          backgroundClip: 'content-box',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: themeColors.primaryDark,
        },
      },
    },
  },
  zIndex: {
    drawer: 1100,
    appBar: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
