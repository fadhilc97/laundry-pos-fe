import { useAxiosPrivate } from "@/hooks";
import { ISuccessResponse, Role } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export interface IGetListRoleResponse {
  id: number;
  name: string;
  identifier: Role;
}

export function useGetListRole() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["role"],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IGetListRoleResponse[]>>(
        "/api/v1/role"
      );
    },
  });
}
