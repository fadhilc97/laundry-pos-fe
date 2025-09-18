import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { CreateUpdateCurrencyFormInputs, ISuccessResponse } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export function usePutUpdateCurrency() {
  const navigate = useNavigate();
  const params = useParams<{ currencyId: string }>();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["currency", params.currencyId, "update"],
    mutationFn: async function (data: CreateUpdateCurrencyFormInputs) {
      return await axiosPrivate.put<ISuccessResponse>(
        `/api/v1/currency/${params.currencyId}`,
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
