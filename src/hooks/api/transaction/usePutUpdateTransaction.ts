import { useAxiosPrivate } from "@/hooks";
import { IErrorResponse, ISuccessResponse, TransactionStatus } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
      toast.success(res.data.message);
    },
    onError(error: AxiosError<IErrorResponse>) {
      toast.error(error.response?.data.message);
    },
  });
}
