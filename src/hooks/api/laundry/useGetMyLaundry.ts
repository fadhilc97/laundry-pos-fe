import { AuthContext } from "@/contexts";
import { useAxiosPrivate } from "@/hooks";
import { ISuccessResponse, Role } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export interface IGetLaundryResponse {
  id: number;
  name: string;
  address: string;
  imageUrl: string | null;
  currency: string;
  contacts: {
    id: number;
    name: string;
    details: string;
  }[];
}

export function useGetMyLaundry() {
  const authContext = use(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["laundry", "me"],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IGetLaundryResponse>>(
        "/api/v1/laundry/me"
      );
    },
    refetchOnWindowFocus: false,
    enabled: !authContext.roles?.includes(Role.SUPER_ADMIN),
  });
}
