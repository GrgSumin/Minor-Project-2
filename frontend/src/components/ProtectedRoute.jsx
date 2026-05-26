import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useIsAuthenticated } from "../store/authStore";

export default function ProtectedRoute() {
  const isAuth = useIsAuthenticated();
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <Outlet />;
}
