import { IGetUser, useAxiosPrivate } from "@/hooks";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export function useGetUserDetail(id: string) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["user", id],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IGetUser>>(
        `/api/v1/user/${id}`
      );
    },
    enabled: !!id,
  });
}
