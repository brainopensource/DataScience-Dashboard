import { Theme, SxProps } from '@mui/material';
import { cardBase, hoverElevation, borderLeft, transitions } from '../../common/mixins';

export interface CardStyles {
  base: SxProps<Theme>;
  compact: SxProps<Theme>;
  elevated: SxProps<Theme>;
  header: SxProps<Theme>;
  content: SxProps<Theme>;
  actions: SxProps<Theme>;
  getColorBorder: (color: string) => SxProps<Theme>;
  getHoverTransition: () => SxProps<Theme>;
}

export const createCardStyles = (theme: Theme): CardStyles => ({
  base: {
    ...cardBase(theme),
    height: '300px',
    boxShadow: theme.shadows[1],
    ...hoverElevation(theme),
  },

  compact: {
    ...cardBase(theme),
    padding: theme.spacing(2),
    height: 'auto',
  },

  elevated: {
    ...cardBase(theme),
    padding: theme.spacing(4),
    boxShadow: theme.shadows[4],
  },

  header: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },

  actions: {
    padding: theme.spacing(1, 2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },

  getColorBorder: (color: string) => 
    borderLeft(theme, theme.palette[color as keyof typeof theme.palette]?.main || color),

  getHoverTransition: () => 
    transitions.short(theme, ['transform', 'box-shadow']),
}); 