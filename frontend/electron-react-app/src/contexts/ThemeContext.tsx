import React, { createContext, useContext, useState, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContextType, ThemeProviderProps } from '../types/contexts';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'light',
}) => {
  const [mode, setMode] = useState(initialMode);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // Add your custom theme configuration here
        },
      }),
    [mode]
  );

  const toggleTheme = useCallback(() => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const value = React.useMemo(
    () => ({
      mode,
      toggleTheme,
      theme,
    }),
    [mode, toggleTheme, theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
