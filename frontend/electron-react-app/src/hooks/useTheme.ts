import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const useTheme = () => {
  const { theme, toggleTheme } = useStore();

  useEffect(() => {
    // Update document class when theme changes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };
}; 