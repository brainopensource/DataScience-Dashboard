import { Theme, SxProps } from '@mui/material';

export type StyleFunction<T = void> = (theme: Theme, ...args: any[]) => SxProps<Theme>;

export interface MixinObject<T extends string = string> {
  [key: string]: StyleFunction;
}

export interface StyleObject<T extends string = string> {
  [key: string]: SxProps<Theme> | StyleFunction;
}

export type TransitionProperties = string[] | 'all';

export interface TransitionOptions {
  duration?: number;
  easing?: string;
  properties?: TransitionProperties;
}

export interface SpacingOptions {
  x?: number;
  y?: number;
  responsive?: boolean;
  breakpoints?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export interface BorderOptions {
  color: string;
  width?: number;
  style?: 'solid' | 'dashed' | 'dotted';
  side?: 'left' | 'right' | 'top' | 'bottom' | 'all';
}

export interface TypographyOptions {
  color?: 'primary' | 'secondary' | 'text' | string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | number;
  truncate?: boolean;
}

export interface LayoutOptions {
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
} 