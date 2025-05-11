import React from 'react';
import { styled, useTheme } from '@mui/material/styles';

const FooterContainer = styled('footer')(({ theme }) => ({
  height: '60px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 20px',
  position: 'fixed',
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 1000,
}));

const Footer = () => {
  return (
    <FooterContainer>
      <p>One Footer</p>
    </FooterContainer>
  );
};

export default Footer; 