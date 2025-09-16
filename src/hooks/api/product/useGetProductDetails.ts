import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { CreateUpdateProductFormInputs, ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";

export function useGetProductDetails() {
  const params = useParams<{ productId: string }>();
  const [searchParams] = useSearchParams();
  const serviceType = searchParams.get("serviceType") as string;
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["product", { serviceType }],
    queryFn: async function () {
      return await axiosPrivate.get<
        ISuccessResponse<CreateUpdateProductFormInputs>
      >(`/api/v1/product/${params.productId}`);
    },
    refetchOnWindowFocus: false,
    enabled: !!params.productId,
  });
}
