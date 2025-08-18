import { useAxiosPrivate } from "@/hooks";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export interface IGetUser {
  id: number;
  name: string;
  email: string;
  roles: { id: number; name: string }[];
}

export function useGetUserList() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["user"],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IGetUser[]>>(
        "/api/v1/user"
      );
    },
  });
}
