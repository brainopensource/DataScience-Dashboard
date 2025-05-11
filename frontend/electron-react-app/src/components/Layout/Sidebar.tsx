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
    backgroundColor: '#030510', // Dark blue background
    borderRight: 'none',
    top: theme.spacing(9.75), // 30px header + 48px navbar = 78px, converted to theme spacing (8px * 9.75)
    bottom: theme.spacing(7.5), // 60px footer, converted to theme spacing (8px * 7.5)
    height: `calc(100% - ${theme.spacing(17.25)})`, // 138px total (78px + 60px), converted to theme spacing
    position: 'fixed',
    zIndex: theme.zIndex.drawer,
    overflowX: 'hidden',
    transform: 'translateX(0)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: 'none',
  },
  '& .MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiDrawer-paperAnchorDockedLeft': {
    transform: ({ isOpen }: { isOpen: boolean }) => 
      isOpen ? 'translateX(0)' : 'translateX(-240px)', // 240px - 56px (collapsed width)
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  left: theme.spacing(1),
  top: theme.spacing(13.75), // 110px converted to theme spacing (8px * 13.75)
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    boxShadow: theme.shadows[4],
  },
  transition: theme.transitions.create(['box-shadow', 'background-color'], {
    duration: theme.transitions.duration.shorter,
  }),
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 36, 254, 0.08)', // Subtle blue hover
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(0, 36, 254, 0.12)', // Slightly more visible blue for selected
    '&:hover': {
      backgroundColor: 'rgba(0, 36, 254, 0.16)', // Darker blue on hover when selected
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: '#0024fe', // Bright blue indicator
    },
  },
}));

const CollapsedIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '40px',
  color: theme.palette.text.primary,
  justifyContent: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
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
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: theme.spacing(8), // 64px converted to theme spacing
        mt: theme.spacing(2),
      }}>
      </Box>
      <List sx={{ 
        padding: 0,
        margin: 0,
        '& .MuiListItem-root': {
          height: theme.spacing(6), // 48px converted to theme spacing
          padding: 0,
          margin: 0,
        }
      }}>
        {pages.map(({ path, title, icon: Icon }) => (
          <ListItem key={path} disablePadding>
            <StyledLink 
              to={path} 
              onClick={isMobile ? onClose : undefined}
              onMouseEnter={() => handleMouseEnter(path)}
              style={{ display: 'block', height: '48px' }}
            >
              <StyledListItemButton 
                selected={location.pathname === path}
                sx={{
                  height: '48px',
                  padding: '0 16px',
                  margin: 0,
                }}
              >
                <ListItemIcon sx={{ 
                  color: 'inherit',
                  minWidth: '40px',
                  margin: 0,
                  padding: 0,
                }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText 
                  primary={title} 
                  primaryTypographyProps={{
                    sx: { 
                      fontSize: '0.95rem',
                      fontWeight: location.pathname === path ? 600 : 400,
                      opacity: isOpen ? 1 : 0,
                      transition: 'opacity 0.2s',
                    }
                  }}
                />
              </StyledListItemButton>
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </>
  );

  // Add a collapsed state that shows only icons
  const collapsedDrawer = (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: theme.spacing(9.75), // 78px converted to theme spacing
        bottom: theme.spacing(7.5), // 60px converted to theme spacing
        width: theme.spacing(7), // 56px converted to theme spacing
        backgroundColor: '#030510', // Dark blue background
        borderRight: 'none',
        zIndex: theme.zIndex.drawer,
        boxShadow: 'none',
        display: isOpen ? 'none' : 'block',
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <Box sx={{ 
        height: theme.spacing(8), // 64px converted to theme spacing
        mt: theme.spacing(2),
      }} />
      <List sx={{ 
        padding: 0,
        margin: 0,
        '& .MuiListItem-root': {
          height: theme.spacing(6), // 48px converted to theme spacing
          padding: 0,
          margin: 0,
        }
      }}>
        {pages.map(({ path, icon: Icon }) => (
          <ListItem key={path} disablePadding>
            <IconButton
              component={Link}
              to={path}
              sx={{
                width: '100%',
                height: '48px',
                padding: 0,
                margin: 0,
                borderRadius: 0,
                color: location.pathname === path ? '#0024fe' : 'rgba(255, 255, 255, 0.7)', // Bright blue for selected, slightly dimmed white for others
                '&:hover': {
                  backgroundColor: 'rgba(0, 36, 254, 0.08)', // Subtle blue hover
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 36, 254, 0.12)', // Slightly more visible blue for selected
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    backgroundColor: '#0024fe', // Bright blue indicator
                  },
                },
              }}
            >
              <Icon />
            </IconButton>
          </ListItem>
        ))}
      </List>
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
                width: DRAWER_WIDTH,
                transform: isOpen ? 'translateX(0)' : 'translateX(-240px)',
                transition: theme.transitions.create('transform', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
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