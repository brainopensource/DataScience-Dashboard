import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { GridCardProps, GridTextProps, GridImageProps } from '../../types/grid';

export const GridCard: React.FC<GridCardProps> = ({
  title,
  content,
  image,
  imageAlt,
  actions,
  cardSx,
  elevation = 1,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={elevation}
      onClick={onClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        transition: theme.transitions.create(['transform', 'box-shadow'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': onClick
          ? {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[4],
            }
          : {},
        ...cardSx,
      }}
    >
      {image && (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={imageAlt || title || 'Card image'}
          sx={{
            objectFit: 'cover',
          }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        {title && (
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export const GridText: React.FC<GridTextProps> = ({
  title,
  content,
  variant = 'body1',
  align = 'left',
  textSx,
  customComponent,
}) => {
  if (customComponent) {
    return <Box sx={{ textAlign: align, ...textSx }}>{customComponent}</Box>;
  }

  return (
    <Box sx={{ textAlign: align, ...textSx }}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Typography variant={variant}>{content}</Typography>
    </Box>
  );
};

export const GridImage: React.FC<GridImageProps> = ({
  src,
  alt,
  aspectRatio = 16 / 9,
  objectFit = 'cover',
  imageSx,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: `${(1 / aspectRatio) * 100}%`,
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
        ...imageSx,
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit,
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shorter,
          }),
          '&:hover': onClick
            ? {
                transform: 'scale(1.05)',
              }
            : {},
        }}
      />
    </Box>
  );
};
