import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { IconButton } from '@mui/material';

export const MainContent = styled(Paper)(() => ({
  flexGrow: 1,
  padding: '2rem',
  minHeight: '100vh',
  backgroundColor: 'transparent',
  boxShadow: 'none',
}));

export const ContentWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
}));

export const HeaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1300,
});

export const NavBarWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(3.75),
  left: 0,
  right: 0,
  zIndex: 1200,
}));

export const FooterWrapper = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1200,
});

export const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(1),
  left: theme.spacing(1),
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
}));
