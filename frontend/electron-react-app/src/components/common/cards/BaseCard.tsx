import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  SxProps,
  Theme,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface BaseCardProps {
  // Basic props
  title?: string;
  content?: string;
  subtitle?: string;

  // Styling
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  height?: string | number;
  customSx?: SxProps<Theme>;

  // Interaction
  onClick?: () => void;
  onAction?: () => void;
  actionLabel?: string;

  // Customization
  headerComponent?: React.ReactNode;
  contentComponent?: React.ReactNode;
  actionComponent?: React.ReactNode;

  // Layout
  variant?: 'default' | 'compact' | 'elevated';
  elevation?: number;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  // Basic props
  title,
  content,
  subtitle,

  // Styling
  color = 'primary',
  height = '300px',
  customSx,

  // Interaction
  onClick,
  onAction,
  actionLabel,

  // Customization
  headerComponent,
  contentComponent,
  actionComponent,

  // Layout
  variant = 'default',
  elevation = 1,
}) => {
  const theme = useTheme();

  const getVariantStyles = (): SxProps<Theme> => {
    switch (variant) {
      case 'compact':
        return {
          p: 2,
          height: 'auto',
        };
      case 'elevated':
        return {
          p: 4,
          boxShadow: theme.shadows[4],
        };
      default:
        return {
          p: 3,
          height,
        };
    }
  };

  const baseStyles: SxProps<Theme> = {
    ...getVariantStyles(),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    bgcolor: theme.palette.background.paper,
    borderRadius: 2,
    boxShadow: theme.shadows[elevation],
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.shorter,
    }),
    borderLeft: `4px solid ${theme.palette[color].main}`,
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[elevation + 2],
      cursor: onClick ? 'pointer' : 'default',
    },
  };

  return (
    <Card sx={{ ...baseStyles, ...customSx }} onClick={onClick} elevation={0}>
      {headerComponent ||
        (title && (
          <CardHeader
            title={title}
            subheader={subtitle}
            titleTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
            subheaderTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
          />
        ))}

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {contentComponent ||
          (content && (
            <Typography variant="body1" color="textSecondary" sx={{ whiteSpace: 'pre-line' }}>
              {content}
            </Typography>
          ))}
      </CardContent>

      {(actionComponent || (onAction && actionLabel)) && (
        <CardActions>
          {actionComponent || (
            <Typography
              variant="button"
              color={color}
              onClick={onAction}
              sx={{ cursor: 'pointer' }}
            >
              {actionLabel}
            </Typography>
          )}
        </CardActions>
      )}
    </Card>
  );
};
