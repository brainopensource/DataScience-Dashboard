import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        // Optional: Log to monitoring service
    }
    render() {
        if (this.state.hasError) {
            return (_jsxs("div", { className: "error-fallback", children: [_jsx("h1", { children: "Something went wrong" }), _jsx("p", { children: this.state.error?.message }), _jsx("button", { onClick: () => window.location.reload(), children: "Reload Application" })] }));
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
