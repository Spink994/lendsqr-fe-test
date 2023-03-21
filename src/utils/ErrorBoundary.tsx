import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: "100vw",
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "Work sans",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            Sorry, there has been an error!
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
