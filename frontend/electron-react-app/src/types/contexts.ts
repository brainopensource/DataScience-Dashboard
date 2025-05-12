import { Theme, PaletteMode } from '@mui/material';
import { SxProps } from '@mui/system';

// Theme Context Types
export interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
  theme: Theme;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: PaletteMode;
}

// Layout Context Types
export interface LayoutState {
  isSidebarOpen: boolean;
  isHeaderVisible: boolean;
  isFooterVisible: boolean;
}

export interface LayoutContextType extends LayoutState {
  toggleSidebar: () => void;
  setHeaderVisibility: (visible: boolean) => void;
  setFooterVisibility: (visible: boolean) => void;
}

export interface LayoutProviderProps {
  children: React.ReactNode;
  initialState?: Partial<LayoutState>;
}

// Common Types
export interface StyleProps {
  sx?: SxProps<Theme>;
  className?: string;
}

// Component Props Types
export interface BaseContainerProps extends StyleProps {
  children?: React.ReactNode;
  containerSx?: SxProps<Theme>;
}

export interface BaseTitleProps extends StyleProps {
  title: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  showTitle?: boolean;
  titleSx?: SxProps<Theme>;
}

export interface HeaderProps extends StyleProps {
  header?: React.ReactNode;
  headerSx?: SxProps<Theme>;
}

export interface FooterProps extends StyleProps {
  footer?: React.ReactNode;
  footerSx?: SxProps<Theme>;
}

export interface SidebarProps extends StyleProps {
  sidebar?: React.ReactNode;
  sidebarSx?: SxProps<Theme>;
}

export interface MainContentProps extends StyleProps {
  children?: React.ReactNode;
  mainContentSx?: SxProps<Theme>;
}
