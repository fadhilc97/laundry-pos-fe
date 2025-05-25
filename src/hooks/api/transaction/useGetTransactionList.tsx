import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export interface IGetTransaction {
  id: number;
  transactionNo: string;
  checkInDate: string;
  customerName: string;
  serviceType: string;
  status: string;
  paymentStatus: string;
  totalAmount: string;
  currency: string;
}

export function useGetTransactionList() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["transaction"],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IGetTransaction[]>>(
        "/api/v1/transaction"
      );
    },
  });
}
