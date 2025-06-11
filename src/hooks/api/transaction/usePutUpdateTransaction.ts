import { useAxiosPrivate } from "@/hooks";
import { ISuccessResponse, TransactionStatus } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Options = { transactionId: string };

export function usePutUpdateTransaction({ transactionId }: Options) {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["transaction", "update"],
    mutationFn: async function (payload: {
      action: TransactionStatus;
      locationId?: number;
    }) {
      return await axiosPrivate.put<ISuccessResponse>(
        `/api/v1/transaction/${transactionId}?action=${payload.action}`,
        {
          locationId: payload.locationId,
        }
      );
    },
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ["transaction", transactionId],
      });
      toast(res.data.message);
    },
  });
}
