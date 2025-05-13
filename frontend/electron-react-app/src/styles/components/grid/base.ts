import { Theme, SxProps } from '@mui/material';
import { transitions, layout, spacing } from '../../common/mixins';
import type { StyleObject, TransitionOptions, SpacingOptions } from '../../common/types';

export interface GridStyles extends StyleObject {
  container: SxProps<Theme>;
  row: SxProps<Theme>;
  item: SxProps<Theme>;
  modularContainer: SxProps<Theme>;
  modularPaper: SxProps<Theme>;
  modularContent: SxProps<Theme>;
  getTransition: (theme: Theme) => SxProps<Theme>;
  getResponsiveSpacing: (theme: Theme, spacing: number) => SxProps<Theme>;
}

export const createGridStyles = (theme: Theme): GridStyles => {
  const baseTransition = transitions.standard(theme);
  const hoverTransition = transitions.hover(theme, {
    properties: ['transform', 'box-shadow'],
  } as TransitionOptions);

  const baseLayout = layout.flex(theme, { direction: 'column', gap: 2 });
  const baseRowLayout = layout.flex(theme, { justify: 'flex-start', gap: 2 });
  const baseItemLayout = layout.flex(theme, { justify: 'center', align: 'center' });
  const baseContentLayout = layout.flex(theme, { direction: 'column', gap: 2 });

  const baseSpacing = spacing.create(theme, { x: 2, y: 2 } as SpacingOptions);
  const contentSpacing = spacing.create(theme, { x: 3, y: 3 } as SpacingOptions);

  return {
    container: {
      ...baseLayout,
      width: '100%',
    },

    row: {
      ...baseRowLayout,
      width: '100%',
    },

    item: {
      ...baseItemLayout,
      ...baseSpacing,
      minHeight: '100px',
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      ...baseTransition,
    },

    modularContainer: {
      ...baseLayout,
      ...baseSpacing,
      width: '100%',
      maxWidth: '100%',
      margin: '0 auto',
    },

    modularPaper: {
      ...baseLayout,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
      overflow: 'hidden',
    },

    modularContent: {
      ...baseContentLayout,
      ...contentSpacing,
      width: '100%',
    },

    getTransition: (theme: Theme): SxProps<Theme> => hoverTransition,

    getResponsiveSpacing: (theme: Theme, baseSpacing: number): SxProps<Theme> => 
      spacing.create(theme, {
        responsive: true,
        breakpoints: {
          xs: baseSpacing / 2,
          sm: baseSpacing,
          md: baseSpacing * 1.5,
          lg: baseSpacing * 2,
          xl: baseSpacing * 2.5,
        },
      } as SpacingOptions),
  };
}; 