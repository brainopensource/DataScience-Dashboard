import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

export interface GridItem {
  id: string;
  component: ReactNode;
  props?: Record<string, any>;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  itemSx?: SxProps<Theme>;
}

export interface GridRow {
  id: string;
  items: GridItem[];
  rowSx?: SxProps<Theme>;
}

export interface GridContainerProps {
  rows: GridRow[];
  spacing?: number;
  containerSx?: SxProps<Theme>;
}

export interface GridItemProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  customSx?: SxProps<Theme>;
}
