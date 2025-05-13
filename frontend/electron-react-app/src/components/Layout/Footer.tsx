import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#030510',
  height: theme.spacing(7.5), // 60px
  top: 'auto',
  bottom: theme.spacing(0.5),
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
  minHeight: theme.spacing(7.5), // 60px
  padding: '0 20px',
  backgroundColor: '#030510',
  position: 'relative',
}));

const Footer = () => {
  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            backgroundColor: '#030510',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'primary.main',
              fontWeight: 500,
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
