import React from 'react';
import { GridText } from '../../../components/grid/GridComponents';
import { InformationCard as InformationCardType } from '../../../types/information/informationTypes';
import { getBorderStyle } from '../../../styles/information/informationStyles';
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

interface InformationCardProps {
  card: InformationCardType;
  xs?: number;
  sm?: number;
  md?: number;
}

export const InformationCard: React.FC<InformationCardProps> = ({
  card,
  xs = 6,
  sm = 6,
  md = 6,
}) => {
  const theme = useTheme();
  const borderStyle = getBorderStyle(theme, card.color);

  return (
    <Grid item xs={xs} sm={sm} md={md}>
      <GridText
        title={card.title}
        content={card.content}
        textSx={{
          ...borderStyle,
          height: '300px',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[4],
          },
        }}
      />
    </Grid>
  );
};
