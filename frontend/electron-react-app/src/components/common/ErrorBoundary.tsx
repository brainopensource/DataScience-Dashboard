import React, { Component, ErrorInfo } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to your error reporting service
    console.error('Error caught by boundary:', {
      error,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });

    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return <ErrorFallback error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}

// Separate component for the error UI to use hooks
const ErrorFallback: React.FC<{ error: Error | null; errorInfo: ErrorInfo | null }> = ({
  error,
  errorInfo,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 3,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
          borderLeft: `4px solid ${theme.palette.error.main}`,
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Something went wrong
        </Typography>

        <Typography variant="body1" color="textSecondary" paragraph>
          We apologize for the inconvenience. Our team has been notified of this issue.
        </Typography>

        {process.env.NODE_ENV === 'development' && (
          <Box sx={{ mt: 2, textAlign: 'left' }}>
            <Typography variant="subtitle2" color="error">
              {error?.toString()}
            </Typography>
            <Typography
              variant="body2"
              component="pre"
              sx={{
                mt: 1,
                p: 2,
                bgcolor: theme.palette.grey[100],
                borderRadius: 1,
                overflow: 'auto',
                fontSize: '0.75rem',
              }}
            >
              {errorInfo?.componentStack}
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mr: 2 }}
          >
            Reload Page
          </Button>
          <Button variant="outlined" color="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

// Export a function component that uses the class component
export const ErrorBoundary: React.FC<Props> = props => {
  return <ErrorBoundaryClass {...props} />;
};
