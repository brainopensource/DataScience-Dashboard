import { Theme, SxProps } from '@mui/material';

// Common hover effects
export const hoverElevation = (theme: Theme, elevation: number = 4): SxProps<Theme> => ({
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.shorter,
  }),
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

// Common layout styles
export const flexCenter = (theme: Theme): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const flexColumn = (theme: Theme): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
});

// Common border styles
export const borderLeft = (theme: Theme, color: string): SxProps<Theme> => ({
  borderLeft: `4px solid ${color}`,
  '&:hover': {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    transition: 'border-left 0.3s ease-in-out',
  },
});

// Common spacing
export const spacing = {
  xs: (theme: Theme) => theme.spacing(1),
  sm: (theme: Theme) => theme.spacing(2),
  md: (theme: Theme) => theme.spacing(3),
  lg: (theme: Theme) => theme.spacing(4),
  xl: (theme: Theme) => theme.spacing(5),
};

// Common transitions
export const transitions = {
  standard: (theme: Theme, properties: string[] = ['all']) => 
    theme.transitions.create(properties, {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
  short: (theme: Theme, properties: string[] = ['all']) =>
    theme.transitions.create(properties, {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }),
}; 