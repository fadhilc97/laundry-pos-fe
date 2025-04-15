import { AuthContext } from "@/contexts";
import { use } from "react";
import { Outlet } from "react-router";

export default function AuthRoute() {
  const authContext = use(AuthContext);

  if (!authContext.isAuthenticated) {
    return <h1>Unauthorized</h1>;
  }

  return <Outlet />;
}
