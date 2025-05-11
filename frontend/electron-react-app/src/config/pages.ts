import { lazy } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import FormIcon from '@mui/icons-material/Description';

// Lazy load all pages
const pages = {
  home: {
    path: '/',
    component: lazy(() => import('../pages/Home/Home')),
    title: 'Home',
    icon: HomeIcon,
    exact: true,
  },
  dashboard: {
    path: '/dashboard',
    component: lazy(() => import('../pages/Dashboard/Dashboard')),
    title: 'Dashboard',
    icon: DashboardIcon,
  },
  form: {
    path: '/form',
    component: lazy(() => import('../pages/Form/Form')),
    title: 'Form',
    icon: FormIcon,
  },
} as const;

// Type for page configuration
export type PageConfig = {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  title: string;
  icon: React.ComponentType<any>;
  exact?: boolean;
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