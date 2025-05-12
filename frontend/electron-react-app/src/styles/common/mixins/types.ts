import { Theme, SxProps } from '@mui/material';
import { TransitionOptions, SpacingOptions, BorderOptions, TypographyOptions, LayoutOptions } from '../types';

export type TransitionsMixin = {
  standard: (theme: Theme, options?: TransitionOptions) => SxProps<Theme>;
  short: (theme: Theme, options?: TransitionOptions) => SxProps<Theme>;
  hover: (theme: Theme, options?: TransitionOptions) => SxProps<Theme>;
};

export type LayoutMixin = {
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

export type SpacingMixin = {
  xs: (theme: Theme) => SxProps<Theme>;
  sm: (theme: Theme) => SxProps<Theme>;
  md: (theme: Theme) => SxProps<Theme>;
  lg: (theme: Theme) => SxProps<Theme>;
  xl: (theme: Theme) => SxProps<Theme>;
  create: (theme: Theme, options: SpacingOptions) => SxProps<Theme>;
};

export type TypographyMixin = {
  textBase: (theme: Theme) => SxProps<Theme>;
  textSecondary: (theme: Theme) => SxProps<Theme>;
  textPrimary: (theme: Theme) => SxProps<Theme>;
  textBold: (theme: Theme) => SxProps<Theme>;
  textCenter: (theme: Theme) => SxProps<Theme>;
  textLeft: (theme: Theme) => SxProps<Theme>;
  textRight: (theme: Theme) => SxProps<Theme>;
  truncate: (theme: Theme) => SxProps<Theme>;
  create: (theme: Theme, options: TypographyOptions) => SxProps<Theme>;
};

export type BorderMixin = {
  create: (theme: Theme, options: BorderOptions) => SxProps<Theme>;
  left: (theme: Theme, options: BorderOptions) => SxProps<Theme>;
  right: (theme: Theme, options: BorderOptions) => SxProps<Theme>;
  top: (theme: Theme, options: BorderOptions) => SxProps<Theme>;
  bottom: (theme: Theme, options: BorderOptions) => SxProps<Theme>;
  rounded: (theme: Theme, radius?: number) => SxProps<Theme>;
}; 