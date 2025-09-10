import { ICustomer, useAxiosPrivate } from "@/hooks";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export function useGetCustomerDetail() {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams<{ customerId: string }>();

  return useQuery({
    queryKey: ["customer", params.customerId],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<ICustomer>>(
        `/api/v1/customer/${params.customerId}`
      );
    },
  });
}
