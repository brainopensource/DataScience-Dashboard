import { Theme, SxProps } from '@mui/material';
import { MixinObject, SpacingOptions } from '../types';

type SpacingMixin = {
  xs: (theme: Theme) => SxProps<Theme>;
  sm: (theme: Theme) => SxProps<Theme>;
  md: (theme: Theme) => SxProps<Theme>;
  lg: (theme: Theme) => SxProps<Theme>;
  xl: (theme: Theme) => SxProps<Theme>;
  create: (theme: Theme, options: SpacingOptions) => SxProps<Theme>;
};

const createSpacingStyles = (theme: Theme, options: SpacingOptions): SxProps<Theme> => {
  const { x, y, responsive, breakpoints } = options;

  if (responsive && breakpoints) {
    return {
      padding: theme.spacing(y || 0, x || 0),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(breakpoints.sm || y || 0, breakpoints.sm || x || 0),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(breakpoints.md || y || 0, breakpoints.md || x || 0),
      },
      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(breakpoints.lg || y || 0, breakpoints.lg || x || 0),
      },
      [theme.breakpoints.up('xl')]: {
        padding: theme.spacing(breakpoints.xl || y || 0, breakpoints.xl || x || 0),
      },
    };
  }

  return {
    padding: theme.spacing(y || 0, x || 0),
  };
};

export const spacing: SpacingMixin = {
  xs: (theme: Theme): SxProps<Theme> => 
    createSpacingStyles(theme, { x: 1, y: 1 }),

  sm: (theme: Theme): SxProps<Theme> => 
    createSpacingStyles(theme, { x: 2, y: 2 }),

  md: (theme: Theme): SxProps<Theme> => 
    createSpacingStyles(theme, { x: 3, y: 3 }),

  lg: (theme: Theme): SxProps<Theme> => 
    createSpacingStyles(theme, { x: 4, y: 4 }),

  xl: (theme: Theme): SxProps<Theme> => 
    createSpacingStyles(theme, { x: 5, y: 5 }),

  create: createSpacingStyles,
} as const; 