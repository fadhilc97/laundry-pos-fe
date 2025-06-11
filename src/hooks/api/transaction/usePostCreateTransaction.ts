import { toast } from "sonner";
import { useAxiosPrivate } from "@/hooks";
import { CreateTransactionFormInputs, ISuccessResponse } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export interface ICreateTransactionResponse {
  transactionId: number;
}

export function usePostCreateTransaction() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["transaction", "create"],
    mutationFn: async function (data: CreateTransactionFormInputs) {
      return await axiosPrivate.post<
        ISuccessResponse<ICreateTransactionResponse>
      >("/api/v1/transaction", data);
    },
    onSuccess(res) {
      const createdTransactionId = res.data.data?.transactionId;
      toast("Order already created");
      navigate(`/transactions/details/${createdTransactionId}`);
    },
    onError() {},
  });
}
