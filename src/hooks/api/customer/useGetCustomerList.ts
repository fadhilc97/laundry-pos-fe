import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export interface ICustomer {
  id: number;
  name: string;
  address: string;
  createdAt: string;
}

export function useGetCustomerList() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["customer"],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<ICustomer[]>>(
        "/api/v1/customer"
      );
    },
    refetchOnWindowFocus: false,
  });
}
