import React from 'react';
import { Grid, GridProps } from '@mui/material';
import { GridRow, GridItem } from '../../../types/common/grid';

interface BaseGridProps extends GridProps {
  rows: GridRow[];
  spacing?: number;
  containerSx?: object;
}

export const BaseGrid: React.FC<BaseGridProps> = ({ rows, spacing = 3, containerSx }) => {
  return (
    <Grid container spacing={spacing} sx={containerSx}>
      {rows.map(row => (
        <Grid
          key={row.id}
          container
          item
          spacing={spacing}
          sx={{ width: '100%', margin: 0, ...row.rowSx }}
        >
          {row.items.map(item => (
            <Grid
              key={item.id}
              item
              xs={item.xs}
              sm={item.sm}
              md={item.md}
              lg={item.lg}
              xl={item.xl}
              sx={item.itemSx}
            >
              {React.isValidElement(item.component)
                ? React.cloneElement(item.component, item.props)
                : item.component}
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};
