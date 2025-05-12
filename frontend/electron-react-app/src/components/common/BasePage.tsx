import React from 'react';
import { Typography, Box, SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Split into smaller, focused interfaces
export interface BaseContainerProps {
  containerSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  children?: React.ReactNode;
}

export interface BaseTitleProps {
  title: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleSx?: SxProps<Theme>;
  showTitle?: boolean;
}

// Main props interface combines the smaller ones
export type BasePageProps = BaseContainerProps & BaseTitleProps;

const BasePage: React.FC<BasePageProps> = ({
  title,
  children,
  titleVariant = 'h4',
  containerSx,
  titleSx,
  contentSx,
  showTitle = true,
}) => {
  const theme = useTheme();

  const defaultContainerSx: SxProps<Theme> = {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  };

  const defaultTitleSx: SxProps<Theme> = {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
  };

  return (
    <Box sx={{ ...defaultContainerSx, ...containerSx }}>
      {showTitle && (
        <Typography variant={titleVariant} component="h1" sx={{ ...defaultTitleSx, ...titleSx }}>
          {title}
        </Typography>
      )}
      <Box sx={contentSx}>{children}</Box>
    </Box>
  );
};

export default BasePage;
