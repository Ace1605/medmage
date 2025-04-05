import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PrivateRoutes({ isAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.pathname, { replace: true });
    } else {
      toast.warning("Your token is invalid or expired. Kindly login");
    }
  }, [location.pathname, navigate, isAuthenticated]);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth/authentication/sign-in"
      state={{ from: location }}
      replace
    />
  );
}
