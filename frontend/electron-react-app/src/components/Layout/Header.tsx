import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#000000',
  height: theme.spacing(3.75), // 30px
  WebkitAppRegion: 'drag',
  boxShadow: 'none',
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
  minHeight: theme.spacing(3.75), // 30px
  padding: '0 20px',
  position: 'relative',
}));

const Header = () => {
  return (
    <StyledAppBar position="fixed">
      <StyledToolbar />
    </StyledAppBar>
  );
};

export default Header;
