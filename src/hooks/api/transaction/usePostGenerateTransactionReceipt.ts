import { useAxiosPrivate } from "@/hooks";
import { ISuccessResponse } from "@/lib";
import { useMutation } from "@tanstack/react-query";

type Options = {
  transactionId: string | number;
};

export function usePostGenerateTransactionReceipt({ transactionId }: Options) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["transaction", transactionId, "receipt"],
    mutationFn: async function () {
      return await axiosPrivate.post<ISuccessResponse>(
        `/api/v1/transaction/${transactionId}/receipt`
      );
    },
  });
}
