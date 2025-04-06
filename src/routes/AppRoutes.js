import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { useContext, useEffect } from "react";
import { AppContext } from "contexts/AppContext";
import PrivateRoutes from "./PrivateRoutes";

export default function AppRoutes() {
  const { token } = useContext(AppContext);

  return (
    <Routes>
      <Route element={<PublicRoutes isAuthenticated={token ? true : false} />}>
        <Route path="auth/*" element={<AuthLayout />} />
      </Route>
      <Route element={<PrivateRoutes isAuthenticated={token ? true : false} />}>
        <Route path="admin/*" element={<AdminLayout />} />
      </Route>

      {/* <Route path="landing/*" element={<LandingLayout />} />
      <Route path="rtl/*" element={<RTLLayout />} /> */}
      {/* <Route path="/" element={<Navigate to="/auth" replace />} /> */}
    </Routes>
  );
}
