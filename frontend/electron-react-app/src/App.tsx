import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import theme from './theme';
import { getPages } from './config/pages';

// Loading component
const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress color="primary" />
  </Box>
);

const App: React.FC = () => {
  const pages = getPages();
  const DefaultPage = pages[0].component;

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {pages.map(({ path, component: Component }) => (
                  <Route
                    key={path}
                    path={path}
                    element={<Component />}
                  />
                ))}
                {/* Fallback route */}
                <Route path="*" element={<DefaultPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
