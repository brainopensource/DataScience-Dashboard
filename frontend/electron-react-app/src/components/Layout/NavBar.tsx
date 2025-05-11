import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#030510',
  top: '30px',
  height: '48px',
  boxShadow: 'none',
  zIndex: 1200,
  borderBottom: 'none',
}));

const StyledToolbar = styled(Toolbar)({
  minHeight: '48px',
  padding: '0 20px',
  backgroundColor: '#030510',
});

const NavBar: React.FC = () => {
  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          width: '100%',
          backgroundColor: '#030510',
        }}>
          <Typography 
            variant="h6"
            sx={{ 
              color: 'primary.main',
              fontWeight: 600,
              letterSpacing: '0.5px',
              fontSize: '1.25rem',
              lineHeight: 1.2,
            }}
          >
            Data Tool
          </Typography>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default NavBar; 