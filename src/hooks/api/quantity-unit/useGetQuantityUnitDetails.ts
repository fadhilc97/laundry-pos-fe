import { IGetQuantityUnitListResponse, useAxiosPrivate } from "@/hooks";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export function useGetQuantityUnitDetails() {
  const params = useParams<{ qtyUnitId: string }>();
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["quantity-unit", params.qtyUnitId],
    queryFn: async function () {
      return await axiosPrivate.get<
        ISuccessResponse<IGetQuantityUnitListResponse>
      >(`/api/v1/quantity-unit/${params.qtyUnitId}`);
    },
    enabled: !!params.qtyUnitId,
  });
}
