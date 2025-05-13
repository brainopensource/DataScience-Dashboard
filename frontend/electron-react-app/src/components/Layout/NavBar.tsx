import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#030510',
  position: 'relative',
  top: theme.spacing(3.75), // 30px
  height: theme.spacing(7), // 56px
  boxShadow: 'none',
  zIndex: theme.zIndex.appBar,
  border: '1px solid transparent',
  borderImage: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%) 1',
  padding: '1px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    height: '1px',
    background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -1,
    left: -1,
    right: -1,
    height: '1px',
    background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: theme.spacing(7), // 56px
  padding: '0 20px',
  backgroundColor: '#030510',
  position: 'relative',
}));

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
