import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useLayoutState } from '../../hooks/layout/useLayoutState';
import {
  ContentWrapper,
  HeaderWrapper,
  NavBarWrapper,
  FooterWrapper,
  MainContent,
  MobileMenuButton,
} from './styles/LayoutStyles';

interface LayoutContainerProps {
  children: React.ReactNode;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
  const { isMobile, isSidebarOpen, toggleSidebar } = useLayoutState();

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

export default LayoutContainer;
