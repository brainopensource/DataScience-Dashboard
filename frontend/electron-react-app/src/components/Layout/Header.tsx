import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const HeaderContainer = styled(AppBar)(() => ({
  backgroundColor: '#030510',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#000000',
  height: '30px',
  WebkitAppRegion: 'drag',
  boxShadow: 'none',
}));

const StyledToolbar = styled(Toolbar)({
  minHeight: '30px',
  padding: '0 20px',
});

const Header = () => {
  return (
    <StyledAppBar position="fixed">
      <StyledToolbar />
    </StyledAppBar>
  );
};

export default Header;
