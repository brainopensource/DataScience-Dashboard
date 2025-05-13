import React from 'react';
import { Box, Container, Grid, Paper, useTheme, SxProps, Theme } from '@mui/material';
import { ModularGridProps } from '../../types/grid';
import { GridRow } from '../../types/common/grid';
import { createGridStyles } from './styles/gridStyles';

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
  const styles = createGridStyles(theme);

  const getPadding = () => {
    if (typeof padding === 'number') {
      return theme.spacing(padding);
    }
    return `${theme.spacing(padding.y || 0)} ${theme.spacing(padding.x || 0)}`;
  };

  return (
    <Container 
      maxWidth={maxWidth} 
      sx={[
        styles.modularContainer,
        containerSx,
      ]}
    >
      <Paper
        elevation={elevation}
        sx={[
          styles.modularPaper(backgroundColor, borderRadius),
          { p: getPadding() },
        ]}
      >
        <Box sx={styles.modularContent(spacing)}>
          {rows.map((row: GridRow) => (
            <Grid 
              key={row.id} 
              container 
              spacing={spacing} 
              sx={[
                styles.row,
                row.rowSx,
              ]}
            >
              {row.items.map(item => (
                <Grid
                  key={item.id}
                  item
                  xs={item.xs || 12}
                  sm={item.sm}
                  md={item.md}
                  lg={item.lg}
                  xl={item.xl}
                  sx={[
                    styles.item,
                    item.itemSx,
                  ]}
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
