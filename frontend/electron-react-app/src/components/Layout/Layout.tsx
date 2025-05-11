import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const MainContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'isMobile' && prop !== 'isSidebarOpen',
})<{ isMobile: boolean; isSidebarOpen: boolean }>(({ theme, isMobile, isSidebarOpen }) => ({
  position: 'fixed',
  top: '60px',
  left: isMobile ? 0 : (isSidebarOpen ? '240px' : 0),
  right: 0,
  bottom: '60px',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  overflowY: 'auto',
  transition: theme.transitions.create(['left'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  '& > *': {
    height: '100%',
    width: '100%',
  },
}));

const ContentWrapper = styled('div')({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#000000',
  overflow: 'hidden',
});

const HeaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1200,
});

const FooterWrapper = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1200,
});

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(1),
  left: theme.spacing(1),
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ContentWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      {isMobile && (
        <MobileMenuButton onClick={toggleSidebar} aria-label="menu">
          <MenuIcon />
        </MobileMenuButton>
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <MainContent isMobile={isMobile} isSidebarOpen={isSidebarOpen}>
        {children}
      </MainContent>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </ContentWrapper>
  );
};

export default Layout; 