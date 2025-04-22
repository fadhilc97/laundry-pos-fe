import { AuthContext } from "@/contexts";
import { usePostRefreshToken } from "@/hooks";
import { use, useEffect, useState } from "react";
import { Outlet } from "react-router";

export default function PersistLoginRoute() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authContext = use(AuthContext);
  const postRefreshToken = usePostRefreshToken();

  useEffect(() => {
    let isMounted = true;

    if (!authContext.accessToken) {
      postRefreshToken.mutate(undefined, {
        onSettled() {
          isMounted && setIsLoading(false);
        },
      });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return isLoading ? <p>Loading...</p> : <Outlet />;
}
