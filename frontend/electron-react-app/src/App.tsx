import { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/components/App.css';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home/Home'));
const Form = lazy(() => import('./pages/Form/Form'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 30, // 30 minutes
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className='app-container'>
            <nav>
              <Link to='/'>Home</Link>
              <Link to='/form'>Form</Link>
              <Link to='/dashboard'>Dashboard</Link>
            </nav>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/form' element={<Form />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
