import { Theme, SxProps } from '@mui/material';

export interface SpacingOptions {
  x?: number;
  y?: number;
  all?: number;
}

export interface LayoutOptions {
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: number;
}

// Layout mixins
export const layout = {
  flex: (theme: Theme, options: LayoutOptions = {}): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: options.direction || 'row',
    justifyContent: options.justify || 'flex-start',
    alignItems: options.align || 'stretch',
    gap: options.gap ? theme.spacing(options.gap) : undefined,
  }),

  flexColumn: (theme: Theme, options: Omit<LayoutOptions, 'direction'> = {}): SxProps<Theme> => 
    layout.flex(theme, { ...options, direction: 'column' }),

  flexRow: (theme: Theme, options: Omit<LayoutOptions, 'direction'> = {}): SxProps<Theme> => 
    layout.flex(theme, { ...options, direction: 'row' }),

  flexCenter: (theme: Theme): SxProps<Theme> => 
    layout.flex(theme, { justify: 'center', align: 'center' }),
};

// Spacing mixins
export const spacing = {
  create: (theme: Theme, options: SpacingOptions): SxProps<Theme> => {
    const { x, y, all } = options;
    return {
      padding: all ? theme.spacing(all) : undefined,
      paddingX: x ? theme.spacing(x) : undefined,
      paddingY: y ? theme.spacing(y) : undefined,
    };
  },

  // Predefined spacing sizes
  xs: (theme: Theme): string => theme.spacing(1),
  sm: (theme: Theme): string => theme.spacing(2),
  md: (theme: Theme): string => theme.spacing(3),
  lg: (theme: Theme): string => theme.spacing(4),
  xl: (theme: Theme): string => theme.spacing(5),
};

// Transition mixins
export const transitions = {
  standard: (theme: Theme, properties: string[] = ['all']): SxProps<Theme> => ({
    transition: theme.transitions.create(properties, {
      duration: theme.transitions.duration.standard,
    }),
  }),

  short: (theme: Theme, properties: string[] = ['all']): SxProps<Theme> => ({
    transition: theme.transitions.create(properties, {
      duration: theme.transitions.duration.shorter,
    }),
  }),

  long: (theme: Theme, properties: string[] = ['all']): SxProps<Theme> => ({
    transition: theme.transitions.create(properties, {
      duration: theme.transitions.duration.complex,
    }),
  }),
};

// Common hover effects
export const hoverElevation = (theme: Theme, elevation: number = 4): SxProps<Theme> => ({
  ...transitions.standard(theme, ['transform', 'box-shadow']),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[elevation],
  },
});

// Common card styles
export const cardBase = (theme: Theme): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  bgcolor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.shorter,
  }),
});

// Common text styles
export const textBase = (theme: Theme): SxProps<Theme> => ({
  color: theme.palette.text.primary,
  whiteSpace: 'pre-line',
});

// Common border styles
export const borderLeft = (theme: Theme, color: string): SxProps<Theme> => ({
  borderLeft: `4px solid ${color}`,
  '&:hover': {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    transition: 'border-left 0.3s ease-in-out',
  },
}); 