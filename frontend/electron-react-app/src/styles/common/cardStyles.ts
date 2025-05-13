import { SxProps, Theme } from '@mui/material';
import { transitions, layout, spacing } from './mixins';

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export interface CardStyles {
  base: SxProps<Theme>;
  compact: SxProps<Theme>;
  elevated: SxProps<Theme>;
  header: SxProps<Theme>;
  content: SxProps<Theme>;
  actions: SxProps<Theme>;
  getColorBorder: (color: ThemeColor) => SxProps<Theme>;
  getHoverTransition: () => SxProps<Theme>;
}

/**
 * Creates a set of reusable card styles using MUI's theme
 * @param theme - MUI theme object
 * @returns Object containing all card-related styles
 */
export const createCardStyles = (theme: Theme): CardStyles => ({
  base: {
    ...layout.flexColumn(theme),
    ...spacing.create(theme, { x: 3, y: 3 }),
    height: '300px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    transition: transitions.standard(theme, ['transform', 'box-shadow']),
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[4],
    },
  },

  compact: {
    ...layout.flexColumn(theme),
    ...spacing.create(theme, { x: 2, y: 2 }),
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },

  elevated: {
    ...layout.flexColumn(theme),
    ...spacing.create(theme, { x: 4, y: 4 }),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },

  header: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
  },

  content: {
    ...layout.flexColumn(theme),
    ...spacing.create(theme, { x: 2, y: 2 }),
    flex: 1,
  },

  actions: {
    padding: theme.spacing(1, 2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },

  getColorBorder: (color: ThemeColor) => ({
    borderLeft: `4px solid ${theme.palette[color].main}`,
  }),

  getHoverTransition: () => 
    transitions.short(theme, ['transform', 'box-shadow']),
});
