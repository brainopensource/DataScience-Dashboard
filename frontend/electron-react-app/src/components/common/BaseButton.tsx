import React from 'react';
import { Button, ButtonProps, SxProps, Theme, useTheme } from '@mui/material';

export interface BaseButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'text' | 'gradient';
  customSx?: SxProps<Theme>;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  iconSx?: SxProps<Theme>;
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
    case 'gradient':
      return {
        transition: theme.transitions.create(['background-image', 'box-shadow'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          backgroundImage: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
          color: theme.palette.common.white,
          boxShadow: theme.shadows[4],
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
  icon,
  iconPosition = 'start',
  iconSx,
  ...props
}) => {
  const theme = useTheme();
  const variantStyles = getVariantStyles(variant, theme);

  const defaultIconSx: SxProps<Theme> = {
    marginRight: iconPosition === 'start' ? 1 : 0,
    marginLeft: iconPosition === 'end' ? 1 : 0,
    display: 'flex',
    alignItems: 'center',
  };

  const defaultSx: SxProps<Theme> = {
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    fontWeight: 500,
    padding: theme.spacing(1, 2),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...variantStyles,
  };

  const buttonContent = (
    <>
      {icon && iconPosition === 'start' && (
        <span style={{ ...defaultIconSx, ...iconSx } as React.CSSProperties}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'end' && (
        <span style={{ ...defaultIconSx, ...iconSx } as React.CSSProperties}>{icon}</span>
      )}
    </>
  );

  return (
    <Button {...props} sx={[defaultSx, customSx, sx].filter(Boolean) as SxProps<Theme>}>
      {buttonContent}
    </Button>
  );
};

export default BaseButton;
