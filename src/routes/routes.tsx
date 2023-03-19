import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes.const";

const Login = lazy(() => import("../pages/Login"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.home} element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
