import { use } from "react";
import { useNavigate } from "react-router";
import axios from "@/config/axios";
import { IAuthJwt, LoginFormInputs } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "@/contexts";

export interface IPostLoginResponse extends IAuthJwt {}

export function usePostLogin() {
  const authContext = use(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: async function (data: LoginFormInputs) {
      return await axios.post<IPostLoginResponse>("/api/v1/auth/login", data, {
        withCredentials: true,
      });
    },
    onSuccess(data) {
      authContext.setIsAuthenticated(true);
      authContext.setAccessToken(data.data.accessToken);
      authContext.setRoles(data.data.roles);
      navigate("/dashboard");
    },
    onError() {
      authContext.setIsAuthenticated(false);
      authContext.setAccessToken(null);
      authContext.setRoles(null);
    },
  });
}
