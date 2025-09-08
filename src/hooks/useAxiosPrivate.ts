import { use, useEffect } from "react";
import { axiosPrivate } from "@/config";
import { AuthContext } from "@/contexts";
import { getNewAccessTokenPromise } from "@/lib";
import { useNavigate } from "react-router";

export function useAxiosPrivate() {
  const authContext = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authContext.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const { accessToken } = await getNewAccessTokenPromise();
          prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosPrivate(prevRequest);
        }
        if (error.response.status === 403) {
          return navigate("/errors?code=403");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authContext, getNewAccessTokenPromise]);

  return axiosPrivate;
}
