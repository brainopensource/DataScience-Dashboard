import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getPages, getPage } from '../../config/pages';

export const useSidebar = () => {
  const location = useLocation();
  const pages = getPages();

  const handleMouseEnter = useCallback((path: string) => {
    const page = getPage(path as any);
    if (page?.component?.preload) {
      page.component.preload();
    }
  }, []);

  return {
    location,
    pages,
    handleMouseEnter,
  };
};
