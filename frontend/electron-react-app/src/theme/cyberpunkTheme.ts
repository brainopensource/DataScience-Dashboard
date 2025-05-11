import { createTheme } from '@mui/material/styles';

const cyberpunkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0024fe',
      light: '#0024fe',
      dark: '#0024fe',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0024fe',
      light: '#0024fe',
      dark: '#0024fe',
      contrastText: '#ffffff',
    },
    background: {
      default: '#030510',
      paper: '#030510',
    },
    text: {
      primary: '#ffffff',
      secondary: '#0024fe',
    },
    action: {
      active: '#0024fe',
      hover: '#0024fe',
      selected: '#0024fe',
      disabled: '#666666',
      disabledBackground: '#333333',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#030510',
          color: '#ffffff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#030510',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#030510',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(0, 36, 254, 0.1)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 36, 254, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(0, 36, 254, 0.2)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 36, 254, 0.05)',
          },
        },
      },
    },
  },
});

export default cyberpunkTheme; 