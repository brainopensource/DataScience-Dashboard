import { Theme, SxProps } from '@mui/material';
import { layout, transitions } from '../../common/mixins';

export interface LayoutStyles {
  contentWrapper: SxProps<Theme>;
  headerWrapper: SxProps<Theme>;
  navBarWrapper: SxProps<Theme>;
  footerWrapper: SxProps<Theme>;
  sidebarWrapper: SxProps<Theme>;
  mainContent: SxProps<Theme>;
  getTransition: () => SxProps<Theme>;
}

export const createLayoutStyles = (theme: Theme): LayoutStyles => ({
  contentWrapper: {
    position: 'relative',
    minHeight: '100vh',
    ...layout.flexColumn(theme),
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
  },

  headerWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
  },

  navBarWrapper: {
    position: 'fixed',
    top: theme.spacing(3.75),
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar - 1,
  },

  footerWrapper: {
    position: 'fixed',
    bottom: theme.spacing(0.5),
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar - 1,
  },

  sidebarWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: theme.zIndex.drawer,
    ...layout.flexColumn(theme),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  },

  mainContent: {
    flex: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    ...layout.flexColumn(theme),
  },

  getTransition: () => 
    transitions.standard(theme, ['transform', 'width', 'margin']),
}); 