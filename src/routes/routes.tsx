import Fallback from "../components/Fallback";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes.const";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path={routes.home} element={<Login />} />
          <Route path={routes.dashboard} element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
