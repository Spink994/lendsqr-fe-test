import Fallback from "../components/Fallback";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes.const";
import { Layout } from "../components";

const Login = lazy(() => import("../pages/Login"));
const DashboardUser = lazy(() => import("../pages/DashboardUser"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const UserDetails = lazy(() => import("../pages/UserDetails"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path={routes.home} element={<Login />} />
          <Route path={routes.dashboard} element={<Dashboard />} />
          <Route path={routes.users} element={<DashboardUser />} />
          <Route path={routes.user_details} element={<UserDetails />} />
          <Route path={routes.other_pages} element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
