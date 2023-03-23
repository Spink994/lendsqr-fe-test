import SidebarProvider from "./context/AppContext";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/routes";
import ErrorBoundary from "./utils/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SidebarProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </SidebarProvider>
  </React.StrictMode>
);
