import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import {
  ISuccessResponse,
  TransactionPaymentStatus,
  TransactionStatus,
} from "@/lib";
import { useQuery } from "@tanstack/react-query";

type Options = {
  transactionId?: string;
};

export interface IGetTransactionDetail {
  id: number;
  transactionNo: string;
  checkInDate: string;
  proceedDate: string | null;
  checkOutDate: string | null;
  finishedDate: string | null;
  serviceType: string;
  status: TransactionStatus;
  paymentStatus: TransactionPaymentStatus;
  totalTransactionAmount: number;
  totalPaidAmount: number;
  currency: {
    symbol: string;
  };
  location: { name: string } | null;
  items: {
    id: number;
    description: string;
    qty: number;
    price: number;
    subTotal: number;
    quantityUnit: {
      shortName: string;
    };
  }[];
  customer: {
    name: string;
    customerContacts: {
      id: number;
      contact: {
        name: string;
        details: string;
      };
    }[];
  };
  pendingPaid: number;
}

export function useGetTransactionDetails({ transactionId }: Options) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IGetTransactionDetail>>(
        `/api/v1/transaction/${transactionId}`
      );
    },
    enabled: false,
  });
}
