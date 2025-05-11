import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#030510',
  top: '30px',
  height: '48px',
  boxShadow: 'none',
  zIndex: 1200,
});

const StyledToolbar = styled(Toolbar)({
  minHeight: '48px',
  padding: '0 20px',
});

const NavBar: React.FC = () => {
  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: '#0024fe',
            fontWeight: 500,
          }}
        >
          Data Tool
        </Typography>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default NavBar; 