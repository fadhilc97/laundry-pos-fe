import { AuthContext } from "@/contexts";
import { usePostRefreshToken } from "@/hooks";
import { use, useEffect, useState } from "react";
import { Outlet } from "react-router";

export default function PersistLoginRoute() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authContext = use(AuthContext);
  const postRefreshToken = usePostRefreshToken();

  useEffect(() => {
    if (!authContext.accessToken) {
      postRefreshToken.mutate(undefined, {
        onSettled() {
          setIsLoading(false);
        },
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  return isLoading ? <p>Loading...</p> : <Outlet />;
}
