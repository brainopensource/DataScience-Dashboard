import React from 'react';
import { Button, ButtonProps, SxProps, Theme, useTheme } from '@mui/material';

export interface BaseButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'text';
  customSx?: SxProps<Theme>;
}

const getVariantStyles = (variant: BaseButtonProps['variant'], theme: Theme): SxProps<Theme> => {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      };
    case 'secondary':
      return {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
        },
      };
    case 'text':
      return {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      };
    default:
      return {};
  }
};

const BaseButton: React.FC<BaseButtonProps> = ({
  variant = 'primary',
  customSx,
  children,
  sx,
  ...props
}) => {
  const theme = useTheme();
  const variantStyles = getVariantStyles(variant, theme);

  const defaultSx: SxProps<Theme> = {
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    fontWeight: 500,
    padding: theme.spacing(1, 2),
    ...variantStyles,
  };

  return (
    <Button {...props} sx={[defaultSx, customSx, sx].filter(Boolean) as SxProps<Theme>}>
      {children}
    </Button>
  );
};

export default BaseButton;
