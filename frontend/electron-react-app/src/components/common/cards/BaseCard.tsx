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
import { createCardStyles } from './styles/cardStyles';

type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export interface BaseCardProps {
  // Basic props
  title?: string;
  content?: string;
  subtitle?: string;

  // Styling
  color?: ThemeColor;
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
  const styles = createCardStyles(theme);

  const getVariantStyle = (): SxProps<Theme> => {
    switch (variant) {
      case 'compact':
        return styles.compact;
      case 'elevated':
        return styles.elevated;
      default:
        return {
          ...styles.base,
          height,
        };
    }
  };

  const baseStyles: SxProps<Theme> = {
    ...getVariantStyle(),
    ...styles.getColorBorder(color),
    ...styles.getHoverTransition(),
    cursor: onClick ? 'pointer' : 'default',
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
            sx={styles.header}
          />
        ))}

      <CardContent sx={styles.content}>
        {contentComponent ||
          (content && (
            <Typography variant="body1" color="textSecondary" sx={{ whiteSpace: 'pre-line' }}>
              {content}
            </Typography>
          ))}
      </CardContent>

      {(actionComponent || (onAction && actionLabel)) && (
        <CardActions sx={styles.actions}>
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
