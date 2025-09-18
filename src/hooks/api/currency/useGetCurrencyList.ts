import { useAxiosPrivate } from "@/hooks";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export interface IGetCurrencyListResponse {
  id: number;
  name: string;
  shortName: string;
  countryName: string;
  symbol: string;
}

export function useGetCurrencyList() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["currency"],
    queryFn: async function () {
      return await axiosPrivate.get<
        ISuccessResponse<IGetCurrencyListResponse[]>
      >("/api/v1/currency");
    },
  });
}
