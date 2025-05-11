import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton,
  Drawer,
  useMediaQuery,
  IconButton,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getPages, getPage } from '../../config/pages';

const DRAWER_WIDTH = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    top: '108px', // 60px header + 48px navbar
    bottom: '60px', // Height of footer
    height: 'calc(100% - 168px)', // Account for header (60px), navbar (48px), and footer (60px)
    position: 'fixed',
    zIndex: theme.zIndex.drawer,
    overflowX: 'hidden',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
  display: 'block',
});

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const pages = getPages();

  // Preload route when hovering over a menu item
  const handleMouseEnter = useCallback((path: string) => {
    const page = getPage(path as any);
    if (page?.component?.preload) {
      page.component.preload();
    }
  }, []);

  const handleMenuClick = () => {
    onClose(); // This will toggle the sidebar state
  };

  const drawer = (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1 }}>
        <MenuButton onClick={handleMenuClick} aria-label="menu">
          <MenuIcon />
        </MenuButton>
      </Box>
      <List>
        {pages.map(({ path, title, icon: Icon }) => (
          <ListItem key={path} disablePadding>
            <StyledLink 
              to={path} 
              onClick={isMobile ? onClose : undefined}
              onMouseEnter={() => handleMouseEnter(path)}
            >
              <StyledListItemButton selected={location.pathname === path}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={title} />
              </StyledListItemButton>
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </>
  );

  if (isMobile) {
    return (
      <StyledDrawer
        variant="temporary"
        open={isOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
        {drawer}
      </StyledDrawer>
    );
  }

  return (
    <StyledDrawer 
      variant="permanent" 
      open={isOpen}
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          width: isOpen ? DRAWER_WIDTH : theme.spacing(7),
          overflowX: 'hidden',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {drawer}
    </StyledDrawer>
  );
};

export default Sidebar; 