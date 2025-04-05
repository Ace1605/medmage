import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes({ isAuthenticated }) {
  return isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Outlet />;
}
