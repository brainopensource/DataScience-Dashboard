import { Theme } from '@mui/material/styles';

export const commonTextStyles = {
  p: 2,
  borderRadius: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const headerStyles = (theme: Theme) => ({
  color: theme.palette.primary.main,
  mb: 2,
});

export const getBorderStyle = (theme: Theme, colorCode: string) => ({
  borderLeft: `4px solid ${colorCode}`,
  '&:hover': {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    transition: 'border-left 0.3s ease-in-out',
  },
});

export const cardStyles = (theme: Theme) => ({
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 3,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
});
