import { Role } from "@/lib";
import { createContext, useState } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  accessToken: string | null;
  roles: Role[] | null;
  setIsAuthenticated: (value: boolean) => void;
  setAccessToken: (value: string | null) => void;
  setRoles: (value: Role[] | null) => void;
}

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  accessToken: null,
  roles: null,
  setIsAuthenticated() {},
  setAccessToken() {},
  setRoles() {},
});

export function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[] | null>([]);

  return (
    <AuthContext
      value={{
        isAuthenticated,
        accessToken,
        roles,
        setIsAuthenticated,
        setAccessToken,
        setRoles,
      }}
    >
      {children}
    </AuthContext>
  );
}
