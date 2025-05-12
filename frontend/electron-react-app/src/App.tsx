import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Layout from './components/Layout/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import theme from './theme';
import { getPages } from './config/pages';
import { PageLoadingFallback } from './config/pages';

const App: React.FC = () => {
  const pages = getPages();
  const DefaultPage = pages[0].component;

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={theme => ({
          '*': {
            scrollbarWidth: 'thin',           // Firefox
            msOverflowStyle: 'none',         // IE 10+
          },
          '*::-webkit-scrollbar': {
            width: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: theme.palette.background.default,
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '4px',
            border: '2px solid transparent',
            backgroundClip: 'content-box',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        })} />
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Layout>
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                {pages.map(({ path, component: Component }) => (
                  <Route key={path} path={path} element={<Component />} />
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
