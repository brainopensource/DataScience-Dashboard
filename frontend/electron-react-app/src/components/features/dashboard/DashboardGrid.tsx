import React from 'react';
import { BaseGrid } from '../../common/grid/BaseGrid';
import { useTheme } from '@mui/material/styles';
import { GridCard, GridText, GridImage } from '../../grid/GridComponents';
import { DashboardContent } from '../../../types/dashboard/dashboard';
import { GridRow } from '../../../types/common/grid';
import GradientButton from '../../common/GradientButton';

interface DashboardGridProps {
  content: DashboardContent;
  containerSx?: React.CSSProperties;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  content,
  containerSx,
}) => {
  const theme = useTheme();

  const headerRow: GridRow = {
    id: 'header',
    items: [
      {
        id: 'welcome',
        component: (
          <GridText
            title={content.title}
            content={content.description}
            variant="h4"
            align="center"
            textSx={{
              color: theme.palette.primary.main,
              mb: 2,
            }}
          />
        ),
        xs: 12,
      },
    ],
  };

  const statsRow: GridRow = {
    id: 'stats',
    items: content.stats.map(stat => ({
      id: stat.id,
      component: (
        <GridCard
          title={stat.title}
          content={stat.content}
          elevation={2}
          cardSx={{
            bgcolor: theme.palette[stat.color].light,
            color: theme.palette[stat.color].contrastText,
          }}
        />
      ),
      xs: 12,
      sm: 6,
      md: 4,
    })),
  };

  const contentRow: GridRow = {
    id: 'content',
    items: [
      {
        id: content.image.id,
        component: (
          <GridImage
            src={content.image.src}
            alt={content.image.alt}
            aspectRatio={content.image.aspectRatio}
          />
        ),
        xs: 12,
        md: 6,
      },
      {
        id: content.text.id,
        component: (
          <GridText
            title={content.text.title}
            content={content.text.content}
            variant="body1"
            textSx={{
              p: 2,
              bgcolor: theme.palette.background.paper,
              borderRadius: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          />
        ),
        xs: 12,
        md: 6,
      },
    ],
  };

  const actionsRow: GridRow = {
    id: 'actions',
    items: content.actions.map(action => ({
      id: action.id,
      component: (
        <GridCard
          title={action.title}
          content={action.content}
          actions={
            <GradientButton variant={action.buttonVariant}>
              {action.buttonText}
            </GradientButton>
          }
          cardSx={{ textAlign: 'center' }}
        />
      ),
      xs: 12,
      md: 6,
    })),
  };

  const rows = [headerRow, statsRow, contentRow, actionsRow];

  return (
    <BaseGrid
      rows={rows}
      spacing={3}
      containerSx={{
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        ...containerSx,
      }}
    />
  );
}; 