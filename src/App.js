import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import LandingLayout from "layouts/Landing";
import theme from "./theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "contexts/AppContext";

// Chakra imports

export default function Main() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route path="auth/*" element={<AuthLayout />} />
            <Route path="admin/*" element={<AdminLayout />} />
            <Route path="landing/*" element={<LandingLayout />} />
            <Route path="rtl/*" element={<RTLLayout />} />
            <Route path="/" element={<Navigate to="/auth" replace />} />
          </Routes>
          <Toaster richColors duration={3000} position="top-right" />
        </ChakraProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}
