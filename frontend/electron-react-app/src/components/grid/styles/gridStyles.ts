import { Theme, SxProps } from '@mui/material';

// Temporary styles until mixins are properly set up
const flexColumnStyle = (theme: Theme): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
});

const standardTransition = (theme: Theme, properties: string[] = ['all']): SxProps<Theme> => ({
  transition: theme.transitions.create(properties, {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
});

interface GridStyles {
  container: SxProps<Theme>;
  row: SxProps<Theme>;
  item: SxProps<Theme>;
  modularContainer: SxProps<Theme>;
  modularPaper: (backgroundColor?: string, borderRadius?: number | string) => SxProps<Theme>;
  modularContent: (spacing: number) => SxProps<Theme>;
  getTransition: () => SxProps<Theme>;
  getResponsiveSpacing: (spacing: number) => SxProps<Theme>;
}

export const createGridStyles = (theme: Theme): GridStyles => ({
  container: {
    width: '100%',
    height: '100%',
  },

  row: {
    width: '100%',
    margin: 0,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
  },

  modularContainer: {
    height: '100%',
  },

  modularPaper: (backgroundColor?: string, borderRadius?: number | string) => ({
    backgroundColor: backgroundColor || 'transparent',
    borderRadius: borderRadius || 0,
    height: '100%',
  }),

  modularContent: (spacing: number) => ({
    ...flexColumnStyle(theme),
    gap: theme.spacing(spacing),
  }),

  getTransition: () => 
    standardTransition(theme, ['margin', 'transform']),

  getResponsiveSpacing: (spacing: number) => ({
    xs: theme.spacing(spacing / 2),
    sm: theme.spacing(spacing),
  }),
}); 