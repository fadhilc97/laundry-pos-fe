import { createContext, useState } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  accessToken: string | null;
  setIsAuthenticated: (value: boolean) => void;
  setAccessToken: (value: string | null) => void;
}

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  accessToken: null,
  setIsAuthenticated() {},
  setAccessToken() {},
});

export function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext
      value={{
        isAuthenticated,
        accessToken,
        setIsAuthenticated,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext>
  );
}
