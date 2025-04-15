import { use } from "react";
import { useNavigate } from "react-router";
import axios from "@/config/axios";
import { LoginFormInputs } from "../utils/login-form.schema";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "@/contexts";

export function usePostLogin() {
  const authContext = use(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["laundry", "login"],
    mutationFn: async function (data: LoginFormInputs) {
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
  });
}
