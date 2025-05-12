import React from 'react';
import { SxProps, Theme } from '@mui/material';
import BaseButton, { BaseButtonProps } from './BaseButton';

export interface CustomButtonProps extends BaseButtonProps {
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  iconSx?: SxProps<Theme>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  icon,
  iconPosition = 'start',
  iconSx,
  children,
  customSx,
  ...props
}) => {
  const defaultIconSx: SxProps<Theme> = {
    marginRight: iconPosition === 'start' ? 1 : 0,
    marginLeft: iconPosition === 'end' ? 1 : 0,
    display: 'flex',
    alignItems: 'center',
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
    <BaseButton
      {...props}
      customSx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...customSx,
      }}
    >
      {buttonContent}
    </BaseButton>
  );
};

export default CustomButton;
