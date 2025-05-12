import { SxProps, Theme } from '@mui/material';

export const createCardStyles = (theme: Theme) => ({
  baseCard: {
    p: 3,
    bgcolor: theme.palette.background.paper,
    borderRadius: 2,
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.shadows[1],
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[4],
    },
  } as SxProps<Theme>,

  headerCard: {
    color: theme.palette.primary.main,
    mb: 3,
    fontWeight: 'bold',
  } as SxProps<Theme>,

  getBorderStyle: (color: keyof Theme['palette']) =>
    ({
      borderLeft: `4px solid ${theme.palette[color].main}`,
    }) as SxProps<Theme>,
});
