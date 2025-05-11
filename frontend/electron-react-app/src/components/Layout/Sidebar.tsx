import React from 'react';
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
} from '@mui/material';
import { getPages } from '../../config/pages';

const DRAWER_WIDTH = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    top: '60px', // Height of header
    bottom: '60px', // Height of footer
    height: 'calc(100% - 120px)', // Account for header and footer
    position: 'fixed',
    zIndex: theme.zIndex.drawer,
  },
}));

const Logo = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
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

  const drawer = (
    <>
      <Logo>React FastAPI</Logo>
      <List>
        {pages.map(({ path, title, icon: Icon }) => (
          <ListItem key={path} disablePadding>
            <StyledLink to={path} onClick={isMobile ? onClose : undefined}>
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
    <StyledDrawer variant="permanent" open>
      {drawer}
    </StyledDrawer>
  );
};

export default Sidebar; 