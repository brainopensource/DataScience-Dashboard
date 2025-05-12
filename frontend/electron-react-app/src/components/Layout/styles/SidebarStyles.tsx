import { styled } from '@mui/material/styles';
import { Drawer, IconButton, ListItemButton, ListItemIcon, Link } from '@mui/material';

export const DRAWER_WIDTH = 240;

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: '#030510',
    color: '#fff',
    position: 'fixed',
    border: '1px solid transparent',
    borderImage: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%) 1',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -1,
      left: -1,
      bottom: -1,
      width: '2px',
      background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: -1,
      right: -1,
      bottom: -1,
      width: '2px',
      background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
    },
    top: `calc(${theme.spacing(9.75)} + ${theme.spacing(7)})`,
    bottom: theme.spacing(7.5),
    height: `calc(100% - (${theme.spacing(9.75)} + ${theme.spacing(7)}) - ${theme.spacing(7.5)})`,
    zIndex: theme.zIndex.appBar - 200,
    overflowX: 'hidden',
    // Hide scrollbar for Chrome, Safari and Opera
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    // Hide scrollbar for IE, Edge and Firefox
    msOverflowStyle: 'none',  // IE and Edge
    scrollbarWidth: 'none',  // Firefox
    transform: 'translateX(0)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    boxShadow: 'none',
  },
  '& .MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiDrawer-paperAnchorDockedLeft': {
    transform: ({ isOpen }: { isOpen: boolean }) =>
      isOpen ? 'translateX(0)' : `translateX(-${DRAWER_WIDTH}px)`,
  },
}));

export const MenuButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  left: theme.spacing(1),
  top: theme.spacing(20),
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

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 36, 254, 0.08)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(0, 36, 254, 0.12)',
    '&:hover': {
      backgroundColor: 'rgba(0, 36, 254, 0.16)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: '#0024fe',
    },
  },
}));

export const CollapsedIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '40px',
  color: theme.palette.text.primary,
  justifyContent: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
}));

export const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
  display: 'block',
});
