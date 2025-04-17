import { use } from "react";
import axios from "@/config/axios";
import { AuthContext } from "@/contexts";
import { useMutation } from "@tanstack/react-query";

export function usePostRefreshToken() {
  const authContext = use(AuthContext);

  return useMutation({
    mutationKey: ["auth", "refresh-token"],
    mutationFn: async function () {
      return await axios.post<{ accessToken: string }>(
        "/api/v1/auth/refresh-token"
      );
    },
    onSuccess(data) {
      authContext.setIsAuthenticated(true);
      authContext.setAccessToken(data.data.accessToken);
    },
    onError() {
      authContext.setIsAuthenticated(false);
      authContext.setAccessToken(null);
    },
  });
}
