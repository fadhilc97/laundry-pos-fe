import { toast } from "sonner";
import { useAxiosPrivate } from "@/hooks";
import {
  CreatePaymentFormInputs,
  IErrorResponse,
  ISuccessResponse,
} from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface ICreatePaymentResponse {
  change: number;
}

type Options = {
  transactionId: string;
};

export function usePostCreatePayment({ transactionId }: Options) {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["transaction", "payment", "create"],
    mutationFn: async function (data: CreatePaymentFormInputs) {
      return await axiosPrivate.post<ISuccessResponse<ICreatePaymentResponse>>(
        `/api/v1/transaction/${transactionId}/payment`,
        data
      );
    },
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ["transaction", transactionId],
      });
      toast.success(res.data.message, {
        description: `Change = ${res.data.data?.change || 0}`,
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      toast.error(error.response?.data.message);
    },
  });
}
