import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#030510',
  height: '60px',
  top: 'auto',
  bottom: 0,
  boxShadow: 'none',
  borderTop: 'none',
}));

const StyledToolbar = styled(Toolbar)({
  minHeight: '60px',
  padding: '0 20px',
  backgroundColor: '#030510',
});

const FooterContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '1rem',
  borderTop: '1px solid rgba(0, 0, 0, 0.12)',
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
