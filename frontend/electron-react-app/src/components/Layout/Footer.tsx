import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '60px',
  top: 'auto',
  bottom: 0,
  boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
}));

const StyledToolbar = styled(Toolbar)({
  minHeight: '60px',
  padding: '0 20px',
});

const Footer = () => {
  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 500
            }}
          >
            © 2024 React FastAPI
          </Typography>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Footer; 