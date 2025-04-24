import { axios } from "@/config";
import { AuthContext } from "@/contexts";
import { useMutation } from "@tanstack/react-query";
import { use } from "react";

export function usePostLogout() {
  const authContext = use(AuthContext);

  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: async function () {
      return await axios.post("/api/v1/auth/logout", undefined, {
        withCredentials: true,
      });
    },
    onSuccess() {
      authContext.setIsAuthenticated(false);
      authContext.setAccessToken(null);
      authContext.setRoles(null);
    },
  });
}
