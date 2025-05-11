import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Layout from './components/Layout/Layout';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {pages.map(({ path, component: Component, exact }) => (
                <Route
                  key={path}
                  path={path}
                  element={<Component />}
                  {...(exact && { exact: true })}
                />
              ))}
              {/* Fallback route */}
              <Route path="*" element={pages[0].component} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
