import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export interface IProduct {
  id: number;
  name: string;
  price: string;
  quantityUnit: {
    shortName: string;
  };
}

export function useGetProductList() {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["product"],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IProduct[]>>(
        "/api/v1/product"
      );
    },
    refetchOnWindowFocus: false,
  });
}
