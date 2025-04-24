import axios from "@/config/axios";
import { IAuthJwt } from "@/lib/types";

let refreshTokenPromise: Promise<string> | null = null;

export function getNewAccessTokenPromise() {
  if (!refreshTokenPromise) {
    refreshTokenPromise = axios
      .post<IAuthJwt>("/api/v1/auth/refresh-token", undefined, {
        withCredentials: true,
      })
      .then((res) => {
        refreshTokenPromise = null;
        return res.data.accessToken;
      })
      .catch((err) => {
        refreshTokenPromise = null;
        throw err;
      });
  }
  return refreshTokenPromise;
}
