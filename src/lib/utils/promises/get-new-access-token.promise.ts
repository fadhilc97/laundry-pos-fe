import axios from "@/config/axios";

let refreshTokenPromise: Promise<string> | null = null;

export function getNewAccessTokenPromise() {
  if (!refreshTokenPromise) {
    refreshTokenPromise = axios
      .post<{ accessToken: string }>("/api/v1/auth/refresh-token", undefined, {
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
