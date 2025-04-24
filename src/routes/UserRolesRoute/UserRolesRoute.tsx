import { AuthContext } from "@/contexts";
import { Role } from "@/lib";
import { use } from "react";
import { Navigate, Outlet } from "react-router";

type Props = {
  roles: Role[];
};

export default function UserRolesRoute({ roles }: Props) {
  const authContext = use(AuthContext);
  const authenticatedRoles = authContext.roles;
  const isAllowedAccess =
    roles.length <= 0 ||
    authenticatedRoles?.some((authRole) => roles.includes(authRole));

  if (!isAllowedAccess) {
    return <Navigate to="/errors?code=403" />;
  }
  return <Outlet />;
}
