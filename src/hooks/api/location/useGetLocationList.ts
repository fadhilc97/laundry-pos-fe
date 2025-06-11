import { useAxiosPrivate } from "@/hooks";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export interface IGetLocationResponse {
  id: number;
  name: string;
}

export function useGetLocationList() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["locations"],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IGetLocationResponse[]>>(
        "/api/v1/location"
      );
    },
  });
}
