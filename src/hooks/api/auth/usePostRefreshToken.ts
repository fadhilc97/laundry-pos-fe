import { use } from "react";
import { AuthContext } from "@/contexts";
import { useMutation } from "@tanstack/react-query";
import { getNewAccessTokenPromise } from "@/lib";

export function usePostRefreshToken() {
  const authContext = use(AuthContext);

  return useMutation({
    mutationKey: ["auth", "refresh-token"],
    mutationFn: getNewAccessTokenPromise,
    onSuccess(data) {
      authContext.setIsAuthenticated(true);
      authContext.setAccessToken(data);
    },
    onError() {
      authContext.setIsAuthenticated(false);
      authContext.setAccessToken(null);
    },
  });
}
