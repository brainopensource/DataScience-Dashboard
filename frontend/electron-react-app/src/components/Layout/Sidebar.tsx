import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import { StyledDrawer, MenuButton, DRAWER_WIDTH } from './styles/SidebarStyles';
import SidebarMenu from './SidebarMenu';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawer = <SidebarMenu isOpen={isOpen} onClose={onClose} isMobile={isMobile} />;

  const collapsedDrawer = (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: `calc(${theme.spacing(9.75)} + ${theme.spacing(7)})`,
        bottom: theme.spacing(7.5),
        width: theme.spacing(7),
        backgroundColor: '#030510',
        border: '1px solid transparent',
        borderImage: 'linear-gradient(45deg, #2196F3 30%,rgb(113, 22, 173) 90%) 1',
        zIndex: theme.zIndex.drawer,
        boxShadow: 'none',
        display: isOpen ? 'none' : 'block',
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <SidebarMenu isOpen={false} />
    </Box>
  );

  return (
    <>
      <MenuButton onClick={onClose} aria-label="menu">
        <MenuIcon />
      </MenuButton>
      {isMobile ? (
        <StyledDrawer
          variant="temporary"
          open={isOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </StyledDrawer>
      ) : (
        <>
          <StyledDrawer
            variant="permanent"
            open={isOpen}
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                transform: isOpen ? 'translateX(0)' : `translateX(-${DRAWER_WIDTH}px)`,
              },
            }}
          >
            {drawer}
          </StyledDrawer>
          {collapsedDrawer}
        </>
      )}
    </>
  );
};

export default Sidebar;
