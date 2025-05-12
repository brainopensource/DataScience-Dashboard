import React from 'react';
import { Card, CardContent, Typography, SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface BaseCardProps {
  title: string;
  content: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  height?: string | number;
  customSx?: SxProps<Theme>;
  onClick?: () => void;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  title,
  content,
  color = 'primary',
  height = '300px',
  customSx,
  onClick,
}) => {
  const theme = useTheme();

  const baseStyles: SxProps<Theme> = {
    height,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    p: 3,
    bgcolor: theme.palette.background.paper,
    borderRadius: 2,
    boxShadow: theme.shadows[1],
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.shorter,
    }),
    borderLeft: `4px solid ${theme.palette[color].main}`,
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[4],
      cursor: onClick ? 'pointer' : 'default',
    },
  };

  return (
    <Card sx={{ ...baseStyles, ...customSx }} onClick={onClick}>
      <CardContent>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ whiteSpace: 'pre-line' }}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};
