import { Theme, SxProps } from '@mui/material';
import { MixinObject, TransitionOptions, StyleFunction } from '../types';

type TransitionsMixin = {
  standard: (theme: Theme, options?: TransitionOptions) => SxProps<Theme>;
  short: (theme: Theme, options?: TransitionOptions) => SxProps<Theme>;
  hover: (theme: Theme, options?: TransitionOptions) => SxProps<Theme>;
};

export const transitions: TransitionsMixin = {
  standard: (theme: Theme, options?: TransitionOptions): SxProps<Theme> => {
    const properties = options?.properties || ['all'];
    const duration = options?.duration || theme.transitions.duration.standard;
    const easing = options?.easing || theme.transitions.easing.easeInOut;

    return {
      transition: theme.transitions.create(properties, { duration, easing }),
    };
  },

  short: (theme: Theme, options?: TransitionOptions): SxProps<Theme> => {
    const properties = options?.properties || ['all'];
    const duration = options?.duration || theme.transitions.duration.shorter;
    const easing = options?.easing || theme.transitions.easing.easeInOut;

    return {
      transition: theme.transitions.create(properties, { duration, easing }),
    };
  },

  hover: (theme: Theme, options?: TransitionOptions): SxProps<Theme> => {
    const properties = options?.properties || ['transform', 'box-shadow'];
    const duration = options?.duration || theme.transitions.duration.shorter;
    const easing = options?.easing || theme.transitions.easing.easeInOut;

    return {
      transition: theme.transitions.create(properties, { duration, easing }),
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4],
      },
    };
  },
} as const; 