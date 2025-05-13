import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { StyledListItemButton } from './styles/SidebarStyles';
import { useSidebar } from '../../hooks/layout/useSidebar';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose, isMobile }) => {
  const theme = useTheme();
  const { location, pages, handleMouseEnter } = useSidebar();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: theme.spacing(8),
          mt: theme.spacing(2),
        }}
      />
      <List
        sx={{
          padding: 0,
          margin: 0,
          '& .MuiListItem-root': {
            height: theme.spacing(6),
            padding: 0,
            margin: 0,
          },
        }}
      >
        {pages.map(({ path, title, icon: Icon }) => (
          <ListItem key={path} disablePadding>
            <Link
              to={path}
              onClick={isMobile ? onClose : undefined}
              onMouseEnter={() => handleMouseEnter(path)}
              style={{
                display: 'block',
                height: '48px',
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
              }}
            >
              <StyledListItemButton
                selected={location.pathname === path}
                sx={{
                  height: '48px',
                  padding: '0 16px',
                  margin: 0,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: '40px',
                    margin: 0,
                    padding: 0,
                  }}
                >
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
                    },
                  }}
                />
              </StyledListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SidebarMenu;
 