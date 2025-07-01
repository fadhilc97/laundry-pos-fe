import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import {
  ISuccessResponse,
  TransactionPaymentStatus,
  TransactionStatus,
} from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export interface IGetTransaction {
  id: number;
  transactionNo: string;
  checkInDate: string;
  customerName: string;
  serviceType: string;
  status: TransactionStatus;
  paymentStatus: TransactionPaymentStatus;
  totalAmount: string;
  totalPendingPaidAmount: string;
  currency: string;
}

export function useGetTransactionList() {
  const [searchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const searchParamsObject = Object.fromEntries(searchParams);
  return useQuery({
    queryKey: ["transaction", searchParamsObject],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IGetTransaction[]>>(
        "/api/v1/transaction",
        { params: searchParamsObject }
      );
    },
  });
}
