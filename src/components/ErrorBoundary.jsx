import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <h2 className="text-red-800 dark:text-red-200 font-medium">Something went wrong</h2>
          <p className="text-red-600 dark:text-red-300 text-sm mt-2">
            {this.state.error.message}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
} 