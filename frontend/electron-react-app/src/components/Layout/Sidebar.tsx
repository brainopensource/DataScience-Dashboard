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
    transform: 'translateX(0)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: theme.shadows[1], // Added subtle shadow
  },
  '& .MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiDrawer-paperAnchorDockedLeft': {
    transform: ({ isOpen }: { isOpen: boolean }) => 
      isOpen ? 'translateX(0)' : 'translateX(-184px)', // 240px - 56px (collapsed width)
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  left: theme.spacing(1),
  top: '120px', // Moved lower from 108px to 120px
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2], // Added shadow for depth
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    boxShadow: theme.shadows[4], // Enhanced shadow on hover
  },
  transition: 'box-shadow 0.2s ease-in-out', // Smooth shadow transition
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
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: theme.palette.primary.main,
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
        height: '64px', // Fixed height for the top box
        mt: 2,
      }}>
      </Box>
      <List sx={{ 
        padding: 0, // Remove all padding
        margin: 0, // Remove all margin
        '& .MuiListItem-root': {
          height: '48px',
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
    <Box sx={{ 
      width: '56px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 2,
    }}>
      {pages.map(({ path, icon: Icon }) => (
        <IconButton
          key={path}
          component={Link}
          to={path}
          sx={{
            my: 1,
            color: location.pathname === path ? 'primary.main' : 'text.secondary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Icon />
        </IconButton>
      ))}
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
          <Box
            sx={{
              position: 'fixed',
              left: 0,
              top: '108px',
              bottom: '60px',
              width: '56px',
              backgroundColor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
              zIndex: theme.zIndex.drawer,
              boxShadow: theme.shadows[1],
              display: isOpen ? 'none' : 'block',
              transition: 'opacity 0.2s',
            }}
          >
            <Box sx={{ 
              height: '64px', // Match the height of the top box in drawer
              mt: 2,
            }} />
            <List sx={{ 
              padding: 0,
              margin: 0,
              '& .MuiListItem-root': {
                height: '48px',
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
                      color: location.pathname === path ? 'primary.main' : 'text.secondary',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'action.selected',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 4,
                          backgroundColor: 'primary.main',
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
        </>
      )}
    </>
  );
};

export default Sidebar; 