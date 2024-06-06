import React from 'react';
import { Alert, Box, Typography } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // You can log the error to an error reporting service here
    console.error("Error Boundary Caught an Error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4 }}>
          <Alert severity="error">
            <Typography variant="h6">Something went wrong.</Typography>
            <Typography variant="body2">{this.state.error && this.state.error.toString()}</Typography>
            <Typography variant="body2">{this.state.errorInfo && this.state.errorInfo.componentStack}</Typography>
          </Alert>
        </Box>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
