import { IGetCurrencyListResponse, useAxiosPrivate } from "@/hooks";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export function useGetCurrencyDetails() {
  const params = useParams<{ currencyId: string }>();
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["currency", params.currencyId],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IGetCurrencyListResponse>>(
        `/api/v1/currency/${params.currencyId}`
      );
    },
    enabled: !!params.currencyId,
  });
}
