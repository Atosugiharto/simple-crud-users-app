import { Navigate, useLocation } from "react-router-dom";

function NavigateRoutes({ children }) {
  const location = useLocation();
  const path = location.pathname;
  if (path === "/") {
    return <Navigate to="/users" />;
  }
  return children;
}

export default NavigateRoutes;
