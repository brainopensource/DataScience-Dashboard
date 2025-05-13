import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import AppRoutes from './routes';
import ThemeProvider from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

export default App;
