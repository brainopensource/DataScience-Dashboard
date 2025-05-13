import { Theme, SxProps } from '@mui/material';
import { BorderMixin } from './types';
import type { BorderOptions } from '../types';
import { transitions } from './transitions';

const createBorderStyles = (theme: Theme, options: BorderOptions): SxProps<Theme> => {
  const { color, width = 1, style = 'solid', side = 'all' } = options;
  const borderStyle = `${width}px ${style} ${color}`;
  const baseStyles = transitions.standard(theme, { properties: ['border'] });

  if (side === 'all') {
    return {
      ...baseStyles,
      border: borderStyle,
    };
  }

  return {
    ...baseStyles,
    [`border${side.charAt(0).toUpperCase() + side.slice(1)}`]: borderStyle,
  };
};

export const borders: BorderMixin = {
  create: createBorderStyles,

  left: (theme: Theme, options: BorderOptions): SxProps<Theme> => 
    createBorderStyles(theme, { ...options, side: 'left' }),

  right: (theme: Theme, options: BorderOptions): SxProps<Theme> => 
    createBorderStyles(theme, { ...options, side: 'right' }),

  top: (theme: Theme, options: BorderOptions): SxProps<Theme> => 
    createBorderStyles(theme, { ...options, side: 'top' }),

  bottom: (theme: Theme, options: BorderOptions): SxProps<Theme> => 
    createBorderStyles(theme, { ...options, side: 'bottom' }),

  rounded: (theme: Theme, radius?: number): SxProps<Theme> => ({
    borderRadius: radius ? theme.spacing(radius) : theme.shape.borderRadius,
  }),
} as const; 