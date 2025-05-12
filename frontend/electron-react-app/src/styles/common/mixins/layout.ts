import { Theme, SxProps } from '@mui/material';
import { MixinObject, LayoutOptions } from '../types';

type LayoutMixin = {
  flex: (theme: Theme, options?: LayoutOptions) => SxProps<Theme>;
  flexCenter: (theme: Theme) => SxProps<Theme>;
  flexColumn: (theme: Theme) => SxProps<Theme>;
  flexBetween: (theme: Theme) => SxProps<Theme>;
  flexStart: (theme: Theme) => SxProps<Theme>;
  flexEnd: (theme: Theme) => SxProps<Theme>;
  fullWidth: (theme: Theme) => SxProps<Theme>;
  fullHeight: (theme: Theme) => SxProps<Theme>;
  fullSize: (theme: Theme) => SxProps<Theme>;
};

const createFlexStyles = (theme: Theme, options?: LayoutOptions): SxProps<Theme> => {
  const {
    direction = 'row',
    justify = 'center',
    align = 'center',
    gap = 0,
    wrap = 'nowrap',
  } = options || {};

  return {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    gap: theme.spacing(gap),
    flexWrap: wrap,
  };
};

export const layout: LayoutMixin = {
  flex: createFlexStyles,

  flexCenter: (theme: Theme): SxProps<Theme> => 
    createFlexStyles(theme, { justify: 'center', align: 'center' }),

  flexColumn: (theme: Theme): SxProps<Theme> => 
    createFlexStyles(theme, { direction: 'column' }),

  flexBetween: (theme: Theme): SxProps<Theme> => 
    createFlexStyles(theme, { justify: 'space-between' }),

  flexStart: (theme: Theme): SxProps<Theme> => 
    createFlexStyles(theme, { justify: 'flex-start' }),

  flexEnd: (theme: Theme): SxProps<Theme> => 
    createFlexStyles(theme, { justify: 'flex-end' }),

  fullWidth: (theme: Theme): SxProps<Theme> => ({
    width: '100%',
  }),

  fullHeight: (theme: Theme): SxProps<Theme> => ({
    height: '100%',
  }),

  fullSize: (theme: Theme): SxProps<Theme> => ({
    width: '100%',
    height: '100%',
  }),
} as const; 