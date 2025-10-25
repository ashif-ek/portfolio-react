import React from "react";
import ErrorFallback from "./ErrorFallback"; // Import the separate component

// The internal ErrorFallback function has been removed.

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // FIX 1: 'error' is now '_error' to fix the linting error
  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("❌ Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      // FIX 2: Use the imported component and pass the correct prop
      return <ErrorFallback resetErrorBoundary={this.handleRetry} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;