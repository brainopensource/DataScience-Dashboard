import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import BasePage, { BaseContainerProps, BaseTitleProps } from './BasePage';
import { useLayoutContext } from '../../contexts/LayoutContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { HeaderProps, FooterProps, SidebarProps, MainContentProps } from '../../types/contexts';

// Main props interface combines all specific interfaces
export type CustomPageProps = BaseContainerProps &
  BaseTitleProps &
  HeaderProps &
  FooterProps &
  SidebarProps &
  MainContentProps;

const CustomPage: React.FC<CustomPageProps> = ({
  header,
  footer,
  sidebar,
  sx: containerSx,
  headerSx,
  footerSx,
  sidebarSx,
  mainContentSx,
  children,
  ...basePageProps
}) => {
  const { isSidebarOpen, isHeaderVisible, isFooterVisible } = useLayoutContext();
  const { theme } = useThemeContext();

  const defaultMainContentSx: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: isSidebarOpen ? '240px' : 0,
  };

  const defaultSidebarSx: SxProps<Theme> = {
    width: 240,
    flexShrink: 0,
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: isSidebarOpen ? 'none' : 'translateX(-100%)',
    ...sidebarSx,
  };

  return (
    <BasePage {...basePageProps} containerSx={containerSx}>
      {header && isHeaderVisible && <Box sx={headerSx}>{header}</Box>}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {sidebar && <Box sx={defaultSidebarSx}>{sidebar}</Box>}
        <Box sx={{ ...defaultMainContentSx, ...mainContentSx }}>{children}</Box>
      </Box>
      {footer && isFooterVisible && <Box sx={footerSx}>{footer}</Box>}
    </BasePage>
  );
};

export default CustomPage;
