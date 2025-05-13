import { Theme, SxProps, PaletteColorOptions } from '@mui/material';
import { cardBase, hoverElevation, borderLeft, transitions } from '../../../../styles/common/mixins';

type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export const createCardStyles = (theme: Theme) => ({
  base: {
    ...cardBase(theme),
    height: '300px',
    boxShadow: theme.shadows[1],
    ...hoverElevation(theme),
  } as SxProps<Theme>,

  compact: {
    ...cardBase(theme),
    padding: theme.spacing(2),
    height: 'auto',
  } as SxProps<Theme>,

  elevated: {
    ...cardBase(theme),
    padding: theme.spacing(4),
    boxShadow: theme.shadows[4],
  } as SxProps<Theme>,

  header: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
  } as SxProps<Theme>,

  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  } as SxProps<Theme>,

  actions: {
    padding: theme.spacing(1, 2),
    borderTop: `1px solid ${theme.palette.divider}`,
  } as SxProps<Theme>,

  getColorBorder: (color: ThemeColor) => 
    borderLeft(theme, theme.palette[color].main) as SxProps<Theme>,

  getHoverTransition: () => 
    transitions.short(theme, ['transform', 'box-shadow']) as SxProps<Theme>,
}); 