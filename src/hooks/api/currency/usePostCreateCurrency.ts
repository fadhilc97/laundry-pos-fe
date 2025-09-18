import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { CreateUpdateCurrencyFormInputs, ISuccessResponse } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function usePostCreateCurrency() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["currency", "create"],
    mutationFn: async function (data: CreateUpdateCurrencyFormInputs) {
      return await axiosPrivate.post<ISuccessResponse>(
        "/api/v1/currency",
        data
      );
    },
    onSuccess(res) {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["currency"] });
      navigate("/currency");
    },
  });
}
