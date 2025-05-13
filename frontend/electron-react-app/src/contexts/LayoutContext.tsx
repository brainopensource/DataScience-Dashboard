import React, { createContext, useContext, useState, useCallback } from 'react';
import { LayoutContextType, LayoutProviderProps, LayoutState } from '../types/contexts';

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children, initialState = {} }) => {
  const [state, setState] = useState<LayoutState>({
    isSidebarOpen: true,
    isHeaderVisible: true,
    isFooterVisible: true,
    ...initialState,
  });

  const toggleSidebar = useCallback(() => {
    setState(prev => ({
      ...prev,
      isSidebarOpen: !prev.isSidebarOpen,
    }));
  }, []);

  const setHeaderVisibility = useCallback((visible: boolean) => {
    setState(prev => ({
      ...prev,
      isHeaderVisible: visible,
    }));
  }, []);

  const setFooterVisibility = useCallback((visible: boolean) => {
    setState(prev => ({
      ...prev,
      isFooterVisible: visible,
    }));
  }, []);

  const value = React.useMemo(
    () => ({
      ...state,
      toggleSidebar,
      setHeaderVisibility,
      setFooterVisibility,
    }),
    [state, toggleSidebar, setHeaderVisibility, setFooterVisibility]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export default LayoutProvider;
