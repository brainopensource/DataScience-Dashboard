import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import FormIcon from '@mui/icons-material/Description';
import { lazyLoad } from '../utils/lazyLoad';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Loading component for lazy-loaded pages
const PageLoadingFallback: React.FC = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress color="primary" />
  </Box>
);

// Lazy load all pages with loading fallback
const pages = {
  home: {
    path: '/',
    component: lazyLoad(() => import('../pages/Home/Home'), {
      fallback: <PageLoadingFallback />,
    }),
    title: 'Home',
    icon: HomeIcon,
  },
  dashboard: {
    path: '/dashboard',
    component: lazyLoad(() => import('../pages/Dashboard/Dashboard'), {
      fallback: <PageLoadingFallback />,
    }),
    title: 'Dashboard',
    icon: DashboardIcon,
  },
  form: {
    path: '/form',
    component: lazyLoad(() => import('../pages/Form/Form'), {
      fallback: <PageLoadingFallback />,
    }),
    title: 'Form',
    icon: FormIcon,
  },
} as const;

// Type for page configuration
export type PageConfig = {
  path: string;
  component: ReturnType<typeof lazyLoad>;
  title: string;
  icon: React.ComponentType<any>;
};

// Type for page keys
export type PageKey = keyof typeof pages;

// Helper to get all pages as an array
export const getPages = (): PageConfig[] => Object.values(pages);

// Helper to get a specific page by key
export const getPage = (key: PageKey): PageConfig => pages[key];

// Helper to get all page keys
export const getPageKeys = (): PageKey[] => Object.keys(pages) as PageKey[];

export default pages; 