import { use } from "react";
import { useNavigate } from "react-router";
import axios from "@/config/axios";
// import { LoginFormInputs } from "../../../pages/Login/utils/login-form.schema";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "@/contexts";

export function usePostLogin<T = unknown>() {
  const authContext = use(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: async function (data: T) {
      return await axios.post<{ accessToken: string }>(
        "/api/v1/auth/login",
        data
      );
    },
    onSuccess(data) {
      authContext.setIsAuthenticated(true);
      authContext.setAccessToken(data.data.accessToken);
      navigate("/dashboard");
    },
    onError() {
      authContext.setIsAuthenticated(false);
      authContext.setAccessToken(null);
    },
  });
}
