import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

export interface GridItem {
  id: string;
  component: ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface GridRow {
  id: string;
  items: GridItem[];
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
