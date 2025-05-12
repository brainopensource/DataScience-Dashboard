import React from 'react';
import { Box, Container, Grid, Paper, useTheme } from '@mui/material';
import { ModularGridProps, GridRow } from '../../types/grid';

const ModularGrid: React.FC<ModularGridProps> = ({
  rows,
  containerSx,
  spacing = 2,
  maxWidth = 'lg',
  padding = 3,
  backgroundColor,
  elevation = 0,
  borderRadius = 0,
}) => {
  const theme = useTheme();

  const getPadding = () => {
    if (typeof padding === 'number') {
      return theme.spacing(padding);
    }
    return `${theme.spacing(padding.y || 0)} ${theme.spacing(padding.x || 0)}`;
  };

  return (
    <Container maxWidth={maxWidth} sx={containerSx}>
      <Paper
        elevation={elevation}
        sx={{
          p: getPadding(),
          backgroundColor: backgroundColor || 'transparent',
          borderRadius,
          height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
          {rows.map((row: GridRow) => (
            <Grid key={row.id} container spacing={spacing} sx={row.rowSx}>
              {row.items.map(item => (
                <Grid
                  key={item.id}
                  item
                  xs={item.xs || 12}
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
        </Box>
      </Paper>
    </Container>
  );
};

export default ModularGrid;
