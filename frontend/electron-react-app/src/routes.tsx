import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { getPages } from './config/pages';

const AppRoutes: React.FC = () => {
  const pages = getPages();
  const DefaultPage = pages[0].component;

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          {pages.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          {/* Fallback route */}
          <Route path="*" element={<DefaultPage />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
};

export default AppRoutes; 