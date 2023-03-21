import SidebarProvider from "./context/AppContext";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/routes";
import "./styles/index.css";
import ErrorBoundary from "./utils/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SidebarProvider>
      <ErrorBoundary fallback={<div>Error Loading Page</div>}>
        <App />
      </ErrorBoundary>
    </SidebarProvider>
  </React.StrictMode>
);
