import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

export interface GridItem {
  id: string;
  component: ReactNode;
  props?: Record<string, any>;
  xs?: number; // 1-12 for extra small screens
  sm?: number; // 1-12 for small screens
  md?: number; // 1-12 for medium screens
  lg?: number; // 1-12 for large screens
  xl?: number; // 1-12 for extra large screens
  itemSx?: SxProps<Theme>;
}

export interface GridRow {
  id: string;
  items: GridItem[];
  rowSx?: SxProps<Theme>;
}

export interface ModularGridProps {
  rows: GridRow[];
  containerSx?: SxProps<Theme>;
  spacing?: number;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  padding?: number | { x?: number; y?: number };
  backgroundColor?: string;
  elevation?: number;
  borderRadius?: number | string;
}

export interface GridCardProps {
  title?: string;
  content: ReactNode;
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
  cardSx?: SxProps<Theme>;
  elevation?: number;
  onClick?: () => void;
}

export interface GridTextProps {
  title?: string;
  content: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  align?: 'left' | 'center' | 'right';
  textSx?: SxProps<Theme>;
  customComponent?: ReactNode;
}

export interface GridImageProps {
  src: string;
  alt: string;
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill';
  imageSx?: SxProps<Theme>;
  onClick?: () => void;
}
