import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export interface IProduct {
  id: number;
  name: string;
  price: string;
  quantityUnit: {
    id: number;
    shortName: string;
  };
}

type Options = {
  serviceType: string;
};

export function useGetProductList({ serviceType }: Options) {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["product", { serviceType }],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IProduct[]>>(
        "/api/v1/product",
        {
          params: { serviceType },
        }
      );
    },
    refetchOnWindowFocus: false,
  });
}
