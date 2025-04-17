import { AuthContext } from "@/contexts";
import { use } from "react";
import { Outlet, Navigate } from "react-router";

export default function AuthRoute() {
  const authContext = use(AuthContext);

  if (!authContext.isAuthenticated) return <Navigate to="/login" />;
  return <Outlet />;
}
