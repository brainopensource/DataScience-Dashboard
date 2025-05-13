import React from 'react';
import { BaseGrid } from '../../common/grid/BaseGrid';
import { InformationCard } from './InformationCard';
import { InformationContent } from '../../../types/information/information';
import { GridRow } from '../../../types/common/grid';
import { useTheme } from '@mui/material/styles';

interface InformationGridProps {
  content: InformationContent;
  containerSx?: React.CSSProperties;
  showHeader?: boolean;
}

export const InformationGrid: React.FC<InformationGridProps> = ({
  content,
  containerSx,
  showHeader = true,
}) => {
  const theme = useTheme();

  const headerRow: GridRow = {
    id: 'header',
    items: [
      {
        id: 'header-content',
        component: (
          <InformationCard
            card={{
              id: 'header',
              title: content.title,
              content: content.description,
              color: 'primary',
            }}
          />
        ),
        xs: 12,
      },
    ],
  };

  const informationRows: GridRow[] = content.sections.map(section => ({
    id: section.id,
    items: section.cards.map(card => ({
      id: card.id,
      component: <InformationCard key={card.id} card={card} />,
      xs: 12,
      sm: 6,
      md: 6,
    })),
  }));

  const rows = [
    ...(showHeader ? [headerRow] : []),
    ...informationRows,
  ];

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
 