import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { ISuccessResponse, TransactionStatus } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export interface IDashboard {
  transactionCount: {
    status: TransactionStatus;
    count: number;
  }[];
  paymentAggregate: {
    sumAmount: number;
    sumPaidAmount: number;
    sumUnpaidAmount: number;
  };
}

export function useGetDashboard() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async function () {
      return axiosPrivate.get<ISuccessResponse<IDashboard>>(
        "/api/v1/dashboard"
      );
    },
    refetchOnWindowFocus: false,
  });
}
