import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import NavBar from './NavBar';

const MainContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'isMobile' && prop !== 'isSidebarOpen',
})<{ isMobile: boolean; isSidebarOpen: boolean }>(({ theme, isMobile, isSidebarOpen }) => ({
  position: 'fixed',
  top: theme.spacing(9.75), // 78px converted to theme spacing
  left: isMobile ? 0 : theme.spacing(30), // 240px converted to theme spacing
  right: 0,
  bottom: theme.spacing(7.5), // 60px converted to theme spacing
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

const ContentWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
}));

const HeaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1300,
});

const NavBarWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(3.75), // 30px converted to theme spacing
  left: 0,
  right: 0,
  zIndex: 1200,
}));

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
      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
      {isMobile && (
        <MobileMenuButton onClick={toggleSidebar} aria-label="menu">
          <MenuIcon />
        </MobileMenuButton>
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
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