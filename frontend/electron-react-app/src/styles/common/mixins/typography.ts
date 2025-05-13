import { Theme, SxProps } from '@mui/material';
import { TypographyMixin } from './types';
import type { TypographyOptions } from '../types';

const getColorValue = (theme: Theme, color?: string): string => {
  if (!color) return 'inherit';
  switch (color) {
    case 'primary':
      return theme.palette.primary.main;
    case 'secondary':
      return theme.palette.secondary.main;
    case 'text':
      return theme.palette.text.primary;
    default:
      return color;
  }
};

const createTypographyStyles = (theme: Theme, options: TypographyOptions): SxProps<Theme> => {
  const { color, align, weight, truncate } = options;

  return {
    color: getColorValue(theme, color),
    textAlign: align || 'left',
    fontWeight: weight || 'normal',
    ...(truncate && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
  };
};

export const typography: TypographyMixin = {
  textBase: (theme: Theme): SxProps<Theme> => 
    createTypographyStyles(theme, { color: 'text' }),

  textSecondary: (theme: Theme): SxProps<Theme> => 
    createTypographyStyles(theme, { color: 'secondary' }),

  textPrimary: (theme: Theme): SxProps<Theme> => 
    createTypographyStyles(theme, { color: 'primary' }),

  textBold: (theme: Theme): SxProps<Theme> => 
    createTypographyStyles(theme, { weight: 'bold' }),

  textCenter: (theme: Theme): SxProps<Theme> => 
    createTypographyStyles(theme, { align: 'center' }),

  textLeft: (theme: Theme): SxProps<Theme> => 
    createTypographyStyles(theme, { align: 'left' }),

  textRight: (theme: Theme): SxProps<Theme> => 
    createTypographyStyles(theme, { align: 'right' }),

  truncate: (theme: Theme): SxProps<Theme> => 
    createTypographyStyles(theme, { truncate: true }),

  create: createTypographyStyles,
} as const; 