import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Form = lazy(() => import('./pages/Form'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
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
    return (_jsx(ErrorBoundary, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(Router, { children: _jsxs("div", { className: 'app-container', children: [_jsxs("nav", { children: [_jsx(Link, { to: '/', children: "Home" }), _jsx(Link, { to: '/form', children: "Form" }), _jsx(Link, { to: '/dashboard', children: "Dashboard" })] }), _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Home, {}) }), _jsx(Route, { path: '/form', element: _jsx(Form, {}) }), _jsx(Route, { path: '/dashboard', element: _jsx(Dashboard, {}) }), _jsx(Route, { path: '*', element: _jsx(Navigate, { to: '/', replace: true }) })] }) })] }) }) }) }));
}
export default App;
