import { useAxiosPrivate } from "@/hooks";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export interface IGetQuantityUnitListResponse {
  id: number;
  name: string;
  shortName: string;
}

export function useGetQuantityUnitList() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["quantity-unit"],
    queryFn: async function () {
      return await axiosPrivate.get<
        ISuccessResponse<IGetQuantityUnitListResponse[]>
      >("/api/v1/quantity-unit");
    },
  });
}
