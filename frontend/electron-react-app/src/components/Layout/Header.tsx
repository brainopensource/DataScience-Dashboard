import React from 'react';
import { styled, useTheme } from '@mui/material/styles';

const HeaderContainer = styled('header')(({ theme }) => ({
  height: '60px',
  backgroundColor: '#1a1a1a', // Dark gray, almost black
  color: theme.palette.primary.main, // Blue color from theme
  WebkitAppRegion: 'drag', // Makes the header draggable
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 20px',
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  zIndex: 1000,
}));

const Header = () => {
  return (
    <HeaderContainer>
      <h1>One Header</h1>
    </HeaderContainer>
  );
};

export default Header; 