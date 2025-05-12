import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const NavBarContainer = styled(AppBar)(() => ({
  backgroundColor: '#030510',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#030510',
  position: 'relative',
  top: '30px',
  height: '56px',
  boxShadow: 'none',
  zIndex: theme.zIndex.appBar,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
  },
}));

const StyledToolbar = styled(Toolbar)({
  minHeight: '56px',
  padding: '0 20px',
  backgroundColor: '#030510',
});

const NavBar: React.FC = () => {
  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#030510',
          }}
        >
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
